import request from "supertest";
import createServer from "../../app";

const app = createServer();


it("responds with a details of the current user", async () => {
  const cookie = await signin()
  const response = await request(app)
    .get("/api/users/currentuser")
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.user.email).toEqual(
    "test@test.com"
  );

});


it("responds with null if not authenticated", async () => {

  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);

  expect(response.body.user).toEqual(undefined);

});
