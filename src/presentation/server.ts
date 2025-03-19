import { LogLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Data sourc and repository
const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  // new PostgresLogDatasource()
  // new MongoLogDatasource()
);
const mongoLogRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  // new PostgresLogDatasource()
  new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  new PostgresLogDatasource()
  // new MongoLogDatasource()
);

const emailService = new EmailService();

export class ServerApp {
  public static async start() {
    console.log("Server started...");

    // Mandar email

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "andrew00ws@gmail.com",
    //   "colcienciasiti@gmail.com",
    // ]);

    // emailService.sendEmailWithFileSystemLogs([
    //   "andrew00ws@gmail.com",
    //   "colcienciasiti@gmail.com",
    // ]);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is working`),
        (error) => console.log(`Error: ${error}`)
      ).execute(url);
    });

    // const logs = await logRepository.getLogs(LogLevel.high);
    // console.log(logs);
  }
}
