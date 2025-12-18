import express from "express"
import BookingController from "./booking.controller.js"

const bookingController = new BookingController()
const BookingRouter = express.Router()

BookingRouter.post("/",(req,res,next)=>{
  bookingController.createBooking(req,res,next)
})

BookingRouter.get("/:id",(req,res,next)=>{
  bookingController.getBooking(req,res,next)
})

BookingRouter.delete("/:id/cancel",(req,res,next)=>{
  bookingController.cancelBooking(req,res,next)
})

BookingRouter.put("/:id",(req,res,next)=>{
  bookingController.updateBooking(req,res,next)
})

BookingRouter.get("/:id/passengers",(req,res,next)=>{
  bookingController.getBookings(req,res,next)
})

export default BookingRouter