import { Response } from "../helpers/Response.ts";
import RepositoryFactory from "../lib/RepositoryFactory.ts";
const taskServices: { [key: string]: any } = {};

const taskRepository = RepositoryFactory("TaskRepository");

taskServices.createTask = async (req: any, res: Response) => {
  try {
    const newTask = await taskRepository.createTask(req.body);
    return Response(res, 201, true, newTask, "Task created successfully");
  } catch (error: any) {
    return Response(res, 500, false, "", error.message);
  }
};

taskServices.getAllTasks = async (req: any, res: Response) => {
  try {
    const task = await taskRepository.getAllTasks();
    return Response(res, 200, true, task, "Tasks retrieved successfully");
  } catch (error: any) {
    return Response(res, 500, false, "", error.message);
  }
};

taskServices.getTaskById = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return Response(res, 400, false, "", "Task ID is required");
    }
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      return Response(res, 404, false, "", "Task not found");
    }
    return Response(res, 200, true, task, "Task retrieved successfully");
  } catch (error: any) {
    return Response(res, 500, false, "", error.message);
  }
};

taskServices.updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return Response(res, 400, false, "", "Task ID is required");
    }
    const updatedTask = await taskRepository.updateTask(id, req.body);
    if (!updatedTask) {
      return Response(res, 404, false, "", "Task not found");
    }
    return Response(res, 200, true, updatedTask, "Task updated successfully");
  } catch (error: any) {
    return Response(res, 500, false, "", error.message);
  }
};

taskServices.deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return Response(res, 400, false, "", "Task ID is required");
    }
    const deletedTask = await taskRepository.deleteTask(id);
    if (!deletedTask) {
      return Response(res, 404, false, "", "Task not found");
    }
    return Response(res, 200, true, deletedTask, "Task deleted successfully");
  } catch (error: any) {
    return Response(res, 500, false, "", error.message);
  }
};

export default taskServices;
