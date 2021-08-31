declare interface ShareFileResponse_Item {
  id:                         String;
  Name                      : String;          //	Item Name
  FileName                  : String;          //	Item File Name. ShareFile allows Items to have different Display and File names: display names are shown during client navigation, while file names are used when the item is downloaded.
  Creator                   : User;            //	User that Created this Item
  Parent                    : Item;            //	Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
  AccessControls            : Array;           //  List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL
  Zone                      : Zone;            //	The Storage Zone that contains this Item.
  CreationDate              : Date;            //	Item Creation Date.
  ProgenyEditDate           : Date;            //	The last modified date of this item and all of its children, recursively. This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.
  ClientCreatedDate         : Date;            //	Client device filesystem Created Date of this Item.
  ClientModifiedDate        : Date;            //	Client device filesystem last Modified Date of this Item.
  ExpirationDate            : Date;            //	Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.
  Description               : String;          //	Item description
  DiskSpaceLimit            : Number;          //	Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.
  IsHidden                  : Boolean;         //	Defines whether the Item has a 'hidden' flag.
  BandwidthLimitInMB        : Number;          //	Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.
  Owner                     : User;            //	User Owner of this Item.
  Account                   : Account;         //	ShareFile Account containing this item.
  FileSizeInKB              : Number;          //	Item size in Kilobytes. For containers, this field includes all children sizes, recursively.
  Path                      : String;          //	Contains a ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID
  CreatorFirstName          : String;          //	First name of the user that created this item
  CreatorLastName           : String;          //	Last name of the user that created this item
  ExpirationDays            : Number;          //	Amount of days until this item expireses (see ExpirationDate)
  FileSizeBytes             : Number;          //	Item size in bytes. For containers, this field will include all children sizes, recursively.
  PreviewStatus             : PreviewStatus;   //	Indicates whether a preview image is available for this Item. ShareFile.com always create previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types
  PreviewPlatformsSupported : Array;           //  Indicates a list of PreviewPlatforms supported for this item.
  EditingPlatformsSupported : Array;           //  Indicates a list of EditingPlatforms supported for this item.
  HasPendingDeletion        : Boolean;         //	Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed imediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.
  AssociatedFolderTemplateID: String;          //	Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
  IsTemplateOwned           : Boolean;         //	Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
  StreamID                  : String;          //	Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.
  CreatorNameShort          : String;          //	Short version of items creator's name. E.g., J. Doe.
  HasMultipleVersions       : Boolean;         //	Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.
  HasPendingAsyncOp         : Boolean;         //	Specifies whether or not an Item has a pending async operation.
  ItemOperations            : ItemOperations;  //	Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.
  Metadata                  : Array;           //  List of custom metadata object associated with this item
  Statuses                  : Array;           //  List of external statuses associated with this Item
  Favorite                  : Favorite;        //	Favorite item object associated with the item
  SemanticPath              : String;          //	Item Path using Folder names
}