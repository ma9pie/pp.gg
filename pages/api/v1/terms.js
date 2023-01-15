import dbConnect from "@/db/dbConnect";
import Terms from "@/db/schemas/Terms";

/**
 * @swagger
 * /api/v1/terms:
 *   get:
 *     tags: [SignUp]
 *     description: 개인정보 약관동의 내용 조회 API
 *     responses:
 *       200:
 *         description: 개인정보 약관동의 내용을 조회하는 API 입니다.
 */

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const terms = await Terms.find({}).lean();
        res.status(200).json(terms);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
