import dbConnect from "@/db/dbConnect";
import History from "@/db/schemas/History";
import User from "@/db/schemas/User";
import StatisticsUtils from "@/utils/StatisticsUtils";

/**
 * @swagger
 * /api/v1/userList:
 *   get:
 *     tags: [User]
 *     description: 전체 유저 리스트 조회 API
 *     responses:
 *       200:
 *         description: 전체 유저 리스트를 조회하는 API 입니다.
 */

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const userListQuery = User.find({}, { _id: 0, password: 0 }).lean();
        const historyQuery = await History.find(query).sort({ date: 1 }).lean();

        const result = await Promise.all([userListQuery, historyQuery]).then(
          (res) => {
            const [userList, history] = res;

            return StatisticsUtils.calculate(userList, history);
          }
        );

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
