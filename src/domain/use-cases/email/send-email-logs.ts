import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) throw new Error("Error sending email");
      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogLevel.high,
        message: `Error sending email to ${to}`,
        origin: "send-email-logs.ts",
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
