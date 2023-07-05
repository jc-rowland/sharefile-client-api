
import {ShareFileResponse} from '../types/sharefileresponse'
import { ShareFileAPIModels } from '../types/sharefile.api.models'
import SharefileHTTP from '../http'
import UploadSpecification from './upload-spec'
import DownloadSpecification from './download-spec'
import { SharefileNodeAPI } from '../types/sharefile-node-api'
import idOrPath from '../utils/id-or-path'
import ShareFileAPI from '../sharefile-node-api'

class SharefileItem {
  #http: SharefileHTTP;
  #api: ShareFileAPI;
  
  /**
   * Item Unique ID.
   * @type {string}
   */
  id: string;

  /**
   * Item Name.
   * @type {string}
   */
  Name: string;

  Hash: string;

  /**
   * Item File Name. ShareFile allows Items to have different Display and File names:
   * display names are shown during client navigation, while file names are used when the item is downloaded.
   * @type {string}
   */
  FileName: string;

  /**
   * User that Created this Item.
   */
  Creator: ShareFileAPIModels.User|undefined;

  /**
   * Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
   */
  Parent: {Id:string};

  /**
   * List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL.
   */
  AccessControls: ShareFileAPIModels.AccessControl[] | undefined;

  /**
   * The Storage Zone that contains this Item.
   */
  Zone: ShareFileAPIModels.Zone | undefined;

  /**
   * Item Creation Date.
   */
  CreationDate: Date;

  /**
   * The last modified date of this item and all of its children, recursively.
   * This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.
   */
  ProgenyEditDate: Date;

  /**
   * Client device filesystem Created Date of this Item.
   */
  ClientCreatedDate?: Date;

  /**
   * Client device filesystem last Modified Date of this Item.
   */
  ClientModifiedDate?: Date;

  /**
   * Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.
   */
  ExpirationDate: Date;

  /**
   * Item description.
   */
  Description: string;

  /**
   * Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.
   */
  DiskSpaceLimit: number;

  /**
   * Defines whether the Item has a 'hidden' flag.
   */
  IsHidden: boolean;

  /**
   * Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.
   */
  BandwidthLimitInMB: number;

  /**
   * User Owner of this Item.
   */
  Owner?: ShareFileAPIModels.User;

  /**
   * ShareFile Account containing this item.
   */
  Account?: ShareFileAPIModels.Account;

  /**
   * Item size in Kilobytes. For containers, this field includes all children sizes, recursively.
   */
  FileSizeInKB: number;

  /**
   * Contains an ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID.
   */
  Path: string;

  /**
   * First name of the user that created this item.
   */
  CreatorFirstName: string;

  /**
   * Last name of the user that created this item.
   */
  CreatorLastName: string;

  /**
   * Amount of days until this item expires (see ExpirationDate).
   */
  ExpirationDays: number;

  /**
   * Item size in bytes. For containers, this field will include all children sizes, recursively.
   */
  FileSizeBytes: number;

  /**
   * Indicates whether a preview image is available for this Item. ShareFile.com always creates previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types.
   */
  PreviewStatus?: any;

  /**
   * Indicates a list of PreviewPlatforms supported for this item.
   */
  PreviewPlatformsSupported?: any;

  /**
   * Indicates a list of EditingPlatforms supported for this item.
   */
  EditingPlatformsSupported: any;

  /**
   * Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed immediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.
   */
  HasPendingDeletion: boolean;

  /**
   * Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
   */
  AssociatedFolderTemplateID: string;

  /**
   * Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
   */
  IsTemplateOwned: boolean;

  /**
   * Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.
   */
  StreamID: string;

  /**
   * Short version of the item's creator's name. E.g., J. Doe.
   */
  CreatorNameShort: string;

  /**
   * Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.
   */
  HasMultipleVersions: boolean;

  /**
   * Specifies whether or not an Item has a pending async operation.
   */
  HasPendingAsyncOp: boolean;

  /**
   * Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.
   */
  ItemOperations?: any;

  /**
   * List of custom metadata objects associated with this item.
   */
  Metadata?: any;

  /**
   * List of external statuses associated with this Item.
   */
  Statuses?: any;

  /**
   * Favorite item object associated with the item.
   */
  Favorite?: any;

  /**
   * Item Path using Folder names.
   */
  SemanticPath?: string;

  url: string;

