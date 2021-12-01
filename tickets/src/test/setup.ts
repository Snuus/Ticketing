import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../../src/app";

const app = createServer();
declare global {
  var signin: () => Promise<string[]>;
}

let mongoServer: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});


global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201)

  const cookie = response.get('Set-Cookie')

  return cookie;
}

