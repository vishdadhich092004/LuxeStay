import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();

// api/users/register
router.post("/register", async (req: Request, res: Response) => {
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
      maxAge: 24 * 60 * 60,
    });
    return res.status(200).json({ message: "Registeration Successfull" });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

export default router;
