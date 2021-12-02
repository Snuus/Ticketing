import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../../src/app";
import { signJwt } from "@tickis/common";
import config from "config";


const app = createServer();
declare global {
  var signin: () => string[];
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


global.signin = () => {
  // Build a jwt payload. { id, email}
  const payload = {
    id: 'aasdadad',
    email: 'robin@test.com'

  }

  const token = signJwt(
    { payload },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes)
  );

  const session = { jwt: token }


  const sessionJSON = JSON.stringify(session)


  const base64 = Buffer.from(sessionJSON).toString('base64')

  return [`express:sess=${base64}`]


}

