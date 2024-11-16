"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateCheckStatus = exports.updateTask = exports.createTask = exports.getTask = exports.getTasks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler")); ////instead of using try ... catch , we can rather use middleware express-async-handler
const task_1 = __importDefault(require("../models/task"));
// @desc GET all tasks
// @route GET /api/tasks
//@access public
const getTasks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.default.findAll();
    res.status(200).json(tasks);
}));
exports.getTasks = getTasks;
// @desc create a tasks
// @route POST /api/tasks
//@access public
const createTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { name, urgent, important, completed } = req.body;
    if (!name) {
        res.status(400).json({ error: "task not find" });
        throw new Error("Title is required !!");
        return;
    }
    const task = yield task_1.default.create({
        name,
        urgent,
        important,
        completed,
    });
    res.status(201).json(task);
}));
exports.createTask = createTask;
// @desc GET  task by id
// @route GET /api/tasks/:id
//@access public
const getTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.default.findByPk(req.params.id);
    if (!task) {
        res.status(400).json({ error: "task not find" });
        return;
        // throw new Error("Task not found");
    }
    res.status(200).json(task);
}));
exports.getTask = getTask;
// @desc update a task
// @route PUT /api/task/:id
// @access public
const updateTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, urgent, important, completed } = req.body;
    const task = yield task_1.default.findByPk(id);
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
    yield task.save(); //save all
    res.status(200).json(task);
}));
exports.updateTask = updateTask;
// @desc update a check status
// @route PATCH /api/task/:id
// @access public
const updateCheckStatus = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { completed } = req.body;
    const task = yield task_1.default.findByPk(id);
    if (!task) {
        res.status(404).json({ error: "Task no found !!" });
        return;
    }
    task.completed = completed; //mettre a jour la valeur du completed
    yield task.save();
    res.status(200).json(task); //retourner la tache update
}));
exports.updateCheckStatus = updateCheckStatus;
// @desc delete a task
// @route DELETE /api/task/:id
//@access public
const deleteTask = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.default.findByPk(req.params.id);
    if (!task) {
        res.status(400).json({ error: "task not find" });
        return;
        // throw new Error("Task not found");
    }
    yield task.destroy();
    res.status(204).send(); //response with status 204(not content)
}));
exports.deleteTask = deleteTask;
