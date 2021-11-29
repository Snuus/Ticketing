import express from "express";
import "express-async-errors";
import routes from "../routes";
import { errorHandler } from "./middlewares/error-handler";
import cookieSession from "cookie-session";


function createServer() {
  const app = express();

  app.set("trust proxy", true);
  app.use(express.json());
  app.use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== "test",
    })
  );

  routes(app);

  // Error Handling
  app.use(errorHandler);
  return app;
}
export default createServer;
