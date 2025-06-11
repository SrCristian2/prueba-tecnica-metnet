import { MongoDatabase } from "../databases/MongoDbDatabase.ts";
import { IDatabase } from "../interfaces/IDatabase.ts";

export class DatabaseFactory {
  static create(databaseType: string): IDatabase {
    switch (databaseType) {
      case "mongo":
        return MongoDatabase.getInstance();
      default:
        throw new Error(`Tipo de base de datos no soportado: ${databaseType}`);
    }
  }
}
