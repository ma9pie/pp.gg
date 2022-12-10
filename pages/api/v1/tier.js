import dbConnect from "@/db/dbConnect";
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

        res.status(200).json(TierUtils.getTier(winRate));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
