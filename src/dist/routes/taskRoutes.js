"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../controllers/taskController");
const router = express_1.default.Router();
exports.router = router;
//api endpoints
//GET all tasks
router.route("/").get(taskController_1.getTasks);
//create task
router.route("/").post(taskController_1.createTask);
//get specific task
router.route("/:id").get(taskController_1.getTask);
//update task by id
router.route("/:id").put(taskController_1.updateTask);
//delete task by id
router.route("/:id").delete(taskController_1.deleteTask);
