import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    key: Number,
    id: String,
    name: String,
    tier: String,
    imgUrl: String,
  },
  { collection: "user" }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
