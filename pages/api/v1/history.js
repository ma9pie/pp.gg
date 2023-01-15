import dbConnect from "@/db/dbConnect";
import History from "@/db/schemas/History";
import User from "@/db/schemas/User";

/**
 * @swagger
 * /api/v1/history:
 *   get:
 *     tags: [History]
 *     description: 전체 전적 조회 API
 *     responses:
 *       200:
 *         description: 전체 전적을 조회하는 API 입니다.
 */

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const history = await History.find(query).sort({ date: -1 }).lean();
        res.status(200).json(history);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { date, winnerId, loserId, winnerScore, loserScore } = req.body;
        const winnerUser = await User.findOne({ id: winnerId }).lean();
        const loserUser = await User.findOne({ id: loserId }).lean();

        if (!winnerUser) {
          res.status(200).json({ message: "winner의 id가 존재하지 않습니다." });
          return;
        }
        if (!loserUser) {
          res.status(200).json({ message: "loser의 id가 존재하지 않습니다." });
          return;
        }
        if (winnerUser.id === loserUser.id) {
          res.status(200).json({ message: "동일한 아이디입니다." });
          return;
        }
        if (winnerScore < 0 || loserScore < 0) {
          res.status(200).json({ message: "유효하지 않은 score값 입니다." });
          return;
        }

        const history = new History({
          date: date,
          winnerId: winnerId,
          loserId: loserId,
          winnerScore: winnerScore,
          loserScore: loserScore,
        });
        await history.save();
        res.status(200).json(history);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
