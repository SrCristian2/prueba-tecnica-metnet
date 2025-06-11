export interface Task {
  _id?: string;
  title: string;
  description: string;
  status: "PENDING" | "FINISHED";
  createdAt?: string;
  updatedAt?: string;
}