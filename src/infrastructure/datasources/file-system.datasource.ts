import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogLevel.low) return;

    if (log.level === LogLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));

    return logs;
  };

  async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`Invalid severity level: ${severityLevel}`);
    }
  }
}
