import mongoose from "mongoose";

const Schema = mongoose.Schema;
const equipmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  units: [
    {
      state: {
        type: String,
        enum: ["available", "reserved", "rented"],
        default: "available",
      },
    },
  ],
});

export default mongoose.model("Equipment", equipmentSchema);
