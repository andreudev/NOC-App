import mongoose from "mongoose";
/**
   level: LogLevel;
   message: string;
   createdAt?: Date;
   origin: string;
 */

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  origin: {
    type: String,
  },
});

export const LogModel = mongoose.model("Log", logSchema);
