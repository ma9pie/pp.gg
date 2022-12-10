import history from "@/db/history.json";

export default function handler(req, res) {
  res.status(200).json(history);
}
