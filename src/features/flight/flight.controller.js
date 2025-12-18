import ApplicationError from "../../error-handler/application.error.js";
import FlightRepository from "./flight.repository.js";

export default class FlightController {
  constructor() {
    this.flightRepository = new FlightRepository();
  }

  async createFlight(req, res, next) {
    try {
      if (req.role !== "admin") {
        throw new ApplicationError(403, "Only admin can create flights.");
      }

      const flight = await this.flightRepository.createFlight(
        req.body,
        req.file?.filename
      );

      return res.status(201).json({
        success: true,
        message: "Flight created successfully",
        flightDetails: flight,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateFlight(req, res, next) {
    try {
      if (req.role !== "admin") {
        throw new ApplicationError(403, "Only admin can update flights.");
      }
      const updatedFlight = await this.flightRepository.updateFlight(
        req.params.id,
        req.body,
        req.file?.filename
      );
      if (!updatedFlight) {
        throw new ApplicationError(400, "Flight not found!");
      } else {
        return res.status(200).json({
          success: true,
          message: "Flight updated successfully",
          flightDetails: updatedFlight,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteFlight(req, res, next) {
    try {
      if (req.role !== "admin") {
        throw new ApplicationError(403, "Only admin can delete flights.");
      }
      const deletedFlight = await this.flightRepository.deleteFlight(
        req.params.id
      );
      if (!deletedFlight) {
        throw new ApplicationError(400, "Flight not found!");
      } else {
        return res.status(200).json({
          success: true,
          message: "Flight deleted successfully",
          flightDetails: deletedFlight,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async getFlight(req, res, next) {
    try {
      const flightDetails = await this.flightRepository.getFlight(
        req.params.id
      );
      if (!flightDetails) {
        throw new ApplicationError(400, "Flight not found!");
      } else {
        return res.status(200).json({
          success: true,
          flightDetails: flightDetails,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async searchFlight(req, res, next) {
    try {
      const flights = await this.flightRepository.searchFlight(req.query);

      if (flights.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No flights found",
        });
      }

      return res.status(200).json({
        success: true,
        total: flights.length,
        flights: flights,
      });
    } catch (err) {
      next(err);
    }
  }
}
