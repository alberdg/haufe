import request from 'supertest';
import { app } from '../../app';

it('Can add a character to favourites', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .patch('/api/characters/1')
    .set('Cookie', cookie)
    .send({ favourite: true });
  expect(response.status).toEqual(200);
  expect(response.body.characterId).toEqual('1');
  expect(response.body.userId).toBeDefined();
  expect(response.body.id).toBeDefined();
});

it('Can remove a character to favourites', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .patch('/api/characters/1')
    .set('Cookie', cookie)
    .send({ favourite: false });
    console.log('body', response.body);
  expect(response.status).toEqual(200);
  expect(response.body.characterId).not.toBeDefined();
  expect(response.body.userId).not.toBeDefined();
  expect(response.body.id).not.toBeDefined();
});
