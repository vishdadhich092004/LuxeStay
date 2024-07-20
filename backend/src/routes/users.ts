import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = express.Router();

// api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password cannot be empty").notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        res.status(400).json({ message: "User already exists" });
      }
      const newUser = new User(req.body);
      await newUser.save();

      const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // for dev purpose
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Registeration Successfull" });
    } catch (e) {
      // console.log(e);
      res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
);

export default router;
