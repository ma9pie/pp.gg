import { firestore } from "@/db/initFirebase";
import "firebase/database";
import moment from "moment";

export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    // Read
    case "GET":
      try {
        const emblem = await firestore
          .collection("emblem")
          .orderBy("rate", "asc")
          .get()
          .then((snapshot) =>
            snapshot.docs.map((doc) => {
              return { ...doc.data(), key: doc.id };
            })
          );
        res.status(200).json(emblem);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
