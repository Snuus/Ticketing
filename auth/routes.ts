import { Express, Request, Response } from "express";
import {
  createUserHandler,
  currentUserHandler,
  loginUserHandler,
  signoutUserHandler,
} from "./src/controller/user.controller";
import { NotFoundError } from "./src/errors/not-found-error";
import { requireAuth } from "./src/middlewares/require-auth";
import requireUser from "./src/middlewares/require-user";
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

  app.all("*", async (req, res) => {
    throw new NotFoundError();
  });
}

export default routes;
