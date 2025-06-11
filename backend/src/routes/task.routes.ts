import { Router } from "express";
import taskController from "../controllers/task.controller.ts";
import { validateDto } from "../middlewares/validateBody.ts";
import { CreateTaskDto } from "../dtos/create-task.dto.ts";
import { UpdateTaskDto } from "../dtos/update-task.dto.ts";

const taskRouter = Router();

taskRouter.post("/",validateDto(CreateTaskDto), taskController.createTask);
taskRouter.get("/", taskController.getAllTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.put("/:id",validateDto(UpdateTaskDto), taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);

export default taskRouter;
