import request from "supertest";
import express, { Express } from "express";
import taskRouter from "../../src/routes/task.routes";
import taskController from "../../src/controllers/task.controller";

jest.mock("../../src/controllers/task.controller");
jest.mock("../../src/middlewares/validateBody", () => ({
    validateDto: () => (req: any, res: any, next: any) => next(),
}));

const app: Express = express();
app.use(express.json());
app.use("/tasks", taskRouter);

describe("Task Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("POST /tasks should call createTask controller", async () => {
        (taskController.createTask as jest.Mock).mockImplementation((req, res) => res.status(201).json({}));
        const response = await request(app)
            .post("/tasks")
            .send({ title: "Test", description: "Test desc" });
        expect(taskController.createTask).toHaveBeenCalled();
        expect(response.status).toBe(201);
    });

    it("GET /tasks should call getAllTasks controller", async () => {
        (taskController.getAllTasks as jest.Mock).mockImplementation((req, res) => res.status(200).json([]));
        const response = await request(app).get("/tasks");
        expect(taskController.getAllTasks).toHaveBeenCalled();
        expect(response.status).toBe(200);
    });

    it("GET /tasks/:id should call getTaskById controller", async () => {
        (taskController.getTaskById as jest.Mock).mockImplementation((req, res) => res.status(200).json({}));
        const response = await request(app).get("/tasks/1");
        expect(taskController.getTaskById).toHaveBeenCalled();
        expect(response.status).toBe(200);
    });

    it("PUT /tasks/:id should call updateTask controller", async () => {
        (taskController.updateTask as jest.Mock).mockImplementation((req, res) => res.status(200).json({}));
        const response = await request(app)
            .put("/tasks/1")
            .send({ title: "Updated" });
        expect(taskController.updateTask).toHaveBeenCalled();
        expect(response.status).toBe(200);
    });

    it("DELETE /tasks/:id should call deleteTask controller", async () => {
        (taskController.deleteTask as jest.Mock).mockImplementation((req, res) => res.status(204).send());
        const response = await request(app).delete("/tasks/1");
        expect(taskController.deleteTask).toHaveBeenCalled();
        expect(response.status).toBe(204);
    });
});