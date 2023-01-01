import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    id: String,
    password: String,
    name: String,
    imgUrl: String,
    termsCheck: Array,
    createdAt: String,
  },
  { collection: "user", versionKey: false }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
