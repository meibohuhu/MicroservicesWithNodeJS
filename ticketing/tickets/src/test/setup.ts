import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import request from "supertest";
import { app } from "../app";

let mongo: any;    // declare this variable ahead of time
beforeAll(async () => {
  process.env.JWT_KEY = 'jwei';
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// create function/property for global variable
declare global {
  var signin: () => string[];
}

// create function/property for global variable, return cookie
/*
  const email = "t@t.com";
  const password = "123456";
*/
global.signin = () => {
  // Build a JWT payload.  { id, email }
  const payload = {
    // id: '12skjdhfkj23',
    id: new mongoose.Types.ObjectId().toHexString(),     // each time using random id
    email: 'meibohu@usc.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  // cookie: session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall5WldabFkyVXdOekF4WlRSallXTXhZemczWkRnMk9DSXNJbVZ0WVdsc0lqb2lkRUIwTG1OdmJTSXNJbWxoZENJNk1UWTFPVGc1TURreE1uMC5pWWd5YU1fSHd3WGNxVk5uUjAycUxqSnU5UjktdVBVTXlEVk9qYU9RWjA0In0=
  return [`session=${base64}`];

  // const response = await request(app)
  //   .post("/api/users/signup")
  //   .send({
  //     email,
  //     password,
  //   })
  //   .expect(201);
  
  // const cookie = response.get("Set-Cookie");
  // return cookie;
}