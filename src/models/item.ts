/**
 * @memberof ShareFile.Api.Models.Item
 * @link https://api.sharefile.com/docs/resource?name=ShareFile.Api.Models.Item
 */
import { ShareFileAPIModels } from '../types/sharefile.api.models'
import SharefileHTTP from '../http/index'
import UploadSpecification from './upload-spec'
import DownloadSpecification from './download-spec'
import { SharefileNodeAPI } from '../types/sharefile-client-api'
import idOrPath from '../utils/id-or-path'
import ShareFileAPI from '../sharefile-client-api'
import type { HttpResponse_DownloadSpecification } from './download-spec'
import SharefileClientAPIElement from './api-element'

export default class SharefileItem extends SharefileClientAPIElement {
  
  /**
   * Item Unique ID.
   * @type {string}
   */
  readonly id: string;

  /**
   * Item Name.
   * @type {string}
   */
  readonly Name: string;

  readonly Hash: string;

  /**
   * Item File Name. ShareFile allows Items to have different Display and File names:
   * display names are shown during client navigation, while file names are used when the item is downloaded.
   * @type {string}
   */
  readonly FileName: string;

  /**
   * User that Created this Item.
   */
  readonly Creator?: ShareFileAPIModels.User;

  /**
   * Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
   */
  readonly Parent: {Id:string};

  /**
   * List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL.
   */
  readonly AccessControls?: ShareFileAPIModels.AccessControl[];

  /**
   * The Storage Zone that contains this Item.
   */
  readonly Zone?: ShareFileAPIModels.Zone;

  /**
   * Item Creation Date.
   */
  readonly CreationDate: Date;

  /**
   * The last modified date of this item and all of its children, recursively.
   * This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.
   */
  readonly ProgenyEditDate: Date;

  /**
   * Client device filesystem Created Date of this Item.
   */
  readonly ClientCreatedDate?: Date;

  /**
   * Client device filesystem last Modified Date of this Item.
   */
  readonly ClientModifiedDate?: Date;

  /**
   * Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.
   */
  readonly ExpirationDate: Date;

  /**
   * Item description.
   */
  readonly Description: string;

  /**
   * Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.
   */
  readonly DiskSpaceLimit: number;

  /**
   * Defines whether the Item has a 'hidden' flag.
   */
  readonly IsHidden: boolean;

  /**
   * Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.
   */
  readonly BandwidthLimitInMB: number;

  /**
   * User Owner of this Item.
   */
  readonly Owner?: ShareFileAPIModels.User;

  /**
   * ShareFile Account containing this item.
   */
  readonly Account?: ShareFileAPIModels.Account;

  /**
   * Item size in Kilobytes. For containers, this field includes all children sizes, recursively.
   */
  readonly FileSizeInKB: number;

  /**
   * Contains an ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID.
   */
  readonly Path: string;

  /**
   * First name of the user that created this item.
   */
  readonly CreatorFirstName: string;

  /**
   * Last name of the user that created this item.
   */
  readonly CreatorLastName: string;

  /**
   * Amount of days until this item expires (see ExpirationDate).
   */
  readonly ExpirationDays: number;

  /**
   * Item size in bytes. For containers, this field will include all children sizes, recursively.
   */
  readonly FileSizeBytes: number;

  /**
   * Indicates whether a preview image is available for this Item. ShareFile.com always creates previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types.
   */
  readonly PreviewStatus?: any;

  /**
   * Indicates a list of PreviewPlatforms supported for this item.
   */
  readonly PreviewPlatformsSupported?: any;

  /**
   * Indicates a list of EditingPlatforms supported for this item.
   */
  readonly EditingPlatformsSupported: any;

  /**
   * Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed immediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.
   */
  readonly HasPendingDeletion: boolean;

  /**
   * Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
   */
  readonly AssociatedFolderTemplateID: string;

  /**
   * Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
   */
  readonly IsTemplateOwned: boolean;

  /**
   * Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.
   */
  readonly StreamID: string;

  /**
   * Short version of the item's creator's name. E.g., J. Doe.
   */
  readonly CreatorNameShort: string;

  /**
   * Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.
   */
  readonly HasMultipleVersions: boolean;

  /**
   * Specifies whether or not an Item has a pending async operation.
   */
  readonly HasPendingAsyncOp: boolean;

  /**
   * Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.
   */
  readonly ItemOperations?: any;

