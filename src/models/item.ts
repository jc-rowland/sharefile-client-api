
import {ShareFileResponse} from '../types/sharefileresponse'
import SharefileHTTP from '../http'
import UploadSpecification from './upload-spec'

class SharefileItem {
  #http                     : SharefileHTTP
  id                        : string;          // Item Unique ID
  Name                      : string;          //	Item Name
  FileName                  : string;          //	Item File Name. ShareFile allows Items to have different Display and File names: display names are shown during client navigation, while file names are used when the item is downloaded.
  Creator                   : any;            //	User that Created this Item
  Parent                    : any;            //	Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
  AccessControls            : any;           //  List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL
  Zone                      : any;            //	The Storage Zone that contains this Item.
  CreationDate              : Date;            //	Item Creation Date.
  ProgenyEditDate           : Date;            //	The last modified date of this item and all of its children, recursively. This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.
  ClientCreatedDate?        : Date;            //	Client device filesystem Created Date of this Item.
  ClientModifiedDate?       : Date;            //	Client device filesystem last Modified Date of this Item.
  ExpirationDate            : Date;            //	Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.
  Description               : string;          //	Item description
  DiskSpaceLimit            : Number;          //	Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.
  IsHidden                  : Boolean;         //	Defines whether the Item has a 'hidden' flag.
  BandwidthLimitInMB        : Number;          //	Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.
  Owner                     : any;            //	User Owner of this Item.
  Account                   : any;         //	ShareFile Account containing this item.
  FileSizeInKB              : Number;          //	Item size in Kilobytes. For containers, this field includes all children sizes, recursively.
  Path                      : string;          //	Contains a ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID
  CreatorFirstName          : string;          //	First name of the user that created this item
  CreatorLastName           : string;          //	Last name of the user that created this item
  ExpirationDays            : Number;          //	Amount of days until this item expireses (see ExpirationDate)
  FileSizeBytes             : Number;          //	Item size in bytes. For containers, this field will include all children sizes, recursively.
  PreviewStatus             : any;   //	Indicates whether a preview image is available for this Item. ShareFile.com always create previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types
  PreviewPlatformsSupported : any;           //  Indicates a list of PreviewPlatforms supported for this item.
  EditingPlatformsSupported : any;           //  Indicates a list of EditingPlatforms supported for this item.
  HasPendingDeletion        : Boolean;         //	Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed imediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.
  AssociatedFolderTemplateID: string;          //	Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
  IsTemplateOwned           : Boolean;         //	Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
  StreamID                  : string;          //	Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.
  CreatorNameShort          : string;          //	Short version of items creator's name. E.g., J. Doe.
  HasMultipleVersions       : Boolean;         //	Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.
  HasPendingAsyncOp         : Boolean;         //	Specifies whether or not an Item has a pending async operation.
  ItemOperations            : any;  //	Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.
  Metadata                  : any;           //  List of custom metadata object associated with this item
  Statuses                  : any;           //  List of external statuses associated with this Item
  Favorite                  : any;        //	Favorite item object associated with the item
  SemanticPath              : string;          //	Item Path using Folder names

