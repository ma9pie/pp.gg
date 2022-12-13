import dbConnect from "@/db/dbConnect";
import History from "@/db/schemas/History";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "DELETE":
      try {
        const history = await History.findOneAndDelete()
          .sort({ date: -1 })
          .lean();

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
