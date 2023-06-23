export namespace ShareFileResponse {

  export interface OData {
    metadata: string;
    type: string;
  }

  export interface Login {
      access_token: string;  // Returns an access code or access token, depending on which was requested.
      state       : string;  // The optional value that was passed to the authorization page.
      subdomain   : string;  // The user’s ShareFile subdomain, i.e. if they access their ShareFile account through https://mycompany.sharefile.com , this value would return “mycompany”. Some username / password combinations may be active on multiple accounts. The user would need to choose an account in this case.
      apicp       : string;  // The user's ShareFile API control plane, i.e. sharefile.com, securevdr.com, etc.
      appcp       : string;  // The user's ShareFile account control plane, i.e. sharefile.com, securevdr.com, etc.
      expires_in  : number;  // The expiration time in seconds.
      h           : string;  // A SHA-256 HMAC digest of the path and query string signed with your client secret for validation that the values came from ShareFile.
  }

  export interface Item {
    /** Item Unique ID */
    Id                        : string;          
    /**Item Name*/
    Name                      : string;          
    /**Item File Name. ShareFile allows Items to have different Display and File names: display names are shown during client navigation, while file names are used when the item is downloaded.*/
    FileName                  : string;          
    /**User that Created this Item*/
    Creator                   : User;            
    /**Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.*/
    Parent                    : Item;            
    /** List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL*/
    AccessControls            : Array;           
    /**The Storage Zone that contains this Item.*/
    Zone                      : Zone;            
    /**Item Creation Date.*/
    CreationDate              : Date;            
    /**The last modified date of this item and all of its children, recursively. This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.*/
    ProgenyEditDate           : Date;            
    /**Client device filesystem Created Date of this Item.*/
    ClientCreatedDate?        : Date;            
    /**Client device filesystem last Modified Date of this Item.*/
    ClientModifiedDate?       : Date;            
    /**Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.*/
    ExpirationDate            : Date;            
    /**Item description*/
    Description               : string;          
    /**Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.*/
    DiskSpaceLimit            : number;          
    /**Defines whether the Item has a 'hidden' flag.*/
    IsHidden                  : boolean;         
    /**Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.*/
    BandwidthLimitInMB        : number;          
    /**User Owner of this Item.*/
    Owner                     : User;            
    /**ShareFile Account containing this item.*/
    Account                   : Account;         
    /**Item size in Kilobytes. For containers, this field includes all children sizes, recursively.*/
    FileSizeInKB              : number;          
    /**Contains a ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID*/
    Path                      : string;          
    /**First name of the user that created this item*/
    CreatorFirstName          : string;          
    /**Last name of the user that created this item*/
    CreatorLastName           : string;          
    /**Amount of days until this item expireses (see ExpirationDate)*/
    ExpirationDays            : number;          
    /**Item size in bytes. For containers, this field will include all children sizes, recursively.*/
    FileSizeBytes             : number;          
    /**Indicates whether a preview image is available for this Item. ShareFile.com always create previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types*/
    PreviewStatus             : PreviewStatus;   
    /** Indicates a list of PreviewPlatforms supported for this item.*/
    PreviewPlatformsSupported : Array;           
    /** Indicates a list of EditingPlatforms supported for this item.*/
    EditingPlatformsSupported : Array;           
    /**Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed imediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.*/
    HasPendingDeletion        : boolean;         
    /**Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.*/
    AssociatedFolderTemplateID: string;          
    /**Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.*/
    IsTemplateOwned           : boolean;         
    /**Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.*/
    StreamID                  : string;          
    /**Short version of items creator's name. E.g., J. Doe.*/
    CreatorNameShort          : string;          
    /**Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.*/
    HasMultipleVersions       : boolean;         
    /**Specifies whether or not an Item has a pending async operation.*/
    HasPendingAsyncOp         : boolean;         
    /**Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.*/
    ItemOperations            : ItemOperations;  
    /** List of custom metadata object associated with this item*/
    Metadata                  : Array;           
    /** List of external statuses associated with this Item*/
    Statuses                  : Array;           
    /**Favorite item object associated with the item*/
    Favorite                  : Favorite;        
    /**Item Path using Folder names*/
    SemanticPath              : string;          
  }

  export interface Items {
    'odata.metadata' : string;
    'odata.count'    : number;
    value            : Item[];
    url              : string
  }

}