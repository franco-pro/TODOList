import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes/taskRoutes";
import bodyParser = require("body-parser");
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use("/api/tasks", router);
// app.use(bodyParser);

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
