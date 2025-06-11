import { taskModel } from "../../models/task.model.ts";
import { Task } from "../../interfaces/task.interface.ts";
import { Types } from "mongoose";

export class TaskRepository {
  private static instance: TaskRepository;
  private taskModel = taskModel;
  private constructor() {}

  public static getInstance(): TaskRepository {
    if (!TaskRepository.instance) {
      TaskRepository.instance = new TaskRepository();
    }
    return TaskRepository.instance;
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return await newTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskModel.find();
  }

  async getTaskById(id: string): Promise<Task | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await this.taskModel.findById(id);
  }

  async updateTask(id: string, task: Partial<Task>): Promise<Task | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await this.taskModel.findByIdAndUpdate(id, task);
  }

  async deleteTask(id: string): Promise<Task | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return await this.taskModel.findByIdAndDelete(id);
  }
}
