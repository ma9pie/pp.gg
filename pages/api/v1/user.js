import regExp from "@/constants/regExp";
import dbConnect from "@/db/dbConnect";
import User from "@/db/schemas/User";
import moment from "moment";

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

    case "POST":
      try {
        const { id, password, name, imgUrl, termsCheck } = body;
        const date = moment().format("YYYY-MM-DD HH:mm");

        if (!id) {
          res.status(200).json({ message: "유효하지 않은 아이디입니다." });
          return;
        }
        if (!password) {
          res.status(200).json({ message: "유효하지 않은 비밀번호입니다." });
          return;
        }
        if (!name) {
          res.status(200).json({ message: "유효하지 않은 닉네임입니다." });
          return;
        }
        if (!imgUrl) {
          res
            .status(200)
            .json({ message: "유효하지 않은 프로필 이미지입니다." });
          return;
        }

        const user = new User({
          id: id,
          password: password,
          name: name,
          imgUrl: imgUrl,
          termsCheck: termsCheck,
          createdAt: date,
        });

        await user.save();
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
