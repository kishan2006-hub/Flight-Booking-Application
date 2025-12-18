import mongoose from "mongoose";
import { authSchema } from "../auth/auth.schema.js";
import bcrypt from "bcrypt";

const UserModel = new mongoose.model("Auth", authSchema);

export default class UserRepository {
  async profile(userId, name, email, password,profilePicture,role,phone,gender) {
    try {
      const userFound = await UserModel.findById(userId)
      console.log(userId)
      if(!userFound){
        return false
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            name: name,
            email: email,
            password: hashedPassword,
            profilePicture:profilePicture,
            role,
            phone,
            gender
          }
        }
      );

      return result;
    } catch (err) {
      if (err.code === 11000) {
        throw new Error("Email already exists");
      }
      throw err;
    }
  }

  async userDetail(userId){
    try{
      return await UserModel.findById(userId)
    }catch(err){
      throw err
    }
  }
}