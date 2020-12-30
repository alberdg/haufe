import { Character, CharacterDoc, CharacterAttrs } from '../characters';
const TEST_USER_ID: string = '5fecf78ef30b479b7beb2d14';
const CHARACTER_ATTRS: CharacterAttrs = { characterId: '1', userId: TEST_USER_ID };
it('Adds a character to favourites', async () => {
  const character: CharacterDoc = await Character.addToFavorite(CHARACTER_ATTRS);
  const response: any = await Character.findById(character.id);
  expect(response).toBeDefined();
  expect(response._id.toString()).toEqual(character.id?.toString());
  expect(response.userId.toString()).toEqual(TEST_USER_ID);
})

it('Removes a character from favourites', async () => {
  const character: CharacterDoc = await Character.addToFavorite(CHARACTER_ATTRS);
  await Character.removeFromFavorite(CHARACTER_ATTRS)
  const response: number = await Character.findById(character.id).countDocuments();
  expect(response).toEqual(0);
})
