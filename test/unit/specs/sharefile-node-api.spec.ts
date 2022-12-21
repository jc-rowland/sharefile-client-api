import ShareFileAPI from "../../../src/sharefile-node-api";
import credentials from "../../config/config";
import paths from "../../config/secrets/paths";
import { expect } from "chai";
import "mocha";

function sleep(milliseconds: Number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

describe("ShareFileAPI", () => {
  it("Happy path", () => {
    const happySF = new ShareFileAPI(credentials.good);
    expect(happySF).to.exist
  });

  it("Fails authentication - bad username/password", async () => {
    const SF = new ShareFileAPI(credentials.badUsername);
    const response = await SF.connect().catch((err) => err);
    expect(response).to.be.an.instanceof(Error);
    expect(response.message).to.be.equal("Request failed with status code 400");
  });

  it("Fails authentication - bad client id/secret", async () => {
    const SF = new ShareFileAPI(credentials.badClientId);
    const err = await SF.connect().catch((err) => err);
    expect(err.response.data.error_description).to.equal(
      "client_id or client_secret is invalid"
    );
  });

  it("Authenticates correctly", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const res = await SF.connect();
    expect(res).to.exist;
  });

  it("Gets home Folder", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.items();
    expect(happyHomeFolder.Name).to.equal("Personal Folders");
  });

  it("Gets Home Folder - Children", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyChildren = await SF.items().then(res=>res.children());
    
    await expect(await happyChildren[0].children()).to.exist;
  });

  it("Gets Folder By ID", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.items(paths.uploadTestFolderID);
    expect(happyHomeFolder.FileName).to.equal("Test Folder");
  });

  it("Gets Folder By Path", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.itemsByPath(paths.uploadTestFolderPath);
    expect(happyHomeFolder.FileName).to.equal("Test Folder");
  });

  // it("Token refreshes after it expires", async () => {
  //   const SF = new ShareFileAPI(credentials.good);
  //   const res = await SF.authenticate();

  //   const origToken = await SF.getHttpConfig().then(
  //     (res) => res.headers.authorization
  //   );
  //   expect(SF.isTokenExpired).to.equal(false);

  //   const origTokenTwo = await SF.getHttpConfig().then(
  //     (res) => res.headers.authorization
  //   );
  //   expect(origToken === origTokenTwo).to.equal(true);

  //   SF.access_token_expires = new Date();
  //   await sleep(100);
  //   expect(SF.isTokenExpired).to.equal(true);

  //   const newToken = await SF.getHttpConfig().then(
  //     (res) => res.headers.authorization
  //   );
  //   expect(origToken === newToken).to.equal(false);
  // });

  it("Shares token across items", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder1 = await SF.items(paths.uploadTestFolderID);
    const happyHomeFolder2 = await SF.items(paths.uploadTestFolderID);
    expect(happyHomeFolder1.token).to.eq(happyHomeFolder2.token)
  });

  it.only('Uploads File to Folder', async()=>{
    const SF = new ShareFileAPI(credentials.good)
    const uploadFolderID = paths.uploadTestFolderID;

    const uploadFolder = await SF.items(uploadFolderID);
    const res = await uploadFolder.upload("Test!!!",'test.txt');

    console.log("RES",res)

  })

  // it('Renames File', async()=>{
  //   const SF = new ShareFileAPI(credentials.good);

  //   const fileName = "test.txt";
  //   const newName = "renamed.txt";

  //   const testFilePath = "Personal Folders/TestUpload/"+fileName
  //   const file = await SF.itemsByPath(testFilePath);
  //   await file.rename(newName)
  //   expect(file.Name).to.equal(newName)
  //   await file.rename(fileName)
  //   expect(file.Name).to.equal(fileName)

  // })

  // it('Moves File', async()=>{
  //   const SF = new ShareFileAPI(credentials.good);

  //   const fromFolderPath = "Personal Folders/TestUpload/";
  //   const fromFolderID = await SF.itemsByPath(fromFolderPath).then(file=>file.id);

  //   const toFolderPath = "Personal Folders/TestScans/";
  //   const toFolderID = await SF.itemsByPath(toFolderPath).then(file=>file.id);

  //   const fileName = "test.txt";

  //   const testFilePath = "Personal Folders/TestUpload/"+fileName
  //   const file = await SF.itemsByPath(testFilePath);
  //   await file.move(toFolderID);
  //   expect(file.Parent.Id).to.equal(toFolderID);
  //   await file.move(fromFolderID);
  //   expect(file.Parent.Id).to.equal(fromFolderID);

  // })
});
