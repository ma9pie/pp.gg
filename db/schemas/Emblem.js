import mongoose from "mongoose";

const EmblemSchema = new mongoose.Schema(
  {
    img: String,
    name: String,
    rate: Number,
  },
  { collection: "emblem" }
);

export default mongoose.models.Emblem || mongoose.model("Emblem", EmblemSchema);
