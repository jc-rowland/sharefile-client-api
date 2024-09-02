import ShareFileAPI from "../../../src/sharefile-client-api";
import credentials from "../../config/config";
import { Readable, Writable } from 'stream';
import paths from "../../config/secrets/paths";
import { expect } from "chai";
import DownloadSpecification from "../../../src/models/download-spec";
import SharefileItem from "../../../src/models/item";
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
    expect(response.message).to.be.equal("Authentication failed: invalid username or password");
  });

  it("Fails authentication - bad client id/secret", async () => {
    const SF = new ShareFileAPI(credentials.badClientId);
    const err = await SF.connect().catch((err) => err);
    expect(err.message).to.equal(
      "Authentication failed: client_id or client_secret is invalid"
    );
  });

  it("Authenticates correctly", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const res = await SF.connect();
    expect(res).to.exist;
  });

  it("Gets home Folder", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.getItem('home');
    expect(happyHomeFolder.Name).to.equal("Personal Folders");
  });

  it("Gets Home Folder - Children", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyChildren = await SF.getItem('home').then(res=>res.children());
    
    await expect(await happyChildren[0].children()).to.exist;
  });

  
  it("searches for items and returns correct results", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const searchQuery = "test";
    const searchResults = await SF.searchItems(searchQuery).then(res=>res.results);

    expect(searchResults).to.be.an('array');


    // Test with additional search parameters
    const filteredSearch = await SF.searchItems(searchQuery).then(res=>res.results);

    expect(filteredSearch).to.be.an('array');
    expect(filteredSearch.length).to.be.at.most(50);
  });

  it("Gets Folder By ID", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.getItem(paths.uploadTestFolderID);
    expect(happyHomeFolder.FileName).to.equal('Test Folder');
  });

  it("Gets Folder By Path", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.getItem(paths.uploadTestFolderPath);
    expect(happyHomeFolder.FileName).to.equal('Test Folder');
  });

  it("Gets Parent", async () => {
    const SF = new ShareFileAPI(credentials.good);
    const happyHomeFolder = await SF.getItem(paths.uploadTestFolderPath);
    expect(happyHomeFolder.FileName).to.equal('Test Folder');
    const parentFolder = await happyHomeFolder.getParent();
    expect(parentFolder.FileName).to.equal('Personal Folders');
  });

  describe("Upload/Update/Move/Delete",async ()=>{
    const SF = new ShareFileAPI(credentials.good);
    const filename = 'test.txt'
    const fileContents = "Hello World!"
    const fileDescription = "A Test File"
    const testFolderPath = "Personal Folders/Test Folder/";
    const testFolderPath2 = "Personal Folders/Test Folder/Archive";

    const testFilePath = "Personal Folders/Test Folder/"+filename

    it('Uploads File to Folder', async()=>{

      const uploadFolder = await SF.getItem(testFolderPath);
      const uploadedFile = await uploadFolder.upload(fileContents,filename);
      expect(uploadedFile?.FileName).to.be.eq(filename)
  
    })
  
    it('Updates File Description', async()=>{

  
      
      const file = await SF.getItem(testFilePath);
      const res = await file.updateItem({Description:fileDescription})
      expect(res.Description===fileDescription).to.eq(true)
  
    })

    it('Moves File', async()=>{
      

      const testFolder    = await SF.getItem(testFolderPath)
      let testFolder2
      try {
        testFolder2   = await SF.getItem(testFolderPath2)
      } catch (error) {
        testFolder2 = await testFolder.createFolder('Archive','',true)
      }
      
      const testFile  = await testFolder2.upload(fileContents,filename)
      expect(testFile?.Parent.Id===testFolder2.id)
  
      await testFile?.move(testFolderPath)
      expect(testFile?.Parent.Id===testFolder.id)
    })


  it('Downloads file using DownloadSpecification and tests buffer and stream methods', async () => {
    // Get DownloadSpecification
    const testFile = await SF.getItem(testFilePath);
    const downloadSpec = await testFile.download(false);
    expect(downloadSpec).to.be.instanceOf(DownloadSpecification);

    // Test buffer method
    const buffer = await downloadSpec.waitAndDownload().then(res=>res.toBuffer());

    expect(buffer).to.be.instanceOf(Buffer);
    expect(buffer.toString()).to.equal(fileContents);

    // Test stream method
    const stream = await downloadSpec.download().toStream();
    expect(stream).to.be.instanceOf(ReadableStream);
    
  });

    it('Deletes File', async()=>{
      
      const testFile = await SF.getItem(testFilePath)
      const isDeleted = await testFile.delete(false)
      expect(isDeleted).to.eq(true)
      
    })
  
  })


});
