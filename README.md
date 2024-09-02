# ShareFileAPI

A TypeScript library for interacting with the ShareFile API. This package provides a simple and intuitive interface to perform operations on ShareFile items such as files and folders.

## Installation

```bash
npm install @jc-rowland/sharefile-client-api
```

## Basic Usage

```typescript
import ShareFileAPI from '@jc-rowland/sharefile-client-api';

// Create an API instance
const shareFileAPI = new ShareFileAPI({
  subdomain: 'your-subdomain',
  username: 'your-username',
  password: 'your-password',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret'
});

// Authenticate
await shareFileAPI.connect();

// Now you're ready to use the API
```

## Key Features

- Easy authentication
- Retrieve items by ID or path
- Download files and folders
- Update item properties
- Move and rename items
- Upload files
- List folder contents
- Search for items
- Create and manage folders
- Handle file versions

## Common Use Cases

### 1. Navigating the File Structure

#### Get Home Folder
```typescript
const homeFolder = await shareFileAPI.getItem('home');
console.log(`Home folder name: ${homeFolder.Name}`);
```

#### List Folder Contents
```typescript
const folderContents = await homeFolder.children();
folderContents.forEach(item => {
  console.log(`${item.Name} (${item.id})`);
});
```

#### Navigate to a Specific Folder
```typescript
const documentsFolder = await shareFileAPI.getItem('/Personal Folders/Documents');
const files = await documentsFolder.children();
```

### 2. File Operations

#### Upload a File
```typescript
const folder = await shareFileAPI.getItem('folder-id');
const fileContent = 'Hello, ShareFile!';
const newFile = await folder.upload(fileContent, 'hello.txt');
console.log(`File uploaded: ${newFile.Name}`);
```

#### Download a File
```typescript
const file = await shareFileAPI.getItem('file-id');
const downloadLink = await file.download(true);
console.log(`Download link: ${downloadLink}`);

// Or download as a buffer
const downloadSpec = await file.download(false);
const buffer = await downloadSpec.waitAndDownload().then(chain => chain.toBuffer());
```

#### Update File Properties
```typescript
const file = await shareFileAPI.getItem('file-id');
await file.updateItem({
  Name: 'Updated File Name.txt',
  Description: 'This file has been updated.'
});
```

#### Move a File
```typescript
const file = await shareFileAPI.getItem('file-id');
const newParentFolder = await shareFileAPI.getItem('new-folder-id');
await file.move(newParentFolder.id);
```

#### Delete a File
```typescript
const file = await shareFileAPI.getItem('file-id');
await file.delete();
```

### 3. Folder Management

#### Create a New Folder
```typescript
const parentFolder = await shareFileAPI.getItem('parent-folder-id');
const newFolder = await parentFolder.createFolder('New Folder', 'Description of the new folder');
```

#### Rename a Folder
```typescript
const folder = await shareFileAPI.getItem('folder-id');
await folder.rename('New Folder Name');
```

### 4. Searching and Filtering

#### Search for Items
```typescript
const searchResultObj = await shareFileAPI.searchItems('budget report');
searchResultObj.results.forEach(item => {
  console.log(`Found: ${item.Name} (${item.id})`);
});
```

#### Filter Folder Contents
```typescript
const folder = await shareFileAPI.getItem('folder-id');
const pdfFiles = await folder.children({
  $filter: "endswith(Name, '.pdf') eq true"
});
```

### 5. Sharing and Collaboration

#### Get Share Link
```typescript
const file = await shareFileAPI.getItem('file-id');
const shareLink = await file.createShareLink({ 
  ExpirationDate: '2023-12-31',
  RequireLogin: false
});
console.log(`Share link: ${shareLink.Uri}`);
```

### 6. Version Control

#### Get File Versions
```typescript
const file = await shareFileAPI.getItem('file-id');
const versions = await file.getStream();
versions.forEach(version => {
  console.log(`Version: ${version.CreationDate}`);
});
```

### 7. Bulk Operations

#### Upload Multiple Files
```typescript
const folder = await shareFileAPI.getItem('folder-id');
const filesToUpload = [
  { name: 'file1.txt', content: 'Content 1' },
  { name: 'file2.txt', content: 'Content 2' }
];

for (const file of filesToUpload) {
  await folder.upload(file.content, file.name);
}
```

#### Download Multiple Files
```typescript
const folder = await shareFileAPI.getItem('folder-id');
const files = await folder.children();

for (const file of files) {
  const downloadSpec = await file.download(false);
  const buffer = await downloadSpec.waitAndDownload().then(chain => chain.toBuffer());
  // Process or save the buffer
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GPL-3.0 License.