import {DatabaseFactory} from "../../src/lib/DatabaseFactory";

describe("databaseFactory", () => {
  it("should return a MongoDB instance when 'MongoDB' is passed", () => {
    const db = DatabaseFactory.create("mongo");
    expect(db).toBeDefined();
    expect(db.constructor.name).toMatch(/Mongo/i);
  });

  it("should throw an error for unknown database engines", () => {
    expect(() => DatabaseFactory.create("mongod")).toThrow();
  });
});