import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema({
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },

  passengers: [
    {
      _id: false,
      name: { type: String, required: true },
      age: { type: Number, required: true },
      passportNumber: { type: String, required: true },
    },
  ],

  seatNumbers: [
    {
      type: String,
      required: true,
    },
  ],
});
