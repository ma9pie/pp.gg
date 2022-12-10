import regExp from "@/constants/regExp";
import dbConnect from "@/db/dbConnect";
import User from "@/db/schemas/User";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({
          id: body.id,
          password: body.password,
        }).lean();
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
