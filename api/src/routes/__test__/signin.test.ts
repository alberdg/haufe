import request from 'supertest';
import { app } from '../../app';
import { buildUserObject } from '../../test/setup';

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@haufe.com',
      password: 'password'
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  const user = await buildUserObject();
  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: 'aslkdfjalskdfj'
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  const user = await buildUserObject();
  await request(app)
    .post('/api/users/signup')
    .send(user)
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: user.password
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
