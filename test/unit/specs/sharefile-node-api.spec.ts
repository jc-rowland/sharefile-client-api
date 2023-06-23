import ShareFileAPI from "../../../src/sharefile-node-api";
import credentials from "../../config/config";
import {paths} from "../../config/secrets/paths";
import { expect } from "chai";
import "mocha";

function sleep(milliseconds: number) {
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
    expect(happyHomeFolder.FileName).to.equal("API Test");
  });

  it("Gets Folder By Path", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.itemsByPath(paths.uploadTestFolderPath);
    expect(happyHomeFolder.FileName).to.equal("API Test");
  });

  it("Gets Parent", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.itemsByPath(paths.uploadTestFolderPath);
    expect(happyHomeFolder.FileName).to.equal("API Test");
    const parentFolder = await happyHomeFolder.getParent();
    expect(parentFolder.FileName).to.equal('Personal Folders');
  });

  it("Shares token across items", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder1 = await SF.items(paths.uploadTestFolderID);
    const happyHomeFolder2 = await SF.items(paths.uploadTestFolderID);
    expect(happyHomeFolder1.token).to.eq(happyHomeFolder2.token)
  });

  it('Uploads File to Folder', async()=>{
    const SF = new ShareFileAPI(credentials.good)
    const uploadFolderID = paths.uploadTestFolderID;
    const uploadFilename = 'test.txt'

    const uploadFolder = await SF.items(uploadFolderID);
    const uploadedFile = await uploadFolder.upload("Test!!!",uploadFilename);

    expect(uploadedFile?.FileName).to.be.eq(uploadFilename)

  })

  it('Updates File Description', async()=>{
    const SF = new ShareFileAPI(credentials.good);

    const fileName = "test.txt";

    const testFilePath = "Personal Folders/TestUpload/"+fileName
    const file = await SF.itemsByPath(testFilePath);
    const res = await file.updateItem({Description:'Hello234234234'})
    expect(res.Description==='Hello234234234').to.eq(true)

  })

  it('Moves File', async()=>{
    const SF = new ShareFileAPI(credentials.good);

    const fromFolderPath = "Personal Folders/API Test/";
    const toFolderPath = "Personal Folders/API Test/Archive";

    const fromFolderID = await SF.itemsByPath(fromFolderPath)
    const uploadedFile = await fromFolderID.upload("Test!!!",'move_test.txt');
    expect(uploadedFile?.Parent.Id===fromFolderID.id)

    const movedFile  = await uploadedFile?.move(toFolderPath)
    const toFolderID = await SF.itemsByPath(toFolderPath).then(file=>file.id);
    expect(movedFile?.Parent.Id===toFolderID)
  })
});
