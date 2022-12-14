import dbConnect from "@/db/dbConnect";
import Emblem from "@/db/schemas/Emblem";
import History from "@/db/schemas/History";
import TierUtils from "@/utils/TierUtils";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const winHistory = await History.find({ winnerId: query.id }).lean();
        const loseHistory = await History.find({ loserId: query.id }).lean();

        let winPoints = winHistory.length;
        let losePoints = loseHistory.length;
        let winRate =
          winPoints === 0 ? 0 : (winPoints / (winPoints + losePoints)) * 100;

        const emblem = await Emblem.find({}).where("rate").lte(winRate).lean();

        res.status(200).json({
          tier: TierUtils.getTier(winRate),
          imgUrl: emblem.at(-1).imgUrl,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
