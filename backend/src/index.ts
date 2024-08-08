import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import hotelRoutes from "./routes/hotel";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("Mongo Connection Successful ");
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
// deployment thing
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels/", hotelRoutes);
// non defined routes
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7000, () => {
  console.log("PORT ACTIVATED 7000");
});
