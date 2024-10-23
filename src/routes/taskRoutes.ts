import express, { Request, Response } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
const router = express.Router();

//api endpoints
//GET all tasks
router.route("/").get(getTasks);

//create task
router.route("/").post(createTask);

//get specific task
router.route("/:id").get(getTask);

//update task by id
router.route("/:id").put(updateTask);

//delete task by id
router.route("/:id").delete(deleteTask);

export { router };
