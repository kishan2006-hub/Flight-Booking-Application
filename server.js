import "./env.js";
import express from "express";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import ApplicationError from "./src/error-handler/application.error.js";
import mongoose from "mongoose";
import AuthRouter from "./src/features/auth/auth.routes.js";
import UserRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middelewares/jwt.middeleware.js";
import FlightRouter from "./src/features/flight/flight.routes.js";
import BookingRouter from "./src/features/booking/booking.routes.js";

const server = express();

server.use(express.json());

server.use("/api/auth", AuthRouter);
server.use("/api/users",jwtAuth, UserRouter);
server.use("/api/flights",jwtAuth,FlightRouter)
server.use("/api/bookings/",jwtAuth,BookingRouter)

server.use((err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  // For server error
  return res.status(500).send("Something went wrong! Please try again.");
});

server.listen(5000, () => {
  console.log("Server is linten on 5000.");
  connectUsingMongoose();
});