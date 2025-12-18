import ApplicationError from "../../error-handler/application.error.js";
import BookingRepository from "./booking.repository.js";

export default class BookingController {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(req, res, next) {
    try {
      const { flightId, passengers, seatNumbers } = req.body;
      const booking = await this.bookingRepository.createBooking(
        flightId,
        passengers,
        seatNumbers
      );

      if (!booking) {
        throw new ApplicationError(400, "Flight not found!");
      } else {
        return res.status(200).json({
          message: "Booking created successfully.",
          booking,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getBooking(req, res, next) {
    try {
      const booking = await this.bookingRepository.getBooking(req.params.id);

      if (!booking) {
        throw new ApplicationError(400, "Booking not found!");
      } else {
        return res.status(200).send(booking);
      }
    } catch (err) {
      next(err);
    }
  }

  async cancelBooking(req, res, next) {
    try {
      if (req.role !== "user") {
        throw new ApplicationError(403, "Only user can cancel booking.");
      }
      const cancelBooking = await this.bookingRepository.cancelBooking(
        req.params.id
      );
      if (!cancelBooking) {
        throw new ApplicationError(400, "Booking not found!");
      } else {
        return res.status(200).json({
          message:
            "Dear Customer, Your booking has been cancelled successfully. We have initiated your refund. The amount will be credited to your original payment method within 5–7 business days, depending on your bank/payment provider. Thank you for choosing our service. We hope to assist you again soon!",
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateBooking(req, res, next) {
    try {
      const updated = await this.bookingRepository.updateBooking(
        req.params.id,
        req.body
      );
      if (!updated.success) {
        throw new ApplicationError(400, updated.message);
      } else {
        return res.status(200).json({
          message: "Booking updated successfully.",
          updatedBooking: updated.data,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getBookings(req, res, next) {
    try {
      const bookings = await this.bookingRepository.getBookings(req.params.id);
      if (!bookings) {
        throw new ApplicationError(400, "Flight not found");
      } else {
        return res.status(200).json({
          passengers: bookings.passengers,
          seatNumbers: bookings.seatNumbers,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
