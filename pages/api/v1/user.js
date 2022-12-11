import regExp from "@/constants/regExp";
import dbConnect from "@/db/dbConnect";
import User from "@/db/schemas/User";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const id = query?.id;

        if (id) {
          const user = await User.findOne(query).lean();
          res.status(200).json(user);
          return;
        }

        let name = null;

        if (query.name) {
          name = query.name.trim();
        }

        if (!name || !regExp.nameCheckRegExp.test(name)) {
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
