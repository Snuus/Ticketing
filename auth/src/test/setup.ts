import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';




let mongoServer: any

beforeAll(async () => {

  process.env.JWT_KEY = 'asdfasdf';
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = mongoServer.getUri();
  console.log(process.env.JWT_KEY)
  await mongoose.connect(mongoUri);
})


beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close()
})