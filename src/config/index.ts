import * as dotenv from "dotenv";
import { CorsOptions } from "cors";

dotenv.config();

export enum ApplicationEnv {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test"
}

const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

const {
  NODE_PORT,
  NODE_HOST,
  NODE_ENV
} = process.env;

const ENV: ApplicationEnv = NODE_ENV as ApplicationEnv || ApplicationEnv.DEVELOPMENT;

export const CONFIG = {
  NODE_PORT,
  NODE_HOST,
  CORS_OPTIONS: corsOptions,
  NODE_ENV: ENV,
};
