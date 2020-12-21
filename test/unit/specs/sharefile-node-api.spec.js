import "core-js/stable";
import "regenerator-runtime/runtime";
import ShareFileAPI from '../../../src/sharefile-node-api.js'
import credentials from '../../config/config.js'

it('Happy path', () => {
  expect(ShareFileAPI).toBeTruthy()
})

it('Creates empty API object', () => {
  const emptyApi = new ShareFileAPI()
  expect(emptyApi).toBeTruthy()
})

it('Authenticates correctly', async () => {
  const SF = new ShareFileAPI()
  await expect(SF.authenticate(credentials.good)).resolves.toBeTruthy();
})

it('Fails authentication - bad username/password', async () => {
  const SF = new ShareFileAPI()
  await expect(SF.authenticate(credentials.badUsername)).rejects.toBe("invalid username or password");
  await expect(SF.authenticate(credentials.badPassword)).rejects.toBe("invalid username or password");
})

it('Fails authentication - bad client id/secret', async () => {
  const SF = new ShareFileAPI()
  await expect(SF.authenticate(credentials.badClientId)).rejects.toBe("client_id or client_secret is invalid");
  await expect(SF.authenticate(credentials.badSecret)).rejects.toBe("client_id or client_secret is invalid");

})

it('Fails authentication - bad client id/secret', async () => {
  const SF = new ShareFileAPI()
  await expect(SF.authenticate(credentials.badClientId)).rejects.toBe("client_id or client_secret is invalid");
  await expect(SF.authenticate(credentials.badSecret)).rejects.toBe("client_id or client_secret is invalid");
})

it('Throws on no creds', async () => {
  const SF = new ShareFileAPI()
  await expect(SF.authenticate()).rejects.toBeTruthy();
})