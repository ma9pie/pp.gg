import dbConnect from "@/db/dbConnect";
import Banner from "@/db/schemas/Banner";

/**
 * @swagger
 * /api/v1/banner:
 *   get:
 *     tags: [Banner]
 *     description: 배너 조회 API
 *     responses:
 *       200:
 *         description: 배너를 조회하는 API 입니다.
 */

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const banner = await Banner.find({}, { _id: 0 })
          .sort({ order: 1 })
          .lean();
        res.status(200).json(banner);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
