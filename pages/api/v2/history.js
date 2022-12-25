import { firestore } from "@/db/initFirebase";
import "firebase/database";
import moment from "moment";

export default async function handler(req, res) {
  const { method, query, body } = req;

  switch (method) {
    // Read
    case "GET":
      try {
        const history = await firestore
          .collection("history")
          .orderBy("date", "asc")
          .get()
          .then((snapshot) =>
            snapshot.docs.map((doc) => {
              return { ...doc.data(), key: doc.id };
            })
          );
        res.status(200).json(history);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // Create
    case "POST":
      try {
        const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");

        await firestore.collection("history").doc().set(body);
        // .set({ ...body, createdAt: createdAt });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    // Delete
    case "DELETE":
      try {
        await firestore.collection("history").doc(body.key).delete();
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
