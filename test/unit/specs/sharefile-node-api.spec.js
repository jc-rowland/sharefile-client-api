require("regenerator-runtime/runtime");
const credentials = require('../../config/config.js').default;
const paths = require('../../config/secrets/paths')
const {ShareFileAPI} = require('../../../src/sharefile-node-api.js');

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
  const SF = new ShareFileAPI(credentials.good)
  const res = await SF.authenticate(credentials.good)
  console.log(res)
  expect(res).toBeTruthy();
})

it('Gets home Folder', async ()=>{
  const SF = new ShareFileAPI(credentials.good);
  await SF.authenticate();
  const happyHomeFolder = await SF.items();
  expect(happyHomeFolder['odata.type']==='ShareFile.Api.Models.Folder').toBeTruthy()
})

it('Gets Home Folder - Children', async()=>{
  const SF = new ShareFileAPI(credentials.good)
  await SF.authenticate()
  const happyHomeFolder = await SF.items();
  await expect(happyHomeFolder.children()).resolves.toBeTruthy();
})

it('Gets Folder By Path', async()=>{
  const SF = new ShareFileAPI(credentials.good)
  await SF.authenticate()
  const happyHomeFolder = await SF.itemsByPath('/Shared Folders/Skin').then(res=>{
    console.log("RES",res)
  }).catch(err=>{
    console.log("ERR",err)
  });
})

it('Uploads File to Folder', async()=>{
  const SF = new ShareFileAPI(credentials.good)
  await SF.authenticate();
  const uploadFolderID = paths.uploadTestFolderID;

  const uploadFolder = await SF.items(uploadFolderID);
  const res = await uploadFolder.upload("Test!!!");

  console.log("RES",res)

})

it('Renames File', async()=>{
  const SF = new ShareFileAPI(credentials.good);

  const fileName = "test.txt";
  const newName = "renamed.txt";

  const testFilePath = "Personal Folders/TestUpload/"+fileName
  const file = await SF.itemsByPath(testFilePath);
  await file.rename(newName)
  expect(file.Name).toBe(newName)
  await file.rename(fileName)
  expect(file.Name).toBe(fileName)

})

it('Moves File', async()=>{
  const SF = new ShareFileAPI(credentials.good);

  const fromFolderPath = "Personal Folders/TestUpload/";
  const fromFolderID = await SF.itemsByPath(fromFolderPath).then(file=>file.Id);

  const toFolderPath = "Personal Folders/TestScans/";
  const toFolderID = await SF.itemsByPath(toFolderPath).then(file=>file.Id);

  const fileName = "test.txt";

  const testFilePath = "Personal Folders/TestUpload/"+fileName
  const file = await SF.itemsByPath(testFilePath);
  await file.move(toFolderID);
  expect(file.Parent.Id).toBe(toFolderID);
  await file.move(fromFolderID);
  expect(file.Parent.Id).toBe(fromFolderID);

})
