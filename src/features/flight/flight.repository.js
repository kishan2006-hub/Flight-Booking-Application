import mongoose from "mongoose";
import { flightSchema } from "./flight.schema.js";

const FlightModel = new mongoose.model("Flight", flightSchema);

export default class FlightRepository {
  async createFlight(data, image) {
    try {
      const flight = new FlightModel({
        ...data,
        image,
      });
      return await flight.save();
    } catch (err) {
      throw err;
    }
  }

  async updateFlight(flightId, data, image) {
    try {
      const updateData = { ...data };

      if (image) {
        updateData.image = image;
      }

      const updatedFlight = await FlightModel.findByIdAndUpdate(
        flightId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!updatedFlight) {
        return false;
      }

      return updatedFlight;
    } catch (err) {
      throw err;
    }
  }

  async deleteFlight(flightId) {
    try {
      const deletedFlight = await FlightModel.findByIdAndDelete(flightId);

      if (!deletedFlight) {
        return false;
      }

      return deletedFlight;
    } catch (err) {
      throw err;
    }
  }

  async getFlight(flightId) {
    try {
      const flight = await FlightModel.findById(flightId);
      if (!flight) {
        return false;
      } else {
        return flight;
      }
    } catch (err) {
      throw err;
    }
  }

  async searchFlight(query) {
    try {
      let filter = {};

      if (query.departureCity) {
        filter.departureCity = new RegExp(query.departureCity, "i");
      }

      if (query.arrivalCity) {
        filter.arrivalCity = new RegExp(query.arrivalCity, "i");
      }

      if (query.departureDate) {
        const start = new Date(query.departureDate);
        const end = new Date(query.departureDate);
        end.setHours(23, 59, 59, 999);

        filter.departureDate = { $gte: start, $lte: end };
      }

      if (query.flightClass) {
        filter.flightClass = query.flightClass;
      }

      if (query.airline) {
        filter.airline = new RegExp(query.airline, "i");
      }

      if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
      }

      if (query.minSeats) {
        filter.availableSeats = { $gte: Number(query.minSeats) };
      }

      return await FlightModel.find(filter);
    } catch (err) {
      throw err;
    }
  }
}
