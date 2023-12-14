import { Server } from "socket.io";
import { Server as ServerType } from "http";
import logger from "../utils/logger.util";

class SocketService {
  private _socketio: Server;

  constructor(httpServer_: ServerType) {
    this._socketio = new Server(httpServer_, {
      cors: {
        origin: "*"
      }
    });

    this.setupGreetingListeners();
  }

  private setupGreetingListeners() {
    this._socketio.on("connection", (socket) => {
      logger.log(`New connection on socket, with id ${socket.id}`);

      socket.on("disconnect", () => {
        logger.log(`Connection with id ${socket.id} disconnected`);
      });
    });
  }

  public emitEvent(eventName: string, ...eventArgs: any) {
    this._socketio.emit("PriceUpdated", eventArgs);
  }
}

export default SocketService;