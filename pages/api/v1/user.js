import regExp from "@/constants/regExp";
import dbConnect from "@/db/dbConnect";
import User from "@/db/schemas/User";

export default async function handler(req, res) {
  const { query, method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const name = query.name.trim();
        if (!name || !regExp.nameRegExp.test(name)) {
          res.status(200).json([]);
          return;
        }
        const queryRegex = new RegExp(name, "i");
        const user = await User.find({ name: { $regex: queryRegex } }).lean();
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
