import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { BadRequestError } from '../errors/bad-request-error';
import { UserAttrs } from '../models/user';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}


export const buildUserObject = async (email: string = 'test@haufe.com') => {
  return {
    name: 'Jonh',
    email,
    password: 'jonhdoespas$',
  };
}


let mongo: any, testUserResponse: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'haufetests';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
  const email = `test-${new Date().getTime()}@haufe.com`;
  const user: UserAttrs = await buildUserObject(email);
  testUserResponse = await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});


global.signin = () => {
  if (!testUserResponse?.body?.id) {
    throw new BadRequestError('Could not sign user in');
  }

    const payload = { id: testUserResponse.body.id, email: testUserResponse.body.email };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];
};
