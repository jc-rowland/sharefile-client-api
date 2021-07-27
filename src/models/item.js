const DownloadSpecification = require('./download-spec.js')
const UploadSpecification = require('./upload-spec.js')
const axios = require("axios");
const FormData = require('form-data');

/**
 * Represents a ShareFile Item: an element that can exist inside a ShareFile Folder.
 * This include Files and Folders, as well as other classes that are listed inside
 * directory structures: Links, Notes and Symbolic Links.
 *
 * @class SharefileItem
 * @property {String}         Name                       -	Item Name
 * @property {String}         FileName                   -	Item File Name. ShareFile allows Items to have different Display and File names: display names are shown during client navigation, while file names are used when the item is downloaded.
 * @property {User}           Creator                    -	User that Created this Item
 * @property {Item}           Parent                     -	Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
 * @property {Array}          AccessControls             -  List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL
 * @property {Zone}           Zone                       -	The Storage Zone that contains this Item.
 * @property {DateTime}       CreationDate               -	Item Creation Date.
 * @property {DateTime}       ProgenyEditDate            -	The last modified date of this item and all of its children, recursively. This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.
 * @property {DateTime}       ClientCreatedDate          -	Client device filesystem Created Date of this Item.
 * @property {DateTime}       ClientModifiedDate         -	Client device filesystem last Modified Date of this Item.
 * @property {DateTime}       ExpirationDate             -	Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.
 * @property {String}         Description                -	Item description
 * @property {Int32}          DiskSpaceLimit             -	Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.
 * @property {Boolean}        IsHidden                   -	Defines whether the Item has a 'hidden' flag.
 * @property {Int32}          BandwidthLimitInMB         -	Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.
 * @property {User}           Owner                      -	User Owner of this Item.
 * @property {Account}        Account                    -	ShareFile Account containing this item.
 * @property {Int32}          FileSizeInKB               -	Item size in Kilobytes. For containers, this field includes all children sizes, recursively.
 * @property {String}         Path                       -	Contains a ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID
 * @property {String}         CreatorFirstName           -	First name of the user that created this item
 * @property {String}         CreatorLastName            -	Last name of the user that created this item
 * @property {Int32}          ExpirationDays             -	Amount of days until this item expireses (see ExpirationDate)
 * @property {Int64}          FileSizeBytes              -	Item size in bytes. For containers, this field will include all children sizes, recursively.
 * @property {PreviewStatus}  PreviewStatus              -	Indicates whether a preview image is available for this Item. ShareFile.com always create previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types
 * @property {Array}          PreviewPlatformsSupported  -  Indicates a list of PreviewPlatforms supported for this item.
 * @property {Array}          EditingPlatformsSupported  -  Indicates a list of EditingPlatforms supported for this item.
 * @property {Boolean}        HasPendingDeletion         -	Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed imediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.
 * @property {String}         AssociatedFolderTemplateID -	Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
 * @property {Boolean}        IsTemplateOwned            -	Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
 * @property {String}         StreamID                   -	Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.
 * @property {String}         CreatorNameShort           -	Short version of items creator's name. E.g., J. Doe.
 * @property {Boolean}        HasMultipleVersions        -	Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.
 * @property {Boolean}        HasPendingAsyncOp          -	Specifies whether or not an Item has a pending async operation.
 * @property {ItemOperations} ItemOperations             -	Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.
 * @property {Array}          Metadata                   -  List of custom metadata object associated with this item
 * @property {Array}          Statuses                   -  List of external statuses associated with this Item
 * @property {Favorite}       Favorite                   -	Favorite item object associated with the item
 * @property {String}         SemanticPath               -	Item Path using Folder names
 */
 class SharefileItem {
  /**
   * Creates an instance of SharefileItem.
   * @param {*} [body={}] JSON body of item as received from Sharefile
   * @param {*} httpConfig
   * @memberof SharefileItem
   */
  constructor(body = {}, httpConfig) {
    /** @private */
    this.httpConfig = httpConfig;

    Object.assign(this, body);
  }

  /**
   *
   *
   * @param {boolean} [redirect=false] Redirect to download link if set to true (default), or return a DownloadSpecification if set to false
   * @param {boolean} [includeAllVersions=false] For folder downloads only, includes old versions of files in the folder in the zip when true, current versions only when false (default)
   * @param {boolean} [includeDeleted=false] For FINRA or other archive enabled account only, Super User can set includeDelete=true to download archived item. The default value of includeDeleted is false
   * @return {DownloadSpecification|string} the download link or DownloadSpecification for this item.
   * @memberof SharefileItem
   */
  download(
    redirect = false,
    includeAllVersions = false,
    includeDeleted = false
  ) {
    return axios
      .get(
        this.url +
          `/Download?redirect=${redirect}&includeallversions=${includeAllVersions}&includeDeleted=${includeDeleted}`,
        this.httpConfig
      )
      .then((res) => {
        if (redirect) {
          return res;
        } else {
          return new DownloadSpecification(res.data);
        }
      });
  }

  parent(){
    return axios
      .get(
        this.url + `/Items(${this.id})/Parent`,
        this.httpConfig
      )
      // .then((res) =>
      //   res.data.value.map((item) => new SharefileItem(item, this.httpConfig))
      // );
  
  }

  /**
   * Handler for the Children navigation property of a given Item. A 302 redirection is returned if the folder is a SymbolicLink. The redirection will enumerate the children of the remote connector
   *
   * @param {boolean} [includeDeleted=false] Specifies whether or not the list of items returned should include deleted children
   * @return {SharefileItem[]} the list of children under the given object ID
   * @memberof SharefileItem
   */
  children(includeDeleted = false) {
    return axios
      .get(
        this.url + `/Children?includeDeleted=${includeDeleted}`,
        this.httpConfig
      )
      .then((res) =>
        res.data.value.map((item) => new SharefileItem(item, this.httpConfig))
      );
  }

  /**
   * Gets first Child based on a given property.
   *
   * @param     {string}  [propName=""] Prop that will be searched on
   * @param     {string}  [propVal=""] Search string
   * @param     {boolean} [includeDeleted=false] Specifies whether or not the list of items returned should include deleted children
   * @return    {SharefileItem} The Child object
   * @memberof  SharefileItem
   */
  async childBy(propName = "", propVal = "", includeDeleted = false) {
    const item = await this.children(includeDeleted).then((list) => {
      return list.find((item) => item[propName] === propVal);
    });
    return new SharefileItem(item, this.httpConfig);
  }

  /**
   *
   *
   * @param     {string}  name Item Name
   * @param     {boolean} includeDeleted Specifies whether or not the list of items returned should include deleted children
   * @return    {SharefileItem} The Child object
   * @memberof  SharefileItem
   */
  async childByName(name, includeDeleted) {
    const item = await this.childBy("Name", name, includeDeleted);
    return new SharefileItem(item, this.httpConfig);
  }

  /**
   *
   *
   * @param {String} id Item identifier
   * @param {Boolean} includeDeleted Specifies whether or not the list of items returned should include deleted children
   * @return {SharefileItem} The Child object
   * @memberof SharefileItem
   */
  async childById(id, includeDeleted) {
    const item = await this.childBy("Id", id, includeDeleted);
    return new SharefileItem(item, this.httpConfig);
  }

/**
 *
 *
 * @param {String|Buffer} contents
 * @param {String} filename
 * @return {String} 
 * @memberof SharefileItem
 */
async upload(contents,filename){
    const ops = {
      Method: "standard",
      Raw:true,
      FileName: filename
    }
    const url = this.url + `/Upload2`;

    const uploadSpec = await axios.post(url,ops,this.httpConfig).then(({data})=>new UploadSpecification(data));

    return await uploadSpec.upload(contents);
  }
}

module.exports = SharefileItem