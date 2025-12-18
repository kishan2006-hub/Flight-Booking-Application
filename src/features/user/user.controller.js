import ApplicationError from "../../error-handler/application.error.js";
import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async profile(req, res, next) {
    try {
      const userId = req.userId;
      const userFound = await this.userRepository.profile(
        userId,
        req?.body?.name,
        req?.body?.email,
        req?.body?.password,
        req?.file?.filename,
        req?.body?.role,
        req?.body?.phone,
        req?.body?.gender
      );

      if(!userFound){
        throw new ApplicationError(400,"User not found!")
      }

      return res.status(200).send("Profile updated successfully.");
    } catch (err) {
      next(err);
    }
  }

  async userDatail(req, res, next) {
    try {
      const userId = req.userId;
      const user = await this.userRepository.userDetail(userId);

      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
}
