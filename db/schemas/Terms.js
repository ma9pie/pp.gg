import mongoose from "mongoose";

const TermsSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    required: Boolean,
    content: Boolean,
    html: String,
  },
  { collection: "terms", versionKey: false }
);

export default mongoose.models.Terms || mongoose.model("Terms", TermsSchema);