  /**
   * List of custom metadata objects associated with this item.
   */
  readonly Metadata?: any;

  /**
   * List of external statuses associated with this Item.
   */
  readonly Statuses?: any;

  /**
   * Favorite item object associated with the item.
   */
  readonly Favorite?: any;

  /**
   * Item Path using Folder names.
   */
  readonly SemanticPath?: string;

  url: string;

  /**
   * Creates an instance of SharefileItem.
   * @param {ShareFileAPIModels.Item} body - The response body from ShareFile API representing an Item.
   * @param {SharefileHTTP} http - SharefileHTTP instance used for making HTTP requests.
   * @param {ShareFileAPI} api - ShareFileAPI instance for additional operations.
   */
  constructor(body: ShareFileAPIModels.Item, http:SharefileHTTP, api:ShareFileAPI) {
      super(http,api)

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
   * Downloads the item and returns a download link.
   * @param redirect - Whether to redirect to the download link.
   * @param includeAllVersions - For folder downloads, includes old versions of files when true.
   * @param includeDeleted - Include archived items if true (for FINRA or other archive-enabled accounts).
   */
  download(redirect: true, includeAllVersions?: boolean, includeDeleted?: boolean): Promise<string>;

  /**
   * Downloads the item and returns a DownloadSpecification.
   * @param redirect - Whether to redirect to the download link.
   * @param includeAllVersions - For folder downloads, includes old versions of files when true.
   * @param includeDeleted - Include archived items if true (for FINRA or other archive-enabled accounts).
   */
  download(redirect: false, includeAllVersions?: boolean, includeDeleted?: boolean): Promise<DownloadSpecification>;

  /**
   * Downloads the item.
   * @param redirect - Whether to redirect to the download link.
   * @param includeAllVersions - For folder downloads, includes old versions of files when true.
   * @param includeDeleted - Include archived items if true (for FINRA or other archive-enabled accounts).
   */
  async download(
    redirect: boolean,
    includeAllVersions = false,
    includeDeleted = false
  ): Promise<string | DownloadSpecification> {
    const res = await this._http.get<string | HttpResponse_DownloadSpecification>(`${this.url}Download`, {
      redirect,
      includeAllVersions,
      includeDeleted
    });

    if (redirect) {
      return res as string;
    } else {
      return new DownloadSpecification(res as HttpResponse_DownloadSpecification,this._http,this._api);
    }
  }


  /**
   * Creates a new folder as a child of the current item.
   * @param folderName The name of the new folder
   * @param description Optional description for the new folder
   * @param overwrite If true, overwrites an existing folder with the same name
   * @returns A Promise that resolves to the newly created SharefileItem
   */
  async createFolder(folderName: string, description?: string, overwrite: boolean = false): Promise<SharefileItem> {
    const folderData = {
      Name: folderName,
      Description: description
    };

    const data = await this._http.post<ShareFileAPIModels.Item>(`${this.url}Folder`, folderData, { overwrite });
    return new SharefileItem(data, this._http, this._api);
  }

  /**
   * Updates an Item object. Please note that for a Folder, the Name and FileName properties must be consistent. 
   * If a new Name is provided, the FileName will also be updated with the new name, and viceversa. 
   * If both Name and FileName are provided, FileName is disregarded and Name will be used to update both properties.
   * 
   * Note: the parameters listed in the body of the request are the only parameters that can be updated through this call.
   * @param {SharefileNodeAPI.Items.UpdateItemOps_Body} ops - The properties to update.
   * @returns {Promise<SharefileItem>} The updated SharefileItem.
   */
  async updateItem(ops: SharefileNodeAPI.Items.UpdateItemOps_Body): Promise<SharefileItem> {
    const item = await this._http.patch<ShareFileAPIModels.Item>(this.url, ops);
    Object.assign(this, item);
    return this;
  }

   /**
   * Renames the item.
   * @param {string} newValue - The new name for the item.
   * @returns {Promise<SharefileItem>} The updated SharefileItem.
   */
   async rename(newValue: string): Promise<SharefileItem> {
    return this.updateItem({ Name: newValue });
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
    parentId = await this._api.getItem(parentIdorPath).then(({id})=>id)
  }
  return this.updateItem({Parent:{Id:parentId}})
}

  /** DEPRECATED use getParent() */
  async parent(){
    console.warn('[DEPRECATION NOTICE] This will be removed in the next version, please use "getParent()"')
    return this.getParent()
  }

