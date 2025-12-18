import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { authSchema } from "./auth.schema.js";

const AuthModel = new mongoose.model("Auth", authSchema);

export default class AuthRepository {
  async register(name, email, password, gender,profilePicture,role,phone) {
    try {
      const existingUser = await AuthModel.findOne({
        email: email,
      });
      if (existingUser) {
        return true;
      }
      const hasedPassword = await bcrypt.hash(password, 12);
      const newUser = new AuthModel({
        name: name,
        email: email,
        password: hasedPassword,
        gender,
        profilePicture:profilePicture,
        role,
        phone
      });
      await newUser.save();
      return false;
    } catch (err) {
      throw err;
    }
  }

  async login(email,password) {
    try {
      const user = await AuthModel.findOne({ email });
      if (user) {
        const confirm = await bcrypt.compare(password, user.password);
        if (confirm) {
          return {
            success: true,
            msg: "User login sucessfuly.",
            role: user.role,
            _id: user._id,
          };
        } else {
          return {
            success: false,
            msg: "Incorrect password.",
          };
        }
      } else {
        return {
          success: false,
          msg: "User is not registred.",
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async logout(userId) {
    try {
      await AuthModel.deleteOne({_id:userId})
    } catch (err) {
      throw err;
    }
  }
}
