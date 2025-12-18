import mongoose from "mongoose";
import { flightSchema } from "../flight/flight.schema.js";
import { bookingSchema } from "./booking.Schema.js";

const FlightModel = new mongoose.model("Flight", flightSchema);
const BookingModel = new mongoose.model("Booking", bookingSchema);

export default class BookingRepository {
  async createBooking(flightId, passengers, seatNumbers) {
    const findFlight = await FlightModel.findById(flightId);

    if (!findFlight) {
      return false;
    } else {
      const booking = await new BookingModel({
        flightId,
        passengers,
        seatNumbers,
      }).save();

      return await booking.populate("flightId");
    }
  }

  async getBooking(bookingId) {
    try {
      const booking = await BookingModel.findById(bookingId);
      if (!booking) {
        return false;
      } else {
        return booking;
      }
    } catch (err) {
      throw err;
    }
  }

  async cancelBooking(bookingId) {
    try {
      const booking = await BookingModel.findByIdAndDelete(bookingId);
      if (!booking) {
        return false;
      } else {
        return booking;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateBooking(bookingId, data) {
    try {
      if (data.flightId) {
        const flight = await FlightModel.findById(data.flightId);
        if (!flight) {
          return { success: false, message: "Invalid flightId" };
        }
      }

      const updatedBooking = await BookingModel.findByIdAndUpdate(
        bookingId,
        { $set: { ...data } },
        { new: true }
      );

      if (!updatedBooking) {
        return { success: false, message: "Booking not found" };
      }

      return { success: true, data: updatedBooking };
    } catch (err) {
      throw err;
    }
  }

  async getBookings(flightId) {
    try {
      const bookings = await BookingModel.findOne({ flightId: flightId });
      if (!bookings) {
        return false;
      } else {
        return bookings;
      }
    } catch (err) {
      throw err;
    }
  }
}
