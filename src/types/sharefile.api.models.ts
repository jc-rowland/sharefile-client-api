export namespace ShareFileAPIModels {

  export interface Item {
    /** Item identifier */
    Id: string;
    /** Item Name */
    Name: string;
    /** Item File Name. ShareFile allows Items to have different Display and File names: display names are shown during client navigation, while file names are used when the item is downloaded. */
    FileName: string;
    /** User that Created this Item */
    Creator: User;
    /** Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders. */
    Parent: Item;
    /** List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL. */
    AccessControls: AccessControl[];
    /** The Storage Zone that contains this Item. */
    Zone: Zone;
    /** Item Creation Date. */
    CreationDate: Date;
    /** The last modified date of this item and all of its children, recursively. This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not. */
    ProgenyEditDate: Date;
    /** Id of the user who last modified this item. */
    LastModifiedByUserID: string|undefined;
    /** Name of the user who last modified this item. */
    LastActivityUserNameShort: string|undefined
    /** Client device filesystem Created Date of this Item. */
    ClientCreatedDate: Date;
    /** Client device filesystem last Modified Date of this Item. */
    ClientModifiedDate: Date;
    /** Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin. */
    ExpirationDate: Date;
    /** Item description */
    Description: string;
    /** Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time. */
    DiskSpaceLimit: number;
    /** Defines whether the Item has a 'hidden' flag. */
    IsHidden: boolean;
    /** Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item. */
    BandwidthLimitInMB: number;
    /** User Owner of this Item. */
    Owner: User;
    /** ShareFile Account containing this item. */
    Account: Account;
    /** Item size in Kilobytes. For containers, this field includes all children sizes, recursively. */
    FileSizeInKB: number;
    /** Contains a path, separated by /, from the virtual root to the parent folder for the given file. Example: /accountID/folderID/folderID */
    Path: string;
    /** First name of the user that created this item */
    CreatorFirstName: string;
    /** Last name of the user that created this item */
    CreatorLastName: string;
    /** Amount of days until this item expires (see ExpirationDate) */
    ExpirationDays: number;
    /** Item size in bytes. For containers, this field will include all children sizes, recursively. */
    FileSizeBytes: number;
    /** Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed immediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider. */
    HasPendingDeletion: boolean;
    /** Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates. */
    AssociatedFolderTemplateID: string;
    /** Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates. */
    IsTemplateOwned: boolean;
    /** Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference. */
    StreamID: string;
    /** Short version of the item's creator's name. E.g., J. Doe. */
    CreatorNameShort: string;
    /** Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions. */
    HasMultipleVersions: boolean;
    /** Specifies whether or not an Item has a pending async operation. */
    HasPendingAsyncOp: boolean;
    /** List of custom metadata objects associated with this item. */
    Metadata: Metadata[];
    /** Favorite item object associated with the item. */
    Favorite: Favorite;
    /** Item Path using Folder names. */
    SemanticPath: string;
  }

 export interface User {
  /** The first and last name of the user. */
  FullName: string;
  /** List of Favorite items associated with the user. */
  Favorites: Favorite[];
  /** List of Groups the user belongs to. Only available when authenticated user and user match. */
  Groups: Group[];
}
  
export interface Favorite {
  /** Creator of the Favorite. */
  User: User;
  /** The item which is marked as Favorite. */
  Item: Item;
  /** The position within the set of Favorite items where this Favorite should be displayed. */
  DisplayPosition: number;
  /** The alias name of the Favorite. */
  Alias: string;
  /** Date when the item was marked as favorite. */
  CreationDate: Date;
}
  
  /**
 * Represents a Distribution Group.
 */
export interface Group {
  /** The group's owner. */
  Owner: User;
  /** The Account associated with the group. */
  Account: Account;
  /** Indicates whether this group is public. */
  IsShared: boolean;
  /** Number of contacts in the group. */
  NumberOfContacts: number;
  /** List of group contacts. */
  Contacts: Contact[];
}
  
  /**
 * Represents a Tenant Account in ShareFile.com.
 */
export interface Account {
  /** Plan name of the account (Basic, Professional, Enterprise). */
  PlanName: 'Basic' | 'Professional' | 'Enterprise';
  /** Billing type of the account (Credit Card, Invoice, Comp). */
  BillingType: 'Credit Card' | 'Invoice' | 'Comp';
  /** Billing cycle of the account (Monthly, Quarterly, Annually). */
  BillingCycle: 'Monthly' | 'Quarterly' | 'Annually';
  /** Bandwidth included in the plan in megabytes. */
  BaseBandwidth: number;
  /** Disk space included in the plan in megabytes. */
  BaseDiskSpace: number;
  /** Users included in the plan. */
  BaseUsers: number;
  /** Additional bandwidth purchased for the account. */
  AdditionalBandwidth: number;
  /** Additional disk space purchased for the account. */
  AdditionalDiskSpace: number;
  /** Additional users purchased for the account. */
  AdditionalUsers: number;
  /** Additional rate for extra bandwidth (specified in gigabytes, not megabytes). */
  AdditionalBandwidthRate: number;
  /** Additional rate for extra disk space (specified in gigabytes, not megabytes). */
  AdditionalDiskSpaceRate: number;
  /** Additional rate for extra users. */
  AdditionalUserRate: number;
  /** Maximum disk space for the account in megabytes. */
  DiskSpaceMax: number;
  /** Maximum bandwidth for the account in megabytes. */
  BandwidthMax: number;
  /** Additional rate for adding PowerTools. */
  PowerToolsRate: number;
  /** Additional rate for stored file encryption. */
  EncryptionRate: number;
  /** Primary (first) subdomain of the account. */
  Subdomain: string;
  /** All subdomains assigned to the account. */
  Subdomains: string[];
}
  
  /**
 * Represents a Contact.
 */
export interface Contact {
  /** First name of the contact. */
  FirstName: string;
  /** Last name of the contact. */
  LastName: string;
  /** Company associated with the contact. */
  Company: string;
  /** First 40 characters of the email address of the contact. */
  EmailMedium: string;
  /** First 20 characters of the email address of the contact. */
  EmailShort: string;
  /** Number of members in a distribution group. This property will only be filled for distribution groups. */
  Count: number;
  /** Date when this user was created. */
  CreatedDate: Date;
}

/**
 * Represents a rule configuring access of a Principal to an Item.
 */
export interface AccessControl {
  /** Item that was given permission through this rule. */
  Item: Item;
  /** Principal (User or Group) that has been granted permissions through this rule. */
  Principal: Principal;
  /** Defines whether the principal can add files (upload) into the Item. */
  CanUpload: boolean;
  /** Defines whether the principal can read file content (download) from this Item. */
  CanDownload: boolean;
  /** Defines whether the principal can view items (browse) from this Item. */
  CanView: boolean;
  /** Defines whether the principal can remove items from this Item. */
  CanDelete: boolean;
  /** Defines whether the principal can configure Access Controls in this Item. */
  CanManagePermissions: boolean;
  /** Defines the notification preference for upload events. If set, the principal will receive notifications when new files are uploaded into this Item. */
  NotifyOnUpload: boolean;
  /** Defines the notification preference for download events. If set, the principal will receive notifications when items are downloaded from this Item. */
  NotifyOnDownload: boolean;
  /** Defines whether the principal is the owner of this Item. */
  IsOwner: boolean;
  /** Defines whether the notification preference for upload and download events can be edited by someone other than the principal. If set, the notification preference can only be edited by the principal. */
  IsNotifyOnUploadDownloadDisabled: boolean;
}

/**
 * Represents an authenticated authority in ShareFile. A principal object represents some authority in the ShareFile system, that can login and/or be given AccessControl permissions to Items. Principals include Users, Groups and Zones. Groups cannot authenticate, but can be part of Items Access Control lists. Zones can authenticate to perform zone management operations - such as copying items to another zone. Users are the typical users, represented by email and domain.
 */
export interface Principal {
  /** User name of the principal. */
  Name: string;
  /** Email address of the principal. */
  Email: string;
  /** Username for the account - the value used for login. This is the same as Email for ShareFile accounts, but may be different on Connectors. */
  Username: string;
  /** Account domain of the principal. */
  Domain: string;
  /** Account ID of the principal. */
  AccountId: string;
}

/**
 * Zones represent sites that can hold ShareFile data. Zones can be either Private - installed at customer's premises - or Public - managed by ShareFile. ShareFile Items are always associated with a given Zone. Zones have multiple StorageCenters - each represents a physical server in that zone.
 */
export interface Zone {
  /** Zone secret used for securing communications. */
  Secret: string;
  /** Zone type. */
  // ZoneType: ZoneType;
  /** Zone account - only set on Private zones. */
  Account: Account;
  /** Specifies how much time between heartbeats before sharefile.com will remove a Storage Center from load balancing. */
  HeartBeatTolerance: number;
  /** Specifies how often sharefile.com will attempt to connect back to the Zone and determine if the zone is healthy. */
  PingBackInterval: number;
  /** Zone version - this parameter cannot be set, it is determined from the version of its storage centers. A zone version is the lowest version of a storage center in that zone. */
  Version: string;
  /** Specifies if the zone is a HIPAA zone. */
  IsHIPAAZone: boolean;
  /** Specifies if the zone is a multi-tenant zone. */
  IsMultiTenant: boolean;
  /** List of Storage Centers created on this zone. A Storage Center is a stateless server that performs the zone services. Operations to this zone will be redirected to one of the storage centers - using the configured external address. */
  // StorageCenters: StorageCenter[];
  /** List of metadata objects associated with this zone. */
  Metadata: Metadata[];
}

/**
 * Represents a custom metadata entry associated with an Item.
 */
export interface Metadata {
  /** The name of a custom metadata entry. */
  Name: string;
  /** The value of a custom metadata entry. */
  Value: string;
  /** Whether the metadata entry is public or private. Used only by the zone or storage center metadata where only zone admins have access to private metadata. */
  IsPublic: boolean;
}


}