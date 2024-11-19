import express, { Request, Response } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateCheckStatus,
} from "../controllers/taskController";
const router = express.Router();

//|--------------------|
//|  api endpoints     |
//|-------------------|
//GET all tasks
router.route("/").get(getTasks);

//create task
router.route("/").post(createTask);

//get specific task
router.route("/:id").get(getTask);

//update task by id
router.route("/:id").patch(updateTask);

//update completed's value
router.route("/:id").patch(updateCheckStatus);

//delete task by id
router.route("/:id").delete(deleteTask);

export { router };
