import ApplicationError from "../../error-handler/application.error.js";
import AuthRepository from "./auth.repository.js";
import jwt from "jsonwebtoken";

export default class AuthController {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      const existingUser = await this.authRepository.register(
        name,
        email,
        password,
        gender,
        req?.file?.filename,
        req?.body?.role,
        req?.body?.phone
      );
      if (existingUser) {
        throw new ApplicationError(
          409,
          "User already registered. Please login."
        );
      }
      return res.status(201).send("User registred successfully.");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.authRepository.login(email, password);
      if (user.success) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          message: user.msg,
          token,
        });
      } else {
        throw new ApplicationError(400, user.msg);
      }
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const userId = req.userId
      await this.authRepository.logout(userId);
      
      return res.status(200).send("Logout successfully.");
    } catch (err) {
      next(err);
    }
  }
}
