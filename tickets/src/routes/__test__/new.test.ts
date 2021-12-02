import request from "supertest";
import createServer from "../../app";

const app = createServer();


it('has a routehandler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});
  expect(response.status).not.toEqual(404)
})

it('can only be accessed if logged in', async () => {

})

it('returns error if invalid title is provided', async () => {

})

it('returns error if invalod price is provided', async () => {

})

it('creates a ticket with valid inputs', async () => {

})