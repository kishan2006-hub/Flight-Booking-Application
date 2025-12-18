import express from "express"
import UserController from "./user.controller.js"
import { upload } from "../../middelewares/fileupload.middeleware.js"

const userController = new UserController()
const UserRouter = express.Router()

UserRouter.put("/profile",upload.single("profilePicture"),(req,res,next)=>{
    userController.profile(req,res,next)
})
UserRouter.get("/",(req,res,next)=>{
    userController.userDatail(req,res,next)
})

export default UserRouter