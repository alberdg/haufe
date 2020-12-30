import request from 'supertest';
import { app } from '../../app';

it('Can fetch characters', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .get('/api/characters')
    .set('Cookie', cookie)
    .send();
  expect(response.body.info).toBeDefined();
  expect(response.body.results).toBeDefined();
  expect(response.body.results.length).toEqual(20);
});

it('Can paginate', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .get('/api/characters?page=2')
    .set('Cookie', cookie)
    .send();
  expect(response.body.info).toBeDefined();
  expect(response.body.results).toBeDefined();
  expect(response.body.results.length).toEqual(20);
});


it('Returns a 404 for a non existing page', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .get('/api/characters?page=2000')
    .set('Cookie', cookie)
    .send();
  expect(response.status).toEqual(404);
});
