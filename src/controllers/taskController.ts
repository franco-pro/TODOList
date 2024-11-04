import asyncHandler from "express-async-handler"; ////instead of using try ... catch , we can rather use middleware express-async-handler
import Task from "../models/task";

// @desc GET all tasks
// @route GET /api/tasks
//@access public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
});

// @desc create a tasks
// @route POST /api/tasks
//@access public
const createTask = asyncHandler(async (req, res) => {
  const { title, description, urgent, important, completed } = req.body;
  if (!title) {
    res.status(400).json({ error: "task not find" });
    return;
    throw new Error("Title is required !!");
  }
  const task = await Task.create({
    title,
    description,
    urgent,
    important,
    completed,
  });
  res.status(201).json(task);
});

// @desc GET  task by id
// @route GET /api/tasks/:id
//@access public
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    res.status(400).json({ error: "task not find" });
    return;
    // throw new Error("Task not found");
  }

  res.status(200).json(task);
});

// @desc update a task
// @route PUT /api/task/:id
// @access public
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, urgent, important, completed } = req.body;
  const task = await Task.findByPk(id);
  console.log("task", task);
  if (!task) {
    res.status(400).json({ error: "task not find" });
    // throw new Error("Task not found !");
    return;
  }
  //update section
  task.title = title || task.title;
  task.description = description || task.description;
  task.urgent = urgent || task.urgent;
  task.important = important || task.important;
  task.completed = completed !== undefined ? completed : task.completed;

  await task.save(); //save all
  res.status(200).json(task);
});

// @desc delete a task
// @route DELETE /api/task/:id
//@access public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    res.status(400).json({ error: "task not find" });
    return;
    // throw new Error("Task not found");
  }
  await task.destroy();
  res.status(204).send(); //response with status 204(not content)
});

export { getTasks, getTask, createTask, updateTask, deleteTask };
