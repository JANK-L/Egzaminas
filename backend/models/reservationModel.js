import mongoose from "mongoose";

const Schema = mongoose.Schema;
const reservationSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  items: [
    {
      equipment_id: {
        type: String,
        required: true,
      },
      unitIndex: {
        type: Number,
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
    },
  ],
});

export default mongoose.model("Reservation", reservationSchema);
