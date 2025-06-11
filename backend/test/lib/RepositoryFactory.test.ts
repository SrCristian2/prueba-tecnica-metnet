import RepositoryFactory from "../../src/lib/RepositoryFactory";

describe("RepositoryFactory", () => {
  it("should return a repository instance", () => {
    const repo = RepositoryFactory("TaskRepository");
    expect(repo).toBeDefined();
  });
});