import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugins";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogLevel.low,
        message: `Email sent to ${to}`,
        origin: "email.service.ts",
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogLevel.high,
        message: `Error sending email to ${to}`,
        origin: "email.service.ts",
      });

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Logs del servidor";
    const htmlBody = `
      <h1>Logs del servidor</h1>
      <p>Adjunto los logs del servidor</p>
      `;

    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "logs/logs-all.log",
      },
      {
        filename: "logs-medium.log",
        path: "logs/logs-medium.log",
      },
      {
        filename: "logs-high.log",
        path: "logs/logs-high.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
