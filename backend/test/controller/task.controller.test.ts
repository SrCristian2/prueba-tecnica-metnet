import { Request, Response } from "express";
import taskController from "../../src/controllers/task.controller";
import taskServices from "../../src/services/task.services";

jest.mock("../../src/services/task.services");

describe("taskController", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn(() => ({ json: jsonMock })) as any;
        req = {};
        res = {
            status: statusMock,
            json: jsonMock,
        } as any;
        jest.clearAllMocks();
    });

    describe("createTask", () => {
        it("should return 405 if method is not POST", async () => {
            req.method = "GET";
            await taskController.createTask(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(405);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Method Not Allowed" });
        });

        it("should call taskServices.createTask if method is POST", async () => {
            req.method = "POST";
            (taskServices.createTask as jest.Mock).mockResolvedValue("created");
            await taskController.createTask(req as Request, res as Response);
            expect(taskServices.createTask).toHaveBeenCalledWith(req, res);
        });
    });

    describe("getAllTasks", () => {
        it("should return 405 if method is not GET", async () => {
            req.method = "POST";
            await taskController.getAllTasks(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(405);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Method Not Allowed" });
        });

        it("should call taskServices.getAllTasks if method is GET", async () => {
            req.method = "GET";
            (taskServices.getAllTasks as jest.Mock).mockResolvedValue("all");
            await taskController.getAllTasks(req as Request, res as Response);
            expect(taskServices.getAllTasks).toHaveBeenCalledWith(req, res);
        });
    });

    describe("getTaskById", () => {
        it("should return 405 if method is not GET", async () => {
            req.method = "POST";
            await taskController.getTaskById(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(405);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Method Not Allowed" });
        });

        it("should call taskServices.getTaskById if method is GET", async () => {
            req.method = "GET";
            (taskServices.getTaskById as jest.Mock).mockResolvedValue("one");
            await taskController.getTaskById(req as Request, res as Response);
            expect(taskServices.getTaskById).toHaveBeenCalledWith(req, res);
        });
    });

    describe("updateTask", () => {
        it("should return 405 if method is not PUT", async () => {
            req.method = "POST";
            await taskController.updateTask(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(405);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Method Not Allowed" });
        });

        it("should call taskServices.updateTask if method is PUT", async () => {
            req.method = "PUT";
            (taskServices.updateTask as jest.Mock).mockResolvedValue("updated");
            await taskController.updateTask(req as Request, res as Response);
            expect(taskServices.updateTask).toHaveBeenCalledWith(req, res);
        });
    });

    describe("deleteTask", () => {
        it("should return 405 if method is not DELETE", async () => {
            req.method = "POST";
            await taskController.deleteTask(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(405);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Method Not Allowed" });
        });

        it("should call taskServices.deleteTask if method is DELETE", async () => {
            req.method = "DELETE";
            (taskServices.deleteTask as jest.Mock).mockResolvedValue("deleted");
            await taskController.deleteTask(req as Request, res as Response);
            expect(taskServices.deleteTask).toHaveBeenCalledWith(req, res);
        });
    });
});