import { Express } from "express";

import { NotFoundError, requireAuth, requireUser } from "@tickis/common";


function routes(app: Express) {


  app.all("*", async (req, res) => {
    throw new NotFoundError();
  });
}

export default routes;