  /**
   * Creates an instance of SharefileItem.
   * @param {ShareFileAPIModels.Item} body - The response body from ShareFile API representing an Item.
   * @param {SharefileHTTP} http - SharefileHTTP instance used for making HTTP requests.
   */
  constructor(body: ShareFileAPIModels.Item, http:SharefileHTTP, api:ShareFileAPI) {
      this.#http                      = http
      this.#api                       = api
      this.id                         = body.Id
      this.Name                       = body.Name
      this.Hash                       = body.Hash
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
      this.HasPendingDeletion         = body.HasPendingDeletion
      this.AssociatedFolderTemplateID = body.AssociatedFolderTemplateID
      this.IsTemplateOwned            = body.IsTemplateOwned
      this.StreamID                   = body.StreamID
      this.CreatorNameShort           = body.CreatorNameShort
      this.HasMultipleVersions        = body.HasMultipleVersions
      this.HasPendingAsyncOp          = body.HasPendingAsyncOp
      this.Metadata                   = body.Metadata
      this.Favorite                   = body.Favorite
      this.SemanticPath               = body.SemanticPath

      this.url = `Items(${this.id})/`

  }

  /**
   *
   *
   * @param {boolean} [redirect=false] Redirect to download link if set to true (default), or return a DownloadSpecification if set to false
   * @param {boolean} [includeAllVersions=false] For folder downloads only, includes old versions of files in the folder in the zip when true, current versions only when false (default)
   * @param {boolean} [includeDeleted=false] For FINRA or other archive enabled account only, Super User can set includeDelete=true to download archived item. The default value of includeDeleted is false
   * @return {DownloadSpecification|string} the download link or DownloadSpecification for the this item.
   * @memberof SharefileItem
   */
  async download(
    redirect = false,
    includeAllVersions = false,
    includeDeleted = false
  ) {
    return this.#http
      .get(
        this.url +
          `Download`,{redirect, includeAllVersions, includeDeleted}
      )
      .then((res) => {
        if (redirect) {
          return res;
        } else {
          return new DownloadSpecification(res);
        }
      });
  }

  /**
   * Updates an Item object. Please note that for a Folder, the Name and FileName properties must be consistent. 
   * If a new Name is provided, the FileName will also be updated with the new name, and viceversa. 
   * If both Name and FileName are provided, FileName is disregarded and Name will be used to update both properties.
   * 
   * Note: the parameters listed in the body of the request are the only parameters that can be updated through this call.
   * @param {boolean} overwrite
   */
  async updateItem(ops:SharefileNodeAPI.Items.UpdateItemOps_Body) {
    return this.#http
    .patch( this.url,ops )
    .then((item:ShareFileAPIModels.Item) => {
      this.Name = item.Name;
      this.FileName = item.FileName;
      this.Description = item.Description;
      this.ExpirationDate = item.ExpirationDate;
      this.Parent.Id = item.Parent.Id;
      return this
    });
  }

  async rename(newValue:string){
    return this.updateItem({Name:newValue})
  }

/**
 * Moves an item to a new parent
 *
 * @param {string} parentIdorPath
 * - If a path, makes an extra call to determine the ID of the parent before performing the move.
 * @memberof SharefileItem
 */
async move(parentIdorPath:string){
  let parentId = parentIdorPath;
  if(idOrPath(parentIdorPath)==='path'){
    parentId = await this.#api.itemsByPath(parentIdorPath).then(({id})=>id)
  }
  return this.updateItem({Parent:{Id:parentId}})
}

  /** DEPRECATED use getParent() */
  async parent(){
    console.warn('[DEPRECATION NOTICE] The SharefileItem "parent()" method is DEPRECATED, please use "getParent()"')
    return this.getParent()
  }

  async getParent(){
    return this.#http
      .get( this.url + `Parent`,{} )
      .then((parent) => new SharefileItem(parent, this.#http, this.#api));
  
  }

  /**
   * Handler for the Children navigation property of a given Item. A 302 redirection is returned if the folder is a SymbolicLink. The redirection will enumerate the children of the remote connector
   *
   * @return {SharefileItem[]} the list of children under the given object ID
   * @memberof SharefileItem
   */
  async children(includeDeleted:boolean = false) {
    return this.#http.get(this.url+`Children`,{includeDeleted})
      .then(({value}:{value:ShareFileAPIModels.Item[]}) => {
        return value.map((item:ShareFileAPIModels.Item) => new SharefileItem(item, this.#http, this.#api))

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