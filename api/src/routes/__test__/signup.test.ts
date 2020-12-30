import request from 'supertest';
import { app } from '../../app';
import { buildUserObject } from '../../test/setup';

it('returns a 201 on successful signup', async () => {
  const user = await buildUserObject();

  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);
});

it('returns a 400 with an invalid name', async () => {
  const user = await buildUserObject();
  user.name = '';
  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid email', async () => {
  const user = await buildUserObject();
  user.email = '';
  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  const user = await buildUserObject();
  user.password = '';
  return request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(400);
});


it('disallows duplicate emails', async () => {
  const user = await buildUserObject();
  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(400);
});


it('sets a cookie after successful signup', async () => {
  const user = await buildUserObject();
  const response = await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
