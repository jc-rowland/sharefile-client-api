import { Method } from 'axios';

declare namespace ShareFileAPIModels {
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
}

interface Sharefile_Api_Auth {
    subdomain: String;
    username: String;
    password: String;
    clientId: String;
    clientSecret: String;
}
declare class SharefileHTTP {
    auth: Sharefile_Api_Auth;
    access_token: string;
    access_token_expires: Date;
    constructor(auth: Sharefile_Api_Auth);
    get apiPath(): string;
    _req(path: string, method: Method, body?: {}, query?: {}): Promise<any>;
    get get(): (path: string, params: object) => Promise<any>;
    get post(): (path: string, body: object, params?: object) => Promise<any>;
    get patch(): (path: string, body: object, params?: object) => Promise<any>;
    getToken(): Promise<string>;
    authenticate(): Promise<string>;
    get isTokenExpired(): boolean;
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

declare class SharefileItem {
    #private;
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
    Creator: ShareFileAPIModels.User | undefined;
    /**
     * Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
     */
    Parent: {
        Id: string;
    };
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
    constructor(body: ShareFileAPIModels.Item, http: SharefileHTTP, api: ShareFileAPI);
    /**
     *
     *
     * @param {boolean} [redirect=false] Redirect to download link if set to true (default), or return a DownloadSpecification if set to false
     * @param {boolean} [includeAllVersions=false] For folder downloads only, includes old versions of files in the folder in the zip when true, current versions only when false (default)
     * @param {boolean} [includeDeleted=false] For FINRA or other archive enabled account only, Super User can set includeDelete=true to download archived item. The default value of includeDeleted is false
     * @return {DownloadSpecification|string} the download link or DownloadSpecification for the this item.
     * @memberof SharefileItem
     */
    download(redirect?: boolean, includeAllVersions?: boolean, includeDeleted?: boolean): Promise<any>;
    /**
     * Updates an Item object. Please note that for a Folder, the Name and FileName properties must be consistent.
     * If a new Name is provided, the FileName will also be updated with the new name, and viceversa.
     * If both Name and FileName are provided, FileName is disregarded and Name will be used to update both properties.
     *
     * Note: the parameters listed in the body of the request are the only parameters that can be updated through this call.
     * @param {boolean} overwrite
     */
    updateItem(ops: SharefileNodeAPI.Items.UpdateItemOps_Body): Promise<this>;
    rename(newValue: string): Promise<this>;
    /**
     * Moves an item to a new parent
     *
     * @param {string} parentIdorPath
     * - If a path, makes an extra call to determine the ID of the parent before performing the move.
     * @memberof SharefileItem
     */
    move(parentIdorPath: string): Promise<this>;
    /** DEPRECATED use getParent() */
    parent(): Promise<SharefileItem>;
    getParent(): Promise<SharefileItem>;
    /**
     * Handler for the Children navigation property of a given Item. A 302 redirection is returned if the folder is a SymbolicLink. The redirection will enumerate the children of the remote connector
     *
     * @return {SharefileItem[]} the list of children under the given object ID
     * @memberof SharefileItem
     */
    children(includeDeleted?: boolean): Promise<SharefileItem[]>;
    get token(): string;
    set token(x: string);
    /**
     * Gets first Child based on a given property.
     */
    childBy(propName: keyof SharefileItem, propVal: any, includeDeleted?: boolean): Promise<SharefileItem | undefined>;
    upload(contents: string | Buffer, filename: string): Promise<SharefileItem | undefined>;
}

declare class ShareFileAPI {
    #private;
    constructor(auth: Sharefile_Api_Auth);
    connect(): Promise<string>;
    /**
     * Takes an Item ID and returns a single Item.
     *
     * Special Id's: [home, favorites, allshared, connectors, box, top]
     *
     * > home - Return home folder.
     *
     * > favorites - Return parent favorite item; ex: .../Items(favorites)/Children to get the favorite folders.
     *
     * > allshared - Return parent Shared Folders item; ex: .../Items(allshared)/Children to get the shared folders.
     *
     * > connectors - Return parent Connectors item; ex: .../Items(connectors)/Children to get indiviual connectors.
     *
     * > box - Return the FileBox folder.
     *
     * > top - Returns the Top item; ex: .../Items(top)/Children to get the home, favorites, and shared folders as well as the connectors
     *
     * @param {string} id
     * @param {string} queryParams
     * @memberof ShareFileAPI
     */
    items(id?: string, queryParams?: any): Promise<SharefileItem>;
    /**
     * Retrieves an item from its path.
     *
     * The path is of format /foldername/foldername/filename
     *
     * This call may redirect the client to another API provider, if the path contains a symbolic link.
     * @param {string} path -  ex: "/Shared Folders/Some Other Folder/somefile.ext"
     * @memberof ShareFileAPI
     */
    itemsByPath(path: string): Promise<SharefileItem>;
}

export { ShareFileAPI, ShareFileAPI as default };
