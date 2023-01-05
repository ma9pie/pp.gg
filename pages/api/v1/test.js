import dbConnect from "@/db/dbConnect";
import History from "@/db/schemas/History";
import User from "@/db/schemas/User";

export default async function handler(req, res) {
  const { method, query, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        res.status(200).json({ message: "Hello from Next.js!" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
