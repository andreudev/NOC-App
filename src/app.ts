import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugins";
import { LogModel, MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server";
import "dotenv/config";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "MEDIUM",
  //     message: "This is a medium log",
  //     origin: "app.ts",
  //   },
  // });

  // const logs = await prisma.logModel.findMany();
  // console.log(logs);

  ServerApp.start();
}
