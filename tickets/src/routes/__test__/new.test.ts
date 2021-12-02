import request from "supertest";
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

})

it('returns error if invalod price is provided', async () => {

})

it('creates a ticket with valid inputs', async () => {

})