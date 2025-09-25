import mongoose from "mongoose";

const Schema = mongoose.Schema;
const reservationSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },

  equipment_id: {
    type: String,
    required: true,
  },

  timeFrom: {
    type: Date,
    required: true,
  },
  timeTo: {
    type: Date,
    required: true,
  },
  state: {
    type: String,
    enum: ["confirmed", "declined", "procesing", "pending"],
    default: "pending",
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Reservation", reservationSchema);
