import { requireAuth } from "@tickis/common";
import express, { Express, Request, Response } from "express";
import { validateTicket } from "../schemas/ticket.schema";

const router = express.Router();

router.post('/api/tickets', requireAuth, validateTicket, (req: Request, res: Response) => {
  res.sendStatus(200)
})


export { router as createTicketRouter }