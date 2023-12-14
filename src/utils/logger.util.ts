import * as log4js from "log4js";
log4js.configure({
  appenders: {
    out: { type: "stdout" }
  },
  categories: {
    default: { appenders: ["out"], level: "all" }
  }
});

const logger = log4js.getLogger();

export default logger;