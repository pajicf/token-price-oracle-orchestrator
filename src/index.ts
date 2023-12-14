import router from "./app";
import { createServer, Server } from "http";
import logger from "./utils/logger.util";

const server: Server = createServer(router);

server.listen(router.get("port"), router.get("host"), async () => {
  process.on("SIGINT", async () => {
    process.exit();
  });

  logger.log(`Server started on ${router.get("host")}:${router.get("port")}`);
  logger.log("Press CTRL-C to stop\n");
});

export default server;