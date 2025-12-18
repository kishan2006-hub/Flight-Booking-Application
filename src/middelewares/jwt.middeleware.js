import jwt from "jsonwebtoken"
import ApplicationError from "../error-handler/application.error.js"

const jwtAuth = (req,res,next)=>{
    const token = req.headers["authorization"]

    if(!token){
       throw new ApplicationError(401,"Unauthorized")
    }

    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = payload.userId
        req.role = payload.role
        next()
    }catch(err){
        throw new ApplicationError(401,"Expire your token! Please login again.")
    }
}

export default jwtAuth