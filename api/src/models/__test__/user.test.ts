import { User, UserDoc } from '../user';

it('Creates a user in the database', async () => {
  const userDoc: UserDoc = User.build({ name: 'Test', email: 'test@haufe.com', password: 'hauf3Str0ngPa$$' });
  const user: UserDoc = await userDoc.save();
  const response: any = await User.findById(user.id);
  console.log(user.id);
  expect(response).not.toBeNull();
  expect(response._id.toString()).toEqual(user.id?.toString());
  expect(response.name).toEqual(user.name);
  expect(response.email).toEqual(user.email);
  expect(response.password).toEqual(user.password);
})
