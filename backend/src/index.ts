import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Mongo Connection Successful !");
  })
  .catch((e) => {
    console.log("Mongo Connection Issues!");
  });

// created a new express app
const app = express();
app.use(cookieParser());
// convert the body of api request to json, so that we dont have to do it!
app.use(express.json());

// parse the url
app.use(express.urlencoded({ extended: true }));

// security , prevent certain requests!
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(7000, () => {
  console.log("PORT ACTIVATED 7000");
});
