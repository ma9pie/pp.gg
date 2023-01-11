import dbConnect from "@/db/dbConnect";
import Emblem from "@/db/schemas/Emblem";
import History from "@/db/schemas/History";
import User from "@/db/schemas/User";
import EmblemUtils from "@/utils/EmblemUtils";
import MmrUtils from "@/utils/MmrUtils";
import TierUtils from "@/utils/TierUtils";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userListQuery = User.find({}, { password: 0 }).lean();
        const historyQuery = History.find({}).sort({ date: -1 }).lean();
        const emblemQuery = Emblem.find({}).lean();

        const result = await Promise.all([
          userListQuery,
          historyQuery,
          emblemQuery,
        ]).then((res) => {
          const [userList, history, emblem] = res;

          const scoreboard = new Map();

          userList.map((item) => {
            scoreboard.set(item.id, {
              mmr: 2000,
              winRate: 0,
              winPoints: 0,
              losePoints: 0,
              totalDeal: 0,
              totalDamageReceived: 0,
            });
          });

          history.map((item) => {
            const winner = scoreboard.get(item.winnerId);
            const loser = scoreboard.get(item.loserId);

            ++winner.winPoints;
            winner.totalDeal += item.winnerScore;
            winner.totalDamageReceived += item.loserScore;
            winner.winRate =
              winner.winPoints === 0
                ? 0
                : winner.winPoints / (winner.winPoints + winner.losePoints);

            ++loser.losePoints;
            loser.totalDeal += item.loserScore;
            loser.totalDamageReceived += item.winnerScore;
            loser.winRate =
              loser.winPoints === 0
                ? 0
                : loser.winPoints / (loser.winPoints + loser.losePoints);

            const points = MmrUtils.getMmr(winner.winRate, loser.winRate);

            winner.mmr += points;
            loser.mmr -= points;

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

              user.mmr = item.mmr;
              user.winRate = item.winRate * 100;
              user.winPoints = item.winPoints;
              user.losePoints = item.losePoints;
              user.totalDeal = item.totalDeal;
              user.totalDamageReceived = item.totalDamageReceived;
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
