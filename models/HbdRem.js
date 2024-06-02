import mongoose, { Schema } from "mongoose";

const hbdRemSchema = new Schema(
  {
    name: String,
    dob: Date,
  },
  { timestamps: true }
);

const hbdRem = mongoose.models.hbdRem || mongoose.model("hbdRem", hbdRemSchema);
export default hbdRem;