  /**
   * Gets the parent of this item.
   * @returns {Promise<SharefileItem>} The parent SharefileItem.
   */
  async getParent(): Promise<SharefileItem> {
    const parent = await this._http.get<ShareFileAPIModels.Item>(`${this.url}Parent`);
    return new SharefileItem(parent, this._http, this._api);
  }

  /**
   * Gets the children of this item (if it's a folder).
   * @param {boolean} [includeDeleted=false] - Whether to include deleted items.
   * @returns {Promise<SharefileItem[]>} An array of child SharefileItems.
   */
  async children(includeDeleted = false): Promise<SharefileItem[]> {
    const { value } = await this._http.get<{ value: ShareFileAPIModels.Item[] }>(`${this.url}Children`, { includeDeleted });
    return value.map(item => new SharefileItem(item, this._http, this._api));
  }
  

   /**
   * Gets the first child that matches the given property and value.
   * @param {keyof SharefileItem} propName - The property name to match.
   * @param {any} propVal - The value to match.
   * @param {boolean} [includeDeleted=false] - Whether to include deleted items in the search.
   * @returns {Promise<SharefileItem | undefined>} The matching SharefileItem, if found.
   */
   async childBy(propName: keyof SharefileItem, propVal: any, includeDeleted = false): Promise<SharefileItem | undefined> {
    const children = await this.children(includeDeleted);
    return children.find(item => item[propName] === propVal);
  }

  /**
   * Uploads a file to this item (if it's a folder).
   * @param {string | Buffer} contents - The file contents to upload.
   * @param {string} filename - The name for the uploaded file.
   * @returns {Promise<SharefileItem | undefined>} The newly created SharefileItem, if successful.
   */
  async upload(contents: string | Buffer, filename: string): Promise<SharefileItem | undefined> {
    const ops = {
      Method: "standard",
      Raw: true,
      FileName: filename
    };
    const uploadSpec = await this._http.post<UploadSpecification>(`${this.url}Upload2`, ops).then(res=>new UploadSpecification(res,this._http,this._api));
    await uploadSpec.upload(contents);
    return this.childBy('FileName', filename);
  }


  
  /**
   * Retrieves the versions of a given Stream.
   * @param includeDeleted Specifies whether or not expired items should be included in the feed
   * @returns A Promise that resolves to the stream versions
   */
  async getStream(includeDeleted: boolean = false): Promise<ShareFileAPIModels.Item[]> {
    return this._http.get<ShareFileAPIModels.Item[]>(`${this.url}Stream`, { includeDeleted })
      .then((res) => res);
  }

  /**
   * Removes the item
   * @param singleversion True will delete only the specified version rather than all sibling files with the same filename
   * @param forceSync True will block the operation from taking place asynchronously
   * @returns A Promise that resolves when the item is deleted
   */
  async delete(singleversion: boolean = false, forceSync: boolean = false): Promise<true> {
    return this._http.delete(this.url, { singleversion, forceSync }).then(res=>true);
  }

  // /**
  //  * Copies the item to a new target Folder.
  //  * @param targetId Target item identifier
  //  * @param overwrite Indicates whether existing item in the target folder should be overwritten or not in case of name conflict
  //  * @returns A Promise that resolves to the modified source object
  //  */
  // async copy(targetId: string, overwrite: boolean = false): Promise<SharefileItem> {
  //   const data = await this._http.post(`${this.url}Copy`, { targetid: targetId, overwrite });
  //   return new SharefileItem(data, this._http, this._api);
  // }

  /**
   * Unlocks a locked file. This operation is only implemented in Sharepoint providers (/sp)
   * @param message Optional message for the check-in
   * @returns A Promise that resolves when the file is unlocked
   */
  async unlock(message?: string): Promise<void> {
    return this._http.post(`${this.url}CheckIn`, { message });
  }

  /**
   * Locks a file. This operation is only implemented in Sharepoint providers (/sp)
   * @returns A Promise that resolves when the file is locked
   */
  async lock(): Promise<void> {
    return this._http.post(`${this.url}CheckOut`);
  }

  /**
   * Discards the existing lock on the file. This operation is only implemented in Sharepoint providers (/sp)
   * @returns A Promise that resolves when the lock is discarded
   */
  async discardCheckOut(): Promise<void> {
    return this._http.post(`${this.url}DiscardCheckOut`);
  }
}