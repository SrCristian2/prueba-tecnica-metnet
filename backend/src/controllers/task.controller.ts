import { Request, Response } from "express";
import taskServices from "../services/task.services.ts";

const taskController: { [key: string]: any } = {};

taskController.createTask = async (req: Request, res: Response) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return await taskServices.createTask(req, res);
};

taskController.getAllTasks = async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return await taskServices.getAllTasks(req, res);
};

taskController.getTaskById = async (req: Request, res: Response) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return await taskServices.getTaskById(req, res);
};

taskController.updateTask = async (req: Request, res: Response) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return await taskServices.updateTask(req, res);
};

taskController.deleteTask = async (req: Request, res: Response) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return await taskServices.deleteTask(req, res);
};

export default taskController;
