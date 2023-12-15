import { Router } from "express";
import { error } from "./middlewares/error.middleware";
import StatusRoute from "./routes/status.route";
import TickersRoute from "./routes/tickers.route";
import TickersValidator from "./validators/tickers.validator";
import RevertsRoute from "./routes/reverts.route";

const v1 = Router();

v1.get("/status", StatusRoute.getStatus);

v1.get("/tickers/", TickersRoute.getTickerList);
v1.get("/tickers/:tickerSymbol", TickersValidator.validateGetTicker, TickersRoute.getTicker);
v1.get("/tickers/:tickerSymbol/history", TickersValidator.validateGetTickerPriceHistory, TickersRoute.getTickerPriceHistory);

v1.get("/reverts/", RevertsRoute.getRevertList);

v1.use(error);

export default v1;