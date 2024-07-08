import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL as string);

// created a new express app
const app = express();

// convert the body of api request to json, so that we dont have to do it!
app.use(express.json());

// parse the url
app.use(express.urlencoded({ extended: true }));

// security , prevent certain requests!
app.use(cors());

app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "HI!! from express endpoint!" });
});

app.listen(7000, () => {
  console.log("PORT ACTIVATED 7000");
});
