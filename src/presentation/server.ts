import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

// Data sourc and repository
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class ServerApp {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is working`),
        (error) => console.log(`Error: ${error}`)
      ).execute(url);
    });
  }
}
