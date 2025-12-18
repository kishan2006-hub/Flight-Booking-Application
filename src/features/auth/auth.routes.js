import express from "express";
import AuthController from "./auth.controller.js";
import jwtAuth from "../../middelewares/jwt.middeleware.js";
import { upload } from "../../middelewares/fileupload.middeleware.js";


const authController = new AuthController()
const AuthRouter = express.Router()

AuthRouter.post("/register",upload.single("profilePicture"),(req,res,next)=>{
    authController.register(req,res,next)
})
AuthRouter.post("/login",(req,res,next)=>{
    authController.login(req,res,next)
})
AuthRouter.post("/logout",jwtAuth,(req,res,next)=>{
    authController.logout(req,res,next)
})


export default AuthRouter