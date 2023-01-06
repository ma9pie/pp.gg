import dbConnect from "@/db/dbConnect";
import Emblem from "@/db/schemas/Emblem";
import History from "@/db/schemas/History";
import User from "@/db/schemas/User";
import EmblemUtils from "@/utils/EmblemUtils";
import TierUtils from "@/utils/TierUtils";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // const user = await User.find({}, { password: 0 }).lean();
        const scoreboard = new Map();

        const userListQuery = User.find({}, { password: 0 }).lean();
        const historyQuery = History.find({}).sort({ date: -1 }).lean();
        const emblemQuery = Emblem.find({}).lean();

        const result = await Promise.all([
          userListQuery,
          historyQuery,
          emblemQuery,
        ]).then((res) => {
          const [userList, history, emblem] = res;

          console.log(emblem);

          const scoreboard = new Map();

          userList.map((item) => {
            scoreboard.set(item.id, {
              winPoints: 0,
              losePoints: 0,
            });
          });

          history.map((item) => {
            const winner = scoreboard.get(item.winnerId);
            const loser = scoreboard.get(item.loserId);
            ++winner.winPoints;
            ++loser.losePoints;
            scoreboard.set(item.winnerId, winner);
            scoreboard.set(item.loserId, loser);
          });

          scoreboard.forEach((item, key) => {
            const user = userList.find((user) => user.id === key);
            if (user) {
              const winRate =
                item.winPoints === 0
                  ? 0
                  : (item.winPoints / (item.winPoints + item.losePoints)) * 100;

              user.winRate = winRate;
              user.tier = TierUtils.getTier(winRate);
              user.emblemImgUrl = EmblemUtils.getImgUrl(winRate);
            }
          });

          return userList;
        });

        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
