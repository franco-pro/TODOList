import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("hello word");
});

app
  .listen(port, () => {
    console.log(`server running successfully on http://localhost:${port}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
