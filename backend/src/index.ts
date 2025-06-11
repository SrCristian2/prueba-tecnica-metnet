import express from "express";
import { DatabaseFactory } from "./lib/DatabaseFactory.ts";
import dotenv from "dotenv";
import taskRouter from "./routes/task.routes.ts";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

const startServer = async () => {
  try {
    const databaseInstance = DatabaseFactory.create("mongo");
    await databaseInstance.connect();

    if (!databaseInstance.isConnected()) {
      throw new Error("No se pudo conectar a la base de datos");
    }
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
