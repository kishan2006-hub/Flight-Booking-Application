import mongoose from "mongoose";

export const flightSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: [true, "Flight number is required"],
      unique: [true, "This flight number already exists"],
      uppercase: true,
      trim: true,
      match: [
        /^[A-Z]{2,3}\d{1,4}$/,
        "Invalid flight number format (e.g. AI302, UK857, 6E512)",
      ],
    },

    airline: {
      type: String,
      required: [true, "Airline name is required"],
      trim: true,
      enum: {
        values: [
          "Air India",
          "IndiGo",
          "Vistara",
          "SpiceJet",
          "Go First",
          "AirAsia",
          "Emirates",
          "Qatar Airways",
          "Etihad",
          "Other",
        ],
        message: "Invalid airline name",
      },
    },

    departureCity: { type: String, required: true, trim: true },

    arrivalCity: { type: String, required: true, trim: true },

    departureAirport: {
      type: String,
      required: true,
      uppercase: true,
      match: [/^[A-Z]{3}$/, "Invalid airport code (e.g. DEL, BOM)"],
    },

    arrivalAirport: {
      type: String,
      required: true,
      uppercase: true,
      match: [/^[A-Z]{3}$/, "Invalid airport code (e.g. DEL, BOM)"],
    },

    departureDate: {
      type: Date,
      required: true,
      min: [Date.now(), "Departure date must be in the future"],
    },

    arrivalDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v > this.departureDate;
        },
        message: "Arrival date must be greater than departure date",
      },
    },

    travelDuration: { type: String, required: true },

    price: {
      type: Number,
      required: true,
      min: [1000, "Minimum price is ₹1000"],
    },

    availableSeats: { type: Number, required: true, min: 0 },

    totalSeats: { type: Number, required: true, min: 1 },

    flightClass: {
      type: String,
      required: true,
      enum: ["Economy", "Premium Economy", "Business", "First Class"],
    },

    image: { type: String, default: "default-flight.jpg" },

    status: {
      type: String,
      enum: ["Scheduled", "Delayed", "Cancelled", "Departed"],
      default: "Scheduled",
    },
  },

  { timestamps: true }
);

flightSchema.index({ departureCity: 1, arrivalCity: 1, departureDate: 1 });
