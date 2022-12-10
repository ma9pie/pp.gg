import user from "@/db/user.json";

export default function handler(req, res) {
  const name = req.query.name;
  let list = [];
  user.map((item) => {
    if (item.name.includes(name)) {
      list.push(item);
    }
  });
  return res.status(200).json(list);
}
