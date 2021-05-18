import "core-js/stable";
import "regenerator-runtime/runtime";
import ShareFileAPI from '../../../src/sharefile-node-api.js'
import credentials from '../../config/config.js'

it('Happy path', () => {
  const happySF = new ShareFileAPI();
  expect(happySF).toBeTruthy()
})

it('Creates empty API object', () => {
  const emptyApi = new ShareFileAPI()
  expect(emptyApi).toBeTruthy()
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

it('Throws on no creds', async () => {
  const SF = new ShareFileAPI();
  await expect(SF.authenticate()).rejects.toBeTruthy();
})

it('Authenticates correctly', async () => {
  const SF = new ShareFileAPI()
  const res = await SF.authenticate(credentials.good)
  expect(res.access_token).toBeTruthy();
  expect(SF.httpConfig).toBeTruthy();

})

it('Gets home Folder', async ()=>{
  const SF = new ShareFileAPI();
  await SF.authenticate(credentials.good);
  const happyHomeFolder = await SF.items();
  expect(happyHomeFolder['odata.type']==='ShareFile.Api.Models.Folder').toBeTruthy()
})

it('Gets Home Folder - Children', async()=>{
  const SF = new ShareFileAPI()
  await SF.authenticate(credentials.good)
  const happyHomeFolder = await SF.items();
  await expect(happyHomeFolder.children()).resolves.toBeTruthy();
})