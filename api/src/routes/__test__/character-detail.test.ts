import request from 'supertest';
import { app } from '../../app';

it('Can fetch character detail', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .get('/api/characters/1')
    .set('Cookie', cookie)
    .send();
  expect(response.status).toEqual(200)
  expect(response.body.character).toBeDefined();
  expect(response.body.character.name).toEqual('Rick Sanchez');
  expect(response.body.character.status).toEqual('Alive');
  expect(response.body.character.species).toEqual('Human');
  expect(response.body.character.image).toEqual('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
  expect(response.body.character.location).toBeDefined();
  expect(response.body.character.location.name).toEqual('Earth (Replacement Dimension)');
  expect(response.body.character.episode).toBeDefined();
  expect(response.body.character.episode.name).toEqual('Pilot');
});

it('Returns a 404 for a non existing character', async () => {
  const cookie: string[] = global.signin();
  const response = await request(app)
    .get('/api/characters/11111111')
    .set('Cookie', cookie)
    .send();
  expect(response.status).toEqual(404)
});
