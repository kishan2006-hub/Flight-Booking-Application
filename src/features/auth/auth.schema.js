import mongoose from "mongoose";

export const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email"
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  profilePicture: {
    type: String,
    default: ""
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },

  phone: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
  },
});