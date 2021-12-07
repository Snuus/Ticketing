import request from "supertest";
import Ticket from "../../../models/Ticket.model";
import createServer from "../../app";

const app = createServer();


it('has a routehandler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})

  expect(response.status).not.toEqual(404)
})

it('can only be accessed if logged in', async () => {
  await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)
})

it('returns a status othern then 401 if user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})

  expect(response.status).not.toEqual(401)
})



it('returns error if invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10
    })
    .expect(400)
})

it('returns error if invalod price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      price: -10
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'test'

    })
    .expect(400)
})


it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      price: 10
    })
    .expect(201)

  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
  expect(tickets[0].price).toEqual(10)
  expect(tickets[0].title).toEqual('title')
})