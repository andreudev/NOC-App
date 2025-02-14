import { envs } from "./config/plugins/envs.plugins";
import { ServerApp } from "./presentation/server";
import "dotenv/config";

(async () => {
  main();
})();

function main() {
  ServerApp.start();
  // console.log(envs);
}
