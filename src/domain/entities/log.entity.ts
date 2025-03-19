export enum LogLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogLevel; // enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;

    const { message, level, createdAt, origin } = JSON.parse(json);

    // if (!message || !level || !createdAt) {
    //   throw new Error("Invalid log entity");
    // }

    const log = new LogEntity({ message, level, createdAt, origin });

    return log;
  };

  static fromObject(object: { [key: string]: any }): LogEntity {
    const { message, level, createdAt, origin } = object;
    return new LogEntity({ message, level, createdAt, origin });
  }
}
