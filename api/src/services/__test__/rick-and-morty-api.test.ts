import { fetchCharacters } from '../rick-and-morty-api';

describe('Test rick and morty graphql client', () => {
  it('Fetch characters from Rick and Morty GraphQL Api', async () => {
    const response = await fetchCharacters(1);
    expect(response.info).toBeDefined();
    expect(response.info.next === "2");
    expect(response.results.length).toEqual(20);
  });
});
