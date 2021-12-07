
import { request } from "express";
import { DocumentDefinition } from "mongoose";

import Ticket, { TicketDoc } from '../../models/Ticket.model'





export async function createTicket(input: DocumentDefinition<TicketDoc>, userId: string) {

  const { title, price } = input

  const ticket = Ticket.build({
    title,
    price,
    userId
  })

  await ticket.save()

  return ticket


}

