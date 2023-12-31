import { CONFIG } from "./config";
import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./api";
import { initApp } from "./jobs/app.jobs";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/api/Token-Price-Oracle-Orchestrator.openapi_collection.json";

const { NODE_PORT, NODE_HOST } = CONFIG;
const app = express();

app.set("port", NODE_PORT);
app.set("host", NODE_HOST);

app.use(cors(CONFIG.CORS_OPTIONS));
app.use(bodyParser.json());

const apiRouter = Router();

apiRouter.use("/api", api);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  initApp();

app.use(apiRouter);
// 404
app.use("*", (request: Request, response: Response) => {
  return response.status(404).json({ message: "Not Found" });
});

export default app;