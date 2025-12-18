import express from "express";
import FlightController from "./flight.controller.js";
import { upload } from "../../middelewares/fileupload.middeleware.js";

const flightController = new FlightController();
const FlightRouter = express.Router();

FlightRouter.post("/", upload.single("profilePicture"), (req, res, next) => {
  flightController.createFlight(req, res, next);
});

FlightRouter.put("/:id", upload.single("profilePicture"), (req, res, next) => {
  flightController.updateFlight(req, res, next);
});

FlightRouter.delete("/:id", (req, res, next) => {
  flightController.deleteFlight(req, res, next);
});

FlightRouter.get("/:id", (req, res, next) => {
  flightController.getFlight(req, res, next);
});

FlightRouter.get("/", (req, res, next) => {
  flightController.searchFlight(req, res, next);
});

export default FlightRouter;
