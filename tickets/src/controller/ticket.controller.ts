import { Request, Response, NextFunction } from "express";
//Comes from our npm pack
import { BadRequestError, signJwt } from "@tickis/common";
import config from "config";

import logger from "../utils/logger";
import { createTicket } from "../services/ticket.services";


export async function createTicketHandler(req: Request, res: Response) {
  try {

    const userId = req.user!.id

    const ticket = await createTicket(req.body, userId); // call create user service


    return res.status(201).send(ticket);
  } catch (e: any) {
    //custom console log
    logger.error(e);
    // send error to client
    throw new BadRequestError(e);
  }
}