  url                       : string
  /**
   * Creates an instance of SharefileItem.
   * @memberof SharefileItem
   */
  constructor(body: ShareFileResponse.Item, http:SharefileHTTP) {
      this.#http                      = http
      this.id                         = body.Id
      this.Name                       = body.Name
      this.FileName                   = body.FileName
      this.Creator                    = body.Creator
      this.Parent                     = body.Parent
      this.AccessControls             = body.AccessControls
      this.Zone                       = body.Zone
      this.CreationDate               = body.CreationDate
      this.ProgenyEditDate            = body.ProgenyEditDate
      this.ClientCreatedDate          = body.ClientCreatedDate
      this.ClientModifiedDate         = body.ClientModifiedDate
      this.ExpirationDate             = body.ExpirationDate
      this.Description                = body.Description
      this.DiskSpaceLimit             = body.DiskSpaceLimit
      this.IsHidden                   = body.IsHidden
      this.BandwidthLimitInMB         = body.BandwidthLimitInMB
      this.Owner                      = body.Owner
      this.Account                    = body.Account
      this.FileSizeInKB               = body.FileSizeInKB
      this.Path                       = body.Path
      this.CreatorFirstName           = body.CreatorFirstName
      this.CreatorLastName            = body.CreatorLastName
      this.ExpirationDays             = body.ExpirationDays
      this.FileSizeBytes              = body.FileSizeBytes
      this.PreviewStatus              = body.PreviewStatus
      this.PreviewPlatformsSupported  = body.PreviewPlatformsSupported
      this.EditingPlatformsSupported  = body.EditingPlatformsSupported
      this.HasPendingDeletion         = body.HasPendingDeletion
      this.AssociatedFolderTemplateID = body.AssociatedFolderTemplateID
      this.IsTemplateOwned            = body.IsTemplateOwned
      this.StreamID                   = body.StreamID
      this.CreatorNameShort           = body.CreatorNameShort
      this.HasMultipleVersions        = body.HasMultipleVersions
      this.HasPendingAsyncOp          = body.HasPendingAsyncOp
      this.ItemOperations             = body.ItemOperations
      this.Metadata                   = body.Metadata
      this.Statuses                   = body.Statuses
      this.Favorite                   = body.Favorite
      this.SemanticPath               = body.SemanticPath

      this.url = `Items(${this.id})/`
  }

//   /**
//    *
//    *
//    * @param {boolean} [redirect=false] Redirect to download link if set to true (default), or return a DownloadSpecification if set to false
//    * @param {boolean} [includeAllVersions=false] For folder downloads only, includes old versions of files in the folder in the zip when true, current versions only when false (default)
//    * @param {boolean} [includeDeleted=false] For FINRA or other archive enabled account only, Super User can set includeDelete=true to download archived item. The default value of includeDeleted is false
//    * @return {DownloadSpecification|string} the download link or DownloadSpecification for the this item.
//    * @memberof SharefileItem
//    */
//   async download(
//     redirect = false,
//     includeAllVersions = false,
//     includeDeleted = false
//   ) {
//     return axios
//       .get(
//         this.url +
//           `/Download?redirect=${redirect}&includeallversions=${includeAllVersions}&includeDeleted=${includeDeleted}`,
//         await this.getHttpConfig()
//       )
//       .then((res) => {
//         if (redirect) {
//           return res;
//         } else {
//           return new DownloadSpecification(res.data);
//         }
//       });
//   }

//   async parent(){
//     return axios
//       .get(
//         this.url + `/Items(${this.id})/Parent`,
//         await this.getHttpConfig()
//       )
//       .then((res) =>
//         res.data.value.map((item:ShareFileResponse.Item) => new SharefileItem(item, this.auth))
//       );
  
//   }

  /**
   * Handler for the Children navigation property of a given Item. A 302 redirection is returned if the folder is a SymbolicLink. The redirection will enumerate the children of the remote connector
   *
   * @return {SharefileItem[]} the list of children under the given object ID
   * @memberof SharefileItem
   */
  async children(includeDeleted:boolean = false) {
    return this.#http.get(this.url+`Children`,{includeDeleted})
      .then((items:ShareFileResponse.Items) => {
        return items.value.map((item:ShareFileResponse.Item) => new SharefileItem(item, this.#http))

      }
      );
  }

  get token(){
    return this.#http.access_token
  }

  set token(x){
    this.#http.access_token = x
  }
  

  /**
   * Gets first Child based on a given property.
   */
  async childBy(propName:keyof SharefileItem, propVal:any, includeDeleted = false) {
    return this.children(includeDeleted).then((list) => {
      return list.find((item) => item[propName] === propVal);
    });
  }

async upload(contents:string|Buffer,filename:string){
  const ops = {
    Method: "standard",
    Raw:true,
    FileName: filename
  }
  const url = this.url + `/Upload2`;

  const uploadSpec = await this.#http.post(url,ops).then((data)=>new UploadSpecification(data));

  return await uploadSpec.upload(contents).then(async ()=>this.childBy('FileName',filename));
}
}

export default  SharefileItem