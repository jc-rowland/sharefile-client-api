# ShareFileAPI

This is a TypeScript class that provides methods to interact with the ShareFile API.

## Usage

```javascript
// Import the necessary modules
import ShareFileAPI from '@jc-rowland/sharefile-node-api'
// Create an API instance
const shareFileAPI = new ShareFileAPI({
    subdomain   : 'subdomain',
    username    : 'username',
    password    : 'password',
    clientId    : 'clientId',
    clientSecret: 'clientSecret'
  });
// Authenticate
shareFileAPI.connect()
  .then(() => {
    // Authentication successful, ready to use the API
  });
```

## Sharefile API Methods

### items(id?: string)

This method retrieves a single ShareFile item by its ID.
The ID can also be one of the following special values:

* **home**: Returns the home folder.
* **favorites**: Returns the parent favorite item.
* **allshared**: Returns the parent Shared Folders item.
* **connectors**: Returns the parent Connectors item.
* **box**: Returns the FileBox folder.
* **top**: Returns the Top item.

```javascript
shareFileAPI.items('abcd-abcd-abcd1234abcd-ab12-cdef')
  .then((item: SharefileItem) => {
    // Process the item
  });

shareFileAPI.items('favorites')
  .then((item: SharefileItem) => {
    // Process the item
  });
```

### itemsByPath(path: string)

This method retrieves a ShareFile item by its path. The path should be in the format /foldername/foldername/filename.

```javascript
shareFileAPI.itemsByPath('/Shared Folders/Some Other Folder/somefile.ext')
  .then((item: SharefileItem) => {
    // Process the item
  });
  ```

## SharefileItem methods

| **Method**                                             | **Parameters**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Description**                                                                     |
|--------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| download(redirect, includeAllVersions, includeDeleted) | * **redirect** (optional): Specifies whether to redirect to the download link if set to true (default), or return a DownloadSpecification if set to false. <br> * **includeAllVersions** (optional): For folder downloads only, includes old versions of files in the folder in the zip when true, and current versions only when false (default). <br> * **includeDeleted** (optional): For archive-enabled accounts, the super user can set includeDeleted to true to download archived items. The default value is false. | Retrieves the download link or download specification for the item.                 |
| updateItem(ops)                                        | * **ops**: An object containing the properties to update. The supported properties are Name, FileName, Description, ExpirationDate, and Parent.Id.                                                                                                                                                                                                                                                                                                                                                                           | Updates the item object with the provided properties.                               |
| rename(newValue)                                       | * **newValue**: The new name for the item.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Renames the item with the provided new value.                                       |
| move(parentIdorPath)                                   | * **parentIdorPath**: The ID or path of the new parent for the item. If a path is provided, an additional call is made to determine the ID of the parent before performing the move.                                                                                                                                                                                                                                                                                                                                         | Moves the item to a new parent.                                                     |
| getParent()                                            | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Retrieves the parent container of the item.                                         |
| children(includeDeleted)                               | **includeDeleted** (optional): Specifies whether to include deleted items when retrieving the children. The default value is false.                                                                                                                                                                                                                                                                                                                                                                                        | Retrieves the list of children items under the given item.                          |
| upload(contents, filename)                             | * **contents**: The contents of the file to upload. It can be a string or a Buffer. <br> * **filename**: The filename for the uploaded file.                                                                                                                                                                                                                                                                                                                                                                                 | Uploads the provided contents as a file with the specified filename under the item. |
