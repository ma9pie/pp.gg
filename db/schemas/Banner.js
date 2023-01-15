import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
    backgroundColor: String,
    imgUrl: String,
    order: Number,
  },
  { collection: "banner", versionKey: false }
);

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
