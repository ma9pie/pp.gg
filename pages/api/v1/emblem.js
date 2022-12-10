import dbConnect from "@/db/dbConnect";
import Emblem from "@/db/schemas/Emblem";

export default async function handler(req, res) {
  const { query, method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const emblems = await Emblem.find(query).lean();
        res.status(200).json(emblems);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
