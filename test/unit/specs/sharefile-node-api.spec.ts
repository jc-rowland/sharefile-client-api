import ShareFileAPI from '../../../src/sharefile-node-api';
import credentials from '../../config/config';
// import paths from '../../config/secrets/paths';
// import { expect } from 'chai';
import 'mocha';


describe('ShareFileAPI', () => {

    it('Happy path', () => {
        const happySF = new ShareFileAPI(credentials.good);
        // expect(happySF).toBeTruthy()
      })
  
  });



// it('Creates empty API object', () => {
//   const emptyApi = new ShareFileAPI()
//   expect(emptyApi).toBeTruthy()
// })

// it('Fails authentication - bad username/password', async () => {
//   const SF = new ShareFileAPI()
//   await expect(SF.authenticate(credentials.badUsername)).rejects.toBe("invalid username or password");
//   await expect(SF.authenticate(credentials.badPassword)).rejects.toBe("invalid username or password");
// })

// it('Fails authentication - bad client id/secret', async () => {
//   const SF = new ShareFileAPI()
//   await expect(SF.authenticate(credentials.badClientId)).rejects.toBe("client_id or client_secret is invalid");
//   await expect(SF.authenticate(credentials.badSecret)).rejects.toBe("client_id or client_secret is invalid");
// })

// it('Throws on no creds', async () => {
//   const SF = new ShareFileAPI();
//   await expect(SF.authenticate()).rejects.toBeTruthy();
// })

// it('Authenticates correctly', async () => {
//   const SF = new ShareFileAPI()
//   const res = await SF.authenticate(credentials.good)
//   expect(res.access_token).toBeTruthy();
//   expect(SF.httpConfig).toBeTruthy();

// })

// it('Gets home Folder', async ()=>{
//   const SF = new ShareFileAPI();
//   await SF.authenticate(credentials.good);
//   const happyHomeFolder = await SF.items();
//   expect(happyHomeFolder['odata.type']==='ShareFile.Api.Models.Folder').toBeTruthy()
// })

// it('Gets Home Folder - Children', async()=>{
//   const SF = new ShareFileAPI()
//   await SF.authenticate(credentials.good)
//   const happyHomeFolder = await SF.items();
//   await expect(happyHomeFolder.children()).resolves.toBeTruthy();
// })

// it('Gets Folder By Path', async()=>{
//   const SF = new ShareFileAPI(credentials.good)
//   await SF.authenticate()
//   const happyHomeFolder = await SF.itemsByPath('/Shared Folders/Scans').then(res=>{
//     console.log("RES",res)
//   }).catch(err=>{
//     console.log("ERR",err)
//   });
// })

// it('Uploads File to Folder', async()=>{
//   const SF = new ShareFileAPI(credentials.good)
//   await SF.authenticate();
//   const uploadFolderID = paths.uploadTestFolderID;

//   const uploadFolder = await SF.items(uploadFolderID);
//   const res = await uploadFolder.upload("Test!!!");

//   console.log("RES",res)

// })

