import { Express, Request, Response } } from "express";
import {
  createUserHandler,
  currentUserHandler,
  loginUserHandler,
  signoutUserHandler,
} from "./src/controller/user.controller";
import { NotFoundError, requireAuth, requireUser } from "@tickis/common";

const { validateUser, validateLogin } = require("./src/schemas/user.schema");

function routes(app: Express) {
  app.post("/api/users/signup", validateUser, createUserHandler);

  app.post("/api/users/signin", validateLogin, loginUserHandler);

  app.get(
    "/api/users/currentuser",
    requireUser,
    requireAuth,
    currentUserHandler
  );

  app.post("/api/users/signout", signoutUserHandler);

  app.all("*", async (req: Request, res: Response) => {
    throw new NotFoundError();
  });
}

export default routes;
