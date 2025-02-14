import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Data sourc and repository
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const emailService = new EmailService();

export class ServerApp {
  public static start() {
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

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is working`),
    //     (error) => console.log(`Error: ${error}`)
    //   ).execute(url);
    // });
  }
}
