import router from "./app";
import { createServer, Server } from "http";

const server: Server = createServer(router);

server.listen(router.get("port"), router.get("host"), async () => {
  process.on("SIGINT", async () => {
    process.exit();
  });

  console.log(`Server started on ${router.get("host")}:${router.get("port")}`);
  console.log("Press CTRL-C to stop\n");
});

export default server;