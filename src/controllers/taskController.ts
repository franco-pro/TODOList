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
  console.log(req.body);
  const { name, urgent, important, completed } = req.body;
  if (!name) {
    res.status(400).json({ error: "task not find" });
    throw new Error("Title is required !!");
    return;
  }
  const task = await Task.create({
    name,
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
  const { name, urgent, important, completed } = req.body;
  const task = await Task.findByPk(id);
  console.log("task", task);
  if (!task) {
    res.status(400).json({ error: "task not find" });
    // throw new Error("Task not found !");
    return;
  }
  //update section
  task.name = name || task.name;
  task.urgent = urgent || task.urgent;
  task.important = important || task.important;
  task.completed = completed !== undefined ? completed : task.completed;

  await task.save(); //save all
  res.status(200).json(task);
});

// @desc update a check status
// @route PATCH /api/task/:id
// @access public
const updateCheckStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = await Task.findByPk(id);
  if (!task) {
    res.status(404).json({ error: "Task no found !!" });
    return;
  }

  task.completed = completed; //mettre a jour la valeur du completed
  await task.save();
  res.status(200).json(task); //retourner la tache update
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

export {
  getTasks,
  getTask,
  createTask,
  updateTask,
  updateCheckStatus,
  deleteTask,
};
