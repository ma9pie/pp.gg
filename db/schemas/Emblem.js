import mongoose from "mongoose";

const EmblemSchema = new mongoose.Schema(
  {
    imgUrl: String,
    name: String,
    rate: Number,
  },
  { collection: "emblem", versionKey: false }
);

export default mongoose.models.Emblem || mongoose.model("Emblem", EmblemSchema);
