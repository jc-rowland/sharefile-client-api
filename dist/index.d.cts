declare namespace ShareFileAPIModels {
    type SpecialItemIDs = 'home' | 'favorites' | 'allshared' | 'connectors' | 'box' | 'top';
    interface Item {
        /** Item identifier */
        Id: string;
        Hash: string;
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
        LastModifiedByUserID: string | undefined;
        /** Name of the user who last modified this item. */
        LastActivityUserNameShort: string | undefined;
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
    interface User {
        /** The first and last name of the user. */
        FullName: string;
        /** List of Favorite items associated with the user. */
        Favorites: Favorite[];
        /** List of Groups the user belongs to. Only available when authenticated user and user match. */
        Groups: Group[];
    }
    interface Favorite {
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
    interface Group {
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
    interface Account {
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
    interface Contact {
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
    interface AccessControl {
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
    interface Principal {
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
    interface Zone {
        /** Zone secret used for securing communications. */
        Secret: string;
        /** Zone type. */
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
        /** List of metadata objects associated with this zone. */
        Metadata: Metadata[];
    }
    /**
     * Represents a custom metadata entry associated with an Item.
     */
    interface Metadata {
        /** The name of a custom metadata entry. */
        Name: string;
        /** The value of a custom metadata entry. */
        Value: string;
        /** Whether the metadata entry is public or private. Used only by the zone or storage center metadata where only zone admins have access to private metadata. */
        IsPublic: boolean;
    }
    interface Folder extends Item {
        FileCount: number;
        Children: Item[];
        HasRemoteChildren: boolean;
        Info: ItemInfo;
        Redirection: Redirection;
        FavoriteFolder: FavoriteFolder;
    }
    interface File extends Item {
        MimeType: string;
        VirusStatus: VirusStatus;
        MD5: string;
    }
    interface Link extends Item {
        Uri: string;
    }
    interface Note extends Item {
        Content: string;
    }
    interface SymbolicLink extends Item {
        Link: string;
        ConnectorGroup: ConnectorGroup;
    }
    interface ItemInfo {
        HasVroot: boolean;
        IsSystemRoot: boolean;
        IsAccountRoot: boolean;
        IsVRoot: boolean;
        IsMyFolders: boolean;
        IsAHomeFolder: boolean;
        IsMyHomeFolder: boolean;
        IsAStartFolder: boolean;
        IsSharedFolder: boolean;
        IsPassthrough: boolean;
        CanAddFolder: boolean;
        CanAddNode: boolean;
        CanView: boolean;
        CanDownload: boolean;
        CanUpload: boolean;
        CanSend: boolean;
        CanDeleteCurrentItem: boolean;
        CanDeleteChildItems: boolean;
        CanManagePermissions: boolean;
        ShowFolderPayBuyButton: boolean;
    }
    interface Redirection {
        Uri: string;
        IsProxy: boolean;
    }
    interface FavoriteFolder {
        Id: string;
        Name: string;
        ParentId: string;
    }
    interface ConnectorGroup {
        Id: string;
        Name: string;
    }
    enum VirusStatus {
        None = 0,
        Clean = 1,
        Infected = 2,
        Suspicious = 3,
        Failed = 4
    }
    interface PreviewStatus {
        IsAvailable: boolean;
        Content: string;
    }
    interface PreviewPlatformInfo {
        PlatformName: string;
        IsSupported: boolean;
    }
    interface EditingPlatformInfo {
        PlatformName: string;
        IsSupported: boolean;
    }
    interface ItemOperations {
        CanView: boolean;
        CanDownload: boolean;
        CanUpload: boolean;
        CanDelete: boolean;
        CanRename: boolean;
        CanCreateFolder: boolean;
        CanManagePermissions: boolean;
    }
    interface FolderAnalyticsData {
        TotalFiles: number;
        TotalFolders: number;
        TotalSize: number;
        LastModifiedDate: Date;
    }
    interface FolderActivityDetails {
        LastUploadDate: Date;
        LastDownloadDate: Date;
        TotalUploads: number;
        TotalDownloads: number;
    }
    enum ZoneType {
        Public = 0,
        Private = 1
    }
    interface StorageCenter {
        Id: string;
        Name: string;
        ExternalAddress: string;
        Version: string;
    }
    interface ShareAccessRight {
        AccessRightType: AccessRightType;
    }
    enum AccessRightType {
        FullControl = 0,
        ViewOnly = 1
    }
    interface UploadSpecification {
        ChunkUri: string;
        FinishUri: string;
        IsResume: boolean;
        ResumeIndex: number;
        ResumeOffset: number;
        ResumeFileHash: string;
    }
    interface DownloadSpecification {
        DownloadUrl: string;
    }
    interface SearchQuery {
        SearchString: string;
        ItemTypes: string[];
        ParentID: string[];
        CreatorID: string[];
        CreateStartDate: Date;
        CreateEndDate: Date;
        ItemNameOnly: boolean;
    }
    interface SearchResults {
        TotalCount: number;
        Items: Item[];
    }
}

interface SharefileApiAuth {
    subdomain: string;
    username: string;
    password: string;
    clientId: string;
    clientSecret: string;
}
declare class SharefileHTTP {
    private auth;
    private access_token;
    private access_token_expires;
    constructor(auth: SharefileApiAuth);
    private get apiPath();
    private safeJsonParse;
    private request;
    get: <T>(path: string, params?: Record<string, any>) => Promise<T>;
    post: <T>(path: string, body?: Record<string, any>, params?: Record<string, any>) => Promise<T>;
    put: <T>(path: string, body?: Record<string, any>, params?: Record<string, any>) => Promise<T>;
    patch: <T>(path: string, body?: Record<string, any>, params?: Record<string, any>) => Promise<T>;
    delete: <T>(path: string, params?: Record<string, any>) => Promise<T>;
    head: <T>(path: string, params?: Record<string, any>) => Promise<T>;
    private getToken;
    authenticate(): Promise<string>;
    private get isTokenExpired();
}

declare namespace ShareFileResponse {

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

/**
 * Base class for most Sharefile elements
 *
 */

declare class SharefileClientAPIElement {
    protected _http: SharefileHTTP;
    protected _api: ShareFileAPI;
    'odata.metadata': string;
    'odata.type': string;
    'url'?: string;
    constructor(http: SharefileHTTP, api: ShareFileAPI);
}

interface HttpResponse_DownloadSpecification {
    DownloadToken: string;
    DownloadUrl: string;
    DownloadPrepStatusURL: string;
    "odata.metadata": string;
    "odata.type": string;
}
/**
 *  ````
 *  const downloadSpec = new DownloadSpecification(response, http, api);
 *
 *  // Download as Buffer (default)
 *  const buffer = await downloadSpec.download().toBuffer();
 *
 *  // Download as Stream
 *  const stream = await downloadSpec.download().toStream();
 *
 *  // Wait and then download as Buffer
 *  const buffer = await downloadSpec.waitAndDownload().then(chain => chain.toBuffer());
 *
 *  // Wait and then download as Stream
 *  const stream = await downloadSpec.waitAndDownload().then(chain => chain.toStream());
 * ````
 *
 * @memberof ShareFile.Api.Models.DownloadSpecification
 * @link https://api.sharefile.com/docs/resource?name=ShareFile.Api.Models.DownloadSpecification
 */
declare class DownloadSpecification extends SharefileClientAPIElement {
    readonly token: string;
    readonly url: string;
    readonly prepStatus: string;
    readonly odata: ShareFileResponse.OData;
    constructor(x: HttpResponse_DownloadSpecification, http: SharefileHTTP, api: ShareFileAPI);
    checkStatus(): Promise<boolean>;
    download(): DownloadChain;
    waitAndDownload(maxAttempts?: number, interval?: number): Promise<DownloadChain>;
}
declare class DownloadChain {
    private url;
    private token;
    constructor(url: string, token: string);
    private makeRequest;
    toBuffer(): Promise<Buffer>;
    toStream(): Promise<ReadableStream>;
}

declare namespace SharefileNodeAPI {
    namespace Items {
        interface UpdateItem_Params {
            /** ID of the Item object. */
            id: string;
            /** BatchID for Async Operation. */
            batchid: string;
            /** Async Operation size in bytes. */
            batchSizeInBytes: number;
            /** Indicates whether the operation is to be executed synchronously. */
            forceSync: boolean;
            /** Indicates whether the operation is to be scheduled for Bot processing. */
            scheduleAsync: boolean;
            /** Specifies whether to rename the folder if there is a conflict. */
            resolveFolderNameConflict: boolean;
            /** Indicates whether an email should be sent to users subscribed to Upload Notifications. */
            notify: boolean;
        }
        interface UpdateItemOps_Body {
            /** Updated Item Name. */
            Name?: string;
            /** Updated Item File Name. */
            FileName?: string;
            /** Updated Item Description. */
            Description?: string;
            /** Updated Item Expiration Date. */
            ExpirationDate?: Date;
            /** Updated Parent container of the Item. */
            Parent?: {
                Id?: string;
            };
            /** Updated Storage Zone that contains the Item. */
            Zone?: {
                Id?: string;
            };
        }
    }
    interface Auth {
        subdomain: string;
        username: string;
        password: string;
        clientId: string;
        clientSecret: string;
    }
}

declare class SharefileItem extends SharefileClientAPIElement {
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
    readonly Parent: {
        Id: string;
    };
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
    constructor(body: ShareFileAPIModels.Item, http: SharefileHTTP, api: ShareFileAPI);
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
     * Creates a new folder as a child of the current item.
     * @param folderName The name of the new folder
     * @param description Optional description for the new folder
     * @param overwrite If true, overwrites an existing folder with the same name
     * @returns A Promise that resolves to the newly created SharefileItem
     */
    createFolder(folderName: string, description?: string, overwrite?: boolean): Promise<SharefileItem>;
    /**
     * Updates an Item object. Please note that for a Folder, the Name and FileName properties must be consistent.
     * If a new Name is provided, the FileName will also be updated with the new name, and viceversa.
     * If both Name and FileName are provided, FileName is disregarded and Name will be used to update both properties.
     *
     * Note: the parameters listed in the body of the request are the only parameters that can be updated through this call.
     * @param {SharefileNodeAPI.Items.UpdateItemOps_Body} ops - The properties to update.
     * @returns {Promise<SharefileItem>} The updated SharefileItem.
     */
    updateItem(ops: SharefileNodeAPI.Items.UpdateItemOps_Body): Promise<SharefileItem>;
    /**
    * Renames the item.
    * @param {string} newValue - The new name for the item.
    * @returns {Promise<SharefileItem>} The updated SharefileItem.
    */
    rename(newValue: string): Promise<SharefileItem>;
    /**
     * Moves an item to a new parent
     *
     * @param {string} parentIdorPath
     * - If a path, makes an extra call to determine the ID of the parent before performing the move.
     * @memberof SharefileItem
     */
    move(parentIdorPath: string): Promise<SharefileItem>;
    /** DEPRECATED use getParent() */
    parent(): Promise<SharefileItem>;
    /**
     * Gets the parent of this item.
     * @returns {Promise<SharefileItem>} The parent SharefileItem.
     */
    getParent(): Promise<SharefileItem>;
    /**
     * Gets the children of this item (if it's a folder).
     * @param {boolean} [includeDeleted=false] - Whether to include deleted items.
     * @returns {Promise<SharefileItem[]>} An array of child SharefileItems.
     */
    children(includeDeleted?: boolean): Promise<SharefileItem[]>;
    /**
    * Gets the first child that matches the given property and value.
    * @param {keyof SharefileItem} propName - The property name to match.
    * @param {any} propVal - The value to match.
    * @param {boolean} [includeDeleted=false] - Whether to include deleted items in the search.
    * @returns {Promise<SharefileItem | undefined>} The matching SharefileItem, if found.
    */
    childBy(propName: keyof SharefileItem, propVal: any, includeDeleted?: boolean): Promise<SharefileItem | undefined>;
    /**
     * Uploads a file to this item (if it's a folder).
     * @param {string | Buffer} contents - The file contents to upload.
     * @param {string} filename - The name for the uploaded file.
     * @returns {Promise<SharefileItem | undefined>} The newly created SharefileItem, if successful.
     */
    upload(contents: string | Buffer, filename: string): Promise<SharefileItem | undefined>;
    /**
     * Retrieves the versions of a given Stream.
     * @param includeDeleted Specifies whether or not expired items should be included in the feed
     * @returns A Promise that resolves to the stream versions
     */
    getStream(includeDeleted?: boolean): Promise<ShareFileAPIModels.Item[]>;
    /**
     * Removes the item
     * @param singleversion True will delete only the specified version rather than all sibling files with the same filename
     * @param forceSync True will block the operation from taking place asynchronously
     * @returns A Promise that resolves when the item is deleted
     */
    delete(singleversion?: boolean, forceSync?: boolean): Promise<true>;
    /**
     * Unlocks a locked file. This operation is only implemented in Sharepoint providers (/sp)
     * @param message Optional message for the check-in
     * @returns A Promise that resolves when the file is unlocked
     */
    unlock(message?: string): Promise<void>;
    /**
     * Locks a file. This operation is only implemented in Sharepoint providers (/sp)
     * @returns A Promise that resolves when the file is locked
     */
    lock(): Promise<void>;
    /**
     * Discards the existing lock on the file. This operation is only implemented in Sharepoint providers (/sp)
     * @returns A Promise that resolves when the lock is discarded
     */
    discardCheckOut(): Promise<void>;
}

/**
 * @memberof ShareFile._api.Models.SearchResults
 * @link https://api.sharefile.com/docs/resource?name=ShareFile._api.Models.SearchResults
 */

/**
 * Represents a single search result item.
 */
interface ISearchResult_Reponse {
    PartialResults: boolean;
    Results: any[];
    TimedOut: boolean;
    TotalCount: number;
}
/**
 * Represents the results of a search operation in ShareFile.
 */
declare class SharefileSearchResults extends SharefileClientAPIElement {
    /**
     * Indicates whether the results are partial due to limitations or timeouts.
     */
    readonly partialResults: boolean;
    /**
     * The collection of search result items.
     */
    readonly results: any[];
    /**
     * Indicates whether the search query timed out.
     */
    readonly timedOut: boolean;
    /**
     * The total number of results found.
     */
    readonly totalCount: number;
    /**
     * Creates a new instance of SharefileSearchResults.
     *
     * @param {Object} data - The raw search results data from the API.
     * @param {SharefileHTTP} http - The HTTP client for making requests.
     * @param {ShareFileAPI} api - The ShareFile API instance.
     */
    constructor(data: ISearchResult_Reponse, http: SharefileHTTP, api: ShareFileAPI);
    /**
     * Gets a specific page of search results.
     *
     * @param {number} pageNumber - The page number to retrieve.
     * @param {number} pageSize - The number of items per page.
     * @returns {Promise<SharefileSearchResults>} A new instance of SharefileSearchResults with the requested page of results.
     */
    getPage(pageNumber: number, pageSize: number): Promise<SharefileSearchResults>;
    /**
     * Retrieves the full SharefileItem for each search result.
     *
     * @returns {Promise<SharefileItem[]>} An array of full SharefileItem objects.
     */
    getFullItems(): Promise<SharefileItem[]>;
}

/**
 * ShareFileAPI class provides a high-level interface for interacting with the ShareFile API.
 * It handles authentication, item management, and other core ShareFile operations.
 *
 * @example
 * const api = new ShareFileAPI({
 *   subdomain: 'mycompany',
 *   username: 'user@example.com',
 *   password: 'password123',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret'
 * });
 *
 * await api.connect();
 * const rootFolder = await api.getItem('home');
 */
declare class ShareFileAPI {
    _http: SharefileHTTP;
    _api: ShareFileAPI;
    /**
     * Creates a new instance of ShareFileAPI.
     *
     * @param {SharefileApiAuth} auth - Authentication details for ShareFile
     */
    constructor(auth: SharefileApiAuth);
    /**
     * Authenticates with the ShareFile API.
     * This method should be called before making any other API requests.
     *
     * @returns {Promise<string>} A promise that resolves to the access token
     * @throws {Error} If authentication fails
     *
     * @example
     * await api.connect();
     */
    connect(): Promise<string>;
    /**
     * Retrieves a ShareFile item by its ID or path.
     *
     * @param {string} idOrPath - The ID or path of the item to retrieve
     * @returns {Promise<SharefileItem>} A promise that resolves to the requested item
     * @throws {Error} If the item retrieval fails
     *
     * @example
     * const homeFolder = await api.getItem('home');
     * const specificFile = await api.getItem('fi123456789');
     * const folderByPath = await api.getItem('/Personal Folders/Documents');
     */
    getItem(idOrPath: string | ShareFileAPIModels.SpecialItemIDs): Promise<SharefileItem>;
    /**
     * Retrieves the contents of a folder.
     *
     * @param {string} folderId - The ID of the folder
     * @param {Record<string, any>} [queryParams] - Additional query parameters
     * @returns {Promise<SharefileItem[]>} A promise that resolves to an array of folder contents
     * @throws {Error} If retrieval of folder contents fails
     *
     * @example
     * const folderContents = await api.getFolderContents('fo123456789');
     * const filteredContents = await api.getFolderContents('fo123456789', { $filter: 'IsFolder eq true' });
     */
    getFolderContents(folderId: string, queryParams?: Record<string, any>): Promise<SharefileItem[]>;
    /**
     * Creates a new item in ShareFile.
     *
     * @param {string} parentId - The ID of the parent folder
     * @param {string} itemType - The type of item to create (e.g., 'Folder', 'File')
     * @param {Record<string, any>} itemData - Data for the new item
     * @returns {Promise<SharefileItem>} A promise that resolves to the created item
     * @throws {Error} If item creation fails
     *
     * @example
     * const newFolder = await api.createItem('fo123456789', 'Folder', { Name: 'New Folder' });
     * const newFile = await api.createItem('fo123456789', 'File', { Name: 'test.txt', ContentType: 'text/plain' });
     */
    createItem(parentId: string, itemType: string, itemData: Record<string, any>): Promise<SharefileItem>;
    /**
     * Deletes an item from ShareFile.
     *
     * @param {string} itemId - The ID of the item to delete
     * @returns {Promise<void>}
     * @throws {Error} If item deletion fails
     *
     * @example
     * await api.deleteItem('fi123456789');
     */
    deleteItem(itemId: string): Promise<void>;
    /**
     * Searches for items in ShareFile.
     *
     * @param {string} query - The search query
     * @param {Record<string, any>} [searchParams] - Additional search parameters
     * @returns {Promise<SharefileSearchResults>} A promise that resolves to an array of search results
     * @throws {Error} If the search operation fails
     *
     * @example
     * const searchResults = await api.searchItems('budget');
     * const filteredSearch = await api.searchItems('report', { $filter: 'CreationDate gt 2023-01-01' });
     */
    searchItems(query: string, searchParams?: Record<string, any>): Promise<SharefileSearchResults>;
    /**
     * Returns the underlying HTTP client for advanced usage.
     *
     * @returns {SharefileHTTP} The HTTP client instance
     *
     * @example
     * const httpClient = api.getHttpClient();
     * const customData = await httpClient.get('CustomEndpoint');
     */
    getHttpClient(): SharefileHTTP;
    /**
     * @deprecated Use getItem() instead.
     * This method will be removed in a future version.
     */
    items(id?: string, queryParams?: Record<string, any>): Promise<SharefileItem>;
    /**
     * @deprecated Use getItem() instead.
     * This method will be removed in a future version.
     */
    itemsByPath(path: string): Promise<SharefileItem>;
    /**
     * @deprecated Use createItem() instead.
     * This method will be removed in a future version.
     */
    createFolder(parentId: string, folderName: string): Promise<SharefileItem>;
}

export { ShareFileAPI, ShareFileAPI as default };
