import { requireAuth } from "@tickis/common";
import express, { Express, Request, Response } from "express";
import { createTicketHandler } from "../controller/ticket.controller";
import { validateTicket } from "../schemas/ticket.schema";

const router = express.Router();

router.post('/api/tickets', requireAuth, validateTicket, createTicketHandler)


export { router as createTicketRouter }