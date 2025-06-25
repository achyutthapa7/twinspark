import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./middlewares/errorHandler";
import routeInit from "./config/routeinit";
const app = express();
routeInit(app);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(errorHandler);
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(limiter);

app.get("/", (_, res) => {
  res.send("Hello, TypeScript + Express!");
});

export default app;
