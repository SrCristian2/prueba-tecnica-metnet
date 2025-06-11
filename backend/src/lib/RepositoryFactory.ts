import mongoRepositories from "../repositories/mongo/index.ts";

const repositoriesByDB = {
  mongo: mongoRepositories,
};

type DBType = keyof typeof repositoriesByDB;
type RepositoryName = keyof typeof mongoRepositories;

const RepositoryFactory = (repoName: RepositoryName, dbType: DBType = "mongo") => {
  const dbRepos = repositoriesByDB[dbType];

  if (!dbRepos) {
    throw new Error(`Unsupported DB type: ${dbType}`);
  }

  const repo = dbRepos[repoName].getInstance();
  if (!repo) {
    throw new Error(`Repository "${repoName}" not found for DB type "${dbType}"`);
  }

  return repo;
};

export default RepositoryFactory;