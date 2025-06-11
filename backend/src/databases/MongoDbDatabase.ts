import mongoose from "mongoose";
import { IDatabase } from "../interfaces/IDatabase.ts";

export class MongoDatabase implements IDatabase {
  private static instance: MongoDatabase;
  private connected = false;

  private constructor() {}

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (this.connected) return;
      await mongoose.connect(process.env.MONGO_URI!);
      this.connected = true;
      console.log("✅ Base de datos de Mongo conectada correctamente");
    } catch (error) {
      this.connected = false;
      console.error("❌ Error al conectar a MongoDB:", error);
      throw new Error("Error al conectar a MongoDB: " + error);
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.connected) return;
    await mongoose.disconnect();
    this.connected = false;
  }

  public isConnected(): boolean {
    return this.connected;
  }
}
