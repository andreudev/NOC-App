import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
    console.log("Mongo log created", newLog.id);
  }
  async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    // return logs.map((mongolog) => LogEntity.fromObject(mongolog));
    return logs.map(LogEntity.fromObject);
  }
}
