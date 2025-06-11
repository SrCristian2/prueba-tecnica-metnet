import { Schema, model } from "mongoose";
import { Task } from "../interfaces/task.interface.ts";

const taskSchema = new Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const taskModel = model<Task>("Task", taskSchema);
