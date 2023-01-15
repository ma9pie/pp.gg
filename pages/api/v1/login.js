import dbConnect from "@/db/dbConnect";
import User from "@/db/schemas/User";

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags: [Login]
 *     description: 로그인 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: 유저 아이디
 *               password:
 *                 type: string
 *                 description: 유저 이름
 *     responses:
 *       200:
 *         description: 회원 로그인 API 입니다.
 */

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne(
          {
            id: body.id,
            password: body.password,
          },
          { password: 0 }
        ).lean();
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
