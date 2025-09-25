import mongoose from "mongoose";

const Schema = mongoose.Schema;
const equipmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  state: {
    type: String,
    enum: ["available", "draft", "rented"],
    default: "draft",
  },
});

export default mongoose.model("Equipment", equipmentSchema);
