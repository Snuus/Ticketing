import express from "express";
import "express-async-errors";

import { errorHandler, NotFoundError } from "@tickis/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";


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

  app.use(createTicketRouter)

  app.all("*", async (req, res) => {
    throw new NotFoundError();
  });

  // Error Handling
  app.use(errorHandler);
  return app;
}
export default createServer;
