"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ShareFileAPI: () => ShareFileAPI,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/models/upload-spec.ts
var import_detect_content_type = __toESM(require("detect-content-type"));
var import_https = __toESM(require("https"));
var import_url = __toESM(require("url"));

// src/models/api-element.ts
var SharefileClientAPIElement = class {
  _http;
  _api;
  "odata.metadata";
  "odata.type";
  "url";
  constructor(http, api) {
    this._http = http;
    this._api = api;
  }
};

// src/models/upload-spec.ts
var UploadSpecification = class extends SharefileClientAPIElement {
  Method;
  ChunkUri;
  ProgressData;
  IsResume;
  ResumeIndex;
  ResumeOffset;
  ResumeFileHash;
  MaxNumberOfThreads;
  CanAcceptParamsInHeaders;
  constructor(values, http, api) {
    super(http, api);
    this.Method = values.Method;
    this.ChunkUri = values.ChunkUri;
    this.ProgressData = values.ProgressData;
    this.IsResume = values.IsResume;
    this.ResumeIndex = values.ResumeIndex;
    this.ResumeOffset = values.ResumeOffset;
    this.ResumeFileHash = values.ResumeFileHash;
    this.MaxNumberOfThreads = values.MaxNumberOfThreads;
    this.CanAcceptParamsInHeaders = values.CanAcceptParamsInHeaders;
  }
  get sendOptions() {
    const chunkURL = new import_url.default.URL(this.ChunkUri);
    return {
      path: chunkURL.href,
      hostname: chunkURL.hostname,
      method: "POST",
      port: "443"
    };
  }
  /**
   *
   *
   * @param {String|Buffer} contents
   * @return {*}
   * @memberof UploadSpecification
   */
  async upload(contents) {
    if (!Buffer.isBuffer(contents)) {
      contents = Buffer.from(contents);
    }
    return new Promise((resolve, reject) => {
      const ops = {
        ...this.sendOptions,
        headers: {
          "Content-Type": (0, import_detect_content_type.default)(Buffer.from(contents)),
          "Content-Length": contents.length
        }
      };
      const sfRequest = import_https.default.request(ops, function(response) {
        response.setEncoding("utf8");
        response.on("data", resolve);
        response.on("error", reject);
      });
      sfRequest.on("error", reject);
      sfRequest.write(contents);
      sfRequest.end();
    });
  }
};
var upload_spec_default = UploadSpecification;

// src/models/download-spec.ts
var import_https2 = __toESM(require("https"));
var DownloadSpecification = class extends SharefileClientAPIElement {
  token = "";
  url = "";
  prepStatus = "";
  odata = {
    metadata: "",
    type: ""
  };
  constructor(x, http, api) {
    super(http, api);
    this.token = x.DownloadToken;
    this.url = x.DownloadUrl;
    this.prepStatus = x.DownloadPrepStatusURL;
    this.odata = {
      metadata: x["odata.metadata"],
      type: x["odata.type"]
    };
  }
  /**
   * Checks the preparation status of the download.
   * @returns {Promise<boolean>} True if the download is ready, false otherwise.
   */
  async checkStatus() {
    if (!this.prepStatus) {
      return true;
    }
    try {
      return await this._http.get(this.prepStatus);
    } catch (error) {
      console.error("Error checking download status:", error);
      return false;
    }
  }
  /**
   * Initiates the file download.
   * @returns {DownloadChain} A chainable object with toBuffer and toStream methods.
   */
  download() {
    return new DownloadChain(this.url, this.token);
  }
  /**
   * Waits for the download to be ready and then initiates the download.
   * @param {number} [maxAttempts=10] - Maximum number of status check attempts.
   * @param {number} [interval=1000] - Interval between status checks in milliseconds.
   * @returns {Promise<DownloadChain>} A chainable object with toBuffer and toStream methods.
   */
  async waitAndDownload(maxAttempts = 10, interval = 2e3) {
    for (let i = 0; i < maxAttempts; i++) {
      if (await this.checkStatus()) {
        return this.download();
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error("Download preparation timed out");
  }
};
var DownloadChain = class {
  url;
  token;
  constructor(url2, token) {
    this.url = url2;
    this.token = token;
  }
  makeRequest() {
    return new Promise((resolve, reject) => {
      const options = {
        headers: { "Authorization": `Bearer ${this.token}` }
      };
      import_https2.default.get(this.url, options, (response) => {
        if (response.statusCode === 200) {
          resolve(response);
        } else {
          reject(new Error(`HTTP Error: ${response.statusCode}`));
        }
      }).on("error", reject);
    });
  }
  async toBuffer() {
    const response = await this.makeRequest();
    return new Promise((resolve, reject) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
  }
  async toStream() {
    const response = await this.makeRequest();
    return response;
  }
};

// src/utils/id-or-path.ts
function idOrPath(str) {
  return str.split("-").length === 5 ? "id" : "path";
}

// src/models/item.ts
var SharefileItem = class _SharefileItem extends SharefileClientAPIElement {
  /**
   * Item Unique ID.
   * @type {string}
   */
  id;
  /**
   * Item Name.
   * @type {string}
   */
  Name;
  Hash;
  /**
   * Item File Name. ShareFile allows Items to have different Display and File names:
   * display names are shown during client navigation, while file names are used when the item is downloaded.
   * @type {string}
   */
  FileName;
  /**
   * User that Created this Item.
   */
  Creator;
  /**
   * Parent container of the Item. A container is usually a Folder object, with a few exceptions - the "Account" is the container of top-level folders.
   */
  Parent;
  /**
   * List of Access Controls for this Item. This is not the effective ACL on the Item, just the ACLs directly attached to this Item. Use the "Info" reference to retrieve effective ACL.
   */
  AccessControls;
  /**
   * The Storage Zone that contains this Item.
   */
  Zone;
  /**
   * Item Creation Date.
   */
  CreationDate;
  /**
   * The last modified date of this item and all of its children, recursively.
   * This parameter is not supported in all ShareFile providers - it is always set in sharefile.com hosting, but not in some StorageZone connectors. The Capability object of the provider indicates whether the provider supports this field or not.
   */
  ProgenyEditDate;
  /**
   * Client device filesystem Created Date of this Item.
   */
  ClientCreatedDate;
  /**
   * Client device filesystem last Modified Date of this Item.
   */
  ClientModifiedDate;
  /**
   * Defines the Retention Policy for this Item. After this date, the item is automatically moved to recycle bin.
   */
  ExpirationDate;
  /**
   * Item description.
   */
  Description;
  /**
   * Disk space limit for the Item. Define the maximum amount of bytes that this container can hold at any given time.
   */
  DiskSpaceLimit;
  /**
   * Defines whether the Item has a 'hidden' flag.
   */
  IsHidden;
  /**
   * Bandwidth limit for the Item. Define the maximum amount of bytes that can be added and retrieved from this item.
   */
  BandwidthLimitInMB;
  /**
   * User Owner of this Item.
   */
  Owner;
  /**
   * ShareFile Account containing this item.
   */
  Account;
  /**
   * Item size in Kilobytes. For containers, this field includes all children sizes, recursively.
   */
  FileSizeInKB;
  /**
   * Contains an ItemID path, separated by /, from the virtual root to this given file. Example /accountID/folderID/folderID/itemID.
   */
  Path;
  /**
   * First name of the user that created this item.
   */
  CreatorFirstName;
  /**
   * Last name of the user that created this item.
   */
  CreatorLastName;
  /**
   * Amount of days until this item expires (see ExpirationDate).
   */
  ExpirationDays;
  /**
   * Item size in bytes. For containers, this field will include all children sizes, recursively.
   */
  FileSizeBytes;
  /**
   * Indicates whether a preview image is available for this Item. ShareFile.com always creates previews for known file types, although there is a delay from the file creation until the preview is available. Some Storage Zones Providers do not create previews, depending on version and deployment options. Previews are not created for unknown file types.
   */
  PreviewStatus;
  /**
   * Indicates a list of PreviewPlatforms supported for this item.
   */
  PreviewPlatformsSupported;
  /**
   * Indicates a list of EditingPlatforms supported for this item.
   */
  EditingPlatformsSupported;
  /**
   * Indicates that the Item is pending for removal. At the next execution of the Cleanup process, the data blob associated with this item will be removed. This parameter is not used for certain Storage Zone Providers. For example, in CIFS and SharePoint connectors, removals are performed immediately. The Capability "HasRecycleBin" indicates whether this field is used or not in the provider.
   */
  HasPendingDeletion;
  /**
   * Folder Template reference. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
   */
  AssociatedFolderTemplateID;
  /**
   * Indicates whether the item is owned by a Folder Template. If set, it indicates that this Item was created from a Folder Template. Modifications to the folder template are propagated to the associated items. The Capability FolderTemplate indicates whether the provider supports Folder Templates.
   */
  IsTemplateOwned;
  /**
   * Identifier for the Item stream. An Item represents a single version of a file system object. The stream identifies all versions of the same file system object. For example, when users upload or modify an existing file, a new Item is created with the same StreamID. All Item enumerations return only the latest version of a given stream. You can access the previous versions of a file using the StreamID reference.
   */
  StreamID;
  /**
   * Short version of the item's creator's name. E.g., J. Doe.
   */
  CreatorNameShort;
  /**
   * Specifies whether there are other versions of this item. Not all providers support file versioning. The Capability FileVersioning indicates whether the provider supports file versions.
   */
  HasMultipleVersions;
  /**
   * Specifies whether or not an Item has a pending async operation.
   */
  HasPendingAsyncOp;
  /**
   * Bitmask of operations allowed on a given Item. More granular (and often accurate, as it takes into account capabilities, account settings, file lock status, etc.) than what's on ItemInfo object.
   */
  ItemOperations;
  /**
   * List of custom metadata objects associated with this item.
   */
  Metadata;
  /**
   * List of external statuses associated with this Item.
   */
  Statuses;
  /**
   * Favorite item object associated with the item.
   */
  Favorite;
  /**
   * Item Path using Folder names.
   */
  SemanticPath;
  url;
  /**
   * Creates an instance of SharefileItem.
   * @param {ShareFileAPIModels.Item} body - The response body from ShareFile API representing an Item.
   * @param {SharefileHTTP} http - SharefileHTTP instance used for making HTTP requests.
   * @param {ShareFileAPI} api - ShareFileAPI instance for additional operations.
   */
  constructor(body, http, api) {
    super(http, api);
    this.id = body.Id;
    this.Name = body.Name;
    this.Hash = body.Hash;
    this.FileName = body.FileName;
    this.Creator = body.Creator;
    this.Parent = body.Parent;
    this.AccessControls = body.AccessControls;
    this.Zone = body.Zone;
    this.CreationDate = body.CreationDate;
    this.ProgenyEditDate = body.ProgenyEditDate;
    this.ClientCreatedDate = body.ClientCreatedDate;
    this.ClientModifiedDate = body.ClientModifiedDate;
    this.ExpirationDate = body.ExpirationDate;
    this.Description = body.Description;
    this.DiskSpaceLimit = body.DiskSpaceLimit;
    this.IsHidden = body.IsHidden;
    this.BandwidthLimitInMB = body.BandwidthLimitInMB;
    this.Owner = body.Owner;
    this.Account = body.Account;
    this.FileSizeInKB = body.FileSizeInKB;
    this.Path = body.Path;
    this.CreatorFirstName = body.CreatorFirstName;
    this.CreatorLastName = body.CreatorLastName;
    this.ExpirationDays = body.ExpirationDays;
    this.FileSizeBytes = body.FileSizeBytes;
    this.HasPendingDeletion = body.HasPendingDeletion;
    this.AssociatedFolderTemplateID = body.AssociatedFolderTemplateID;
    this.IsTemplateOwned = body.IsTemplateOwned;
    this.StreamID = body.StreamID;
    this.CreatorNameShort = body.CreatorNameShort;
    this.HasMultipleVersions = body.HasMultipleVersions;
    this.HasPendingAsyncOp = body.HasPendingAsyncOp;
    this.Metadata = body.Metadata;
    this.Favorite = body.Favorite;
    this.SemanticPath = body.SemanticPath;
    this.url = `Items(${this.id})/`;
  }
  /**
   * Downloads the item.
   * @param redirect - Whether to redirect to the download link.
   * @param includeAllVersions - For folder downloads, includes old versions of files when true.
   * @param includeDeleted - Include archived items if true (for FINRA or other archive-enabled accounts).
   */
  async download(redirect, includeAllVersions = false, includeDeleted = false) {
    const res = await this._http.get(`${this.url}Download`, {
      redirect,
      includeAllVersions,
      includeDeleted
    });
    if (redirect) {
      return res;
    } else {
      return new DownloadSpecification(res, this._http, this._api);
    }
  }
  /**
   * Creates a new folder as a child of the current item.
   * @param folderName The name of the new folder
   * @param description Optional description for the new folder
   * @param overwrite If true, overwrites an existing folder with the same name
   * @returns A Promise that resolves to the newly created SharefileItem
   */
  async createFolder(folderName, description, overwrite = false) {
    const folderData = {
      Name: folderName,
      Description: description
    };
    const data = await this._http.post(`${this.url}Folder`, folderData, { overwrite });
    return new _SharefileItem(data, this._http, this._api);
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
  async updateItem(ops) {
    const item = await this._http.patch(this.url, ops);
    Object.assign(this, item);
    return this;
  }
  /**
  * Renames the item.
  * @param {string} newValue - The new name for the item.
  * @returns {Promise<SharefileItem>} The updated SharefileItem.
  */
  async rename(newValue) {
    return this.updateItem({ Name: newValue });
  }
  /**
   * Moves an item to a new parent
   *
   * @param {string} parentIdorPath
   * - If a path, makes an extra call to determine the ID of the parent before performing the move.
   * @memberof SharefileItem
   */
  async move(parentIdorPath) {
    let parentId = parentIdorPath;
    if (idOrPath(parentIdorPath) === "path") {
      parentId = await this._api.getItem(parentIdorPath).then(({ id }) => id);
    }
    return this.updateItem({ Parent: { Id: parentId } });
  }
  /** DEPRECATED use getParent() */
  async parent() {
    console.warn('[DEPRECATION NOTICE] This will be removed in the next version, please use "getParent()"');
    return this.getParent();
  }
  /**
   * Gets the parent of this item.
   * @returns {Promise<SharefileItem>} The parent SharefileItem.
   */
  async getParent() {
    const parent = await this._http.get(`${this.url}Parent`);
    return new _SharefileItem(parent, this._http, this._api);
  }
  /**
   * Gets the children of this item (if it's a folder).
   * @param {boolean} [includeDeleted=false] - Whether to include deleted items.
   * @returns {Promise<SharefileItem[]>} An array of child SharefileItems.
   */
  async children(includeDeleted = false) {
    const { value } = await this._http.get(`${this.url}Children`, { includeDeleted });
    return value.map((item) => new _SharefileItem(item, this._http, this._api));
  }
  /**
  * Gets the first child that matches the given property and value.
  * @param {keyof SharefileItem} propName - The property name to match.
  * @param {any} propVal - The value to match.
  * @param {boolean} [includeDeleted=false] - Whether to include deleted items in the search.
  * @returns {Promise<SharefileItem | undefined>} The matching SharefileItem, if found.
  */
  async childBy(propName, propVal, includeDeleted = false) {
    const children = await this.children(includeDeleted);
    return children.find((item) => item[propName] === propVal);
  }
  /**
   * Uploads a file to this item (if it's a folder).
   * @param {string | Buffer} contents - The file contents to upload.
   * @param {string} filename - The name for the uploaded file.
   * @returns {Promise<SharefileItem | undefined>} The newly created SharefileItem, if successful.
   */
  async upload(contents, filename) {
    const ops = {
      Method: "standard",
      Raw: true,
      FileName: filename
    };
    const uploadSpec = await this._http.post(`${this.url}Upload2`, ops).then((res) => new upload_spec_default(res, this._http, this._api));
    await uploadSpec.upload(contents);
    return this.childBy("FileName", filename);
  }
  /**
   * Retrieves the versions of a given Stream.
   * @param includeDeleted Specifies whether or not expired items should be included in the feed
   * @returns A Promise that resolves to the stream versions
   */
  async getStream(includeDeleted = false) {
    return this._http.get(`${this.url}Stream`, { includeDeleted }).then((res) => res);
  }
  /**
   * Removes the item
   * @param singleversion True will delete only the specified version rather than all sibling files with the same filename
   * @param forceSync True will block the operation from taking place asynchronously
   * @returns A Promise that resolves when the item is deleted
   */
  async delete(singleversion = false, forceSync = false) {
    return this._http.delete(this.url, { singleversion, forceSync }).then((res) => true);
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
  async unlock(message) {
    return this._http.post(`${this.url}CheckIn`, { message });
  }
  /**
   * Locks a file. This operation is only implemented in Sharepoint providers (/sp)
   * @returns A Promise that resolves when the file is locked
   */
  async lock() {
    return this._http.post(`${this.url}CheckOut`);
  }
  /**
   * Discards the existing lock on the file. This operation is only implemented in Sharepoint providers (/sp)
   * @returns A Promise that resolves when the lock is discarded
   */
  async discardCheckOut() {
    return this._http.post(`${this.url}DiscardCheckOut`);
  }
};

// src/http/index.ts
var import_axios = __toESM(require("axios"));
var SharefileHTTP = class {
  auth;
  access_token;
  access_token_expires;
  constructor(auth) {
    this.auth = auth;
    this.access_token = "";
    this.access_token_expires = /* @__PURE__ */ new Date(0);
  }
  get apiPath() {
    return `https://${this.auth.subdomain}.sf-api.com/sf/v3/`;
  }
  async request(path, method, body, query) {
    try {
      const { data } = await import_axios.default.request({
        url: this.apiPath + path,
        method,
        data: body,
        params: query,
        headers: {
          authorization: `Bearer ${await this.getToken()}`
        }
      });
      return data;
    } catch (error) {
      if (import_axios.default.isAxiosError(error)) {
        const axiosError = error;
        throw new Error(`API request failed: ${axiosError.message}`);
      }
      throw error;
    }
  }
  get = (path, params) => this.request(path, "GET", void 0, params);
  post = (path, body, params) => this.request(path, "POST", body, params);
  put = (path, body, params) => this.request(path, "PUT", body, params);
  patch = (path, body, params) => this.request(path, "PATCH", body, params);
  delete = (path, params) => this.request(path, "DELETE", void 0, params);
  head = (path, params) => this.request(path, "HEAD", void 0, params);
  async getToken() {
    if (!this.access_token || this.isTokenExpired) {
      return this.authenticate();
    }
    return this.access_token;
  }
  async authenticate() {
    const config = new URLSearchParams({
      grant_type: "password",
      username: this.auth.username,
      password: this.auth.password,
      client_id: this.auth.clientId,
      client_secret: this.auth.clientSecret
    });
    try {
      const { data } = await import_axios.default.post(
        `https://${this.auth.subdomain}.sharefile.com/oauth/token`,
        config.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      this.access_token = data.access_token;
      this.access_token_expires = new Date(Date.now() + data.expires_in * 1e3);
      return this.access_token;
    } catch (error) {
      if (import_axios.default.isAxiosError(error)) {
        const axiosError = error;
        throw new Error(`Authentication failed: ${axiosError.message}`);
      }
      throw error;
    }
  }
  get isTokenExpired() {
    return Date.now() >= this.access_token_expires.getTime();
  }
};

// src/models/search-results.ts
var SharefileSearchResults = class _SharefileSearchResults extends SharefileClientAPIElement {
  /**
   * Indicates whether the results are partial due to limitations or timeouts.
   */
  partialResults;
  /**
   * The collection of search result items.
   */
  results;
  /**
   * Indicates whether the search query timed out.
   */
  timedOut;
  /**
   * The total number of results found.
   */
  totalCount;
  /**
   * Creates a new instance of SharefileSearchResults.
   * 
   * @param {Object} data - The raw search results data from the API.
   * @param {SharefileHTTP} http - The HTTP client for making requests.
   * @param {ShareFileAPI} api - The ShareFile API instance.
   */
  constructor(data, http, api) {
    super(http, api);
    this.partialResults = data.PartialResults;
    this.timedOut = data.TimedOut;
    this.totalCount = data.TotalCount;
    this.results = data.Results;
  }
  /**
   * Gets a specific page of search results.
   * 
   * @param {number} pageNumber - The page number to retrieve.
   * @param {number} pageSize - The number of items per page.
   * @returns {Promise<SharefileSearchResults>} A new instance of SharefileSearchResults with the requested page of results.
   */
  async getPage(pageNumber, pageSize) {
    const skip = (pageNumber - 1) * pageSize;
    const response = await this._http.get("Items/Search", {
      $top: pageSize,
      $skip: skip
    });
    return new _SharefileSearchResults(response, this._http, this._api);
  }
  /**
   * Retrieves the full SharefileItem for each search result.
   * 
   * @returns {Promise<SharefileItem[]>} An array of full SharefileItem objects.
   */
  async getFullItems() {
    const itemPromises = this.results.map((result) => this._api.getItem(result.Item.id));
    return Promise.all(itemPromises);
  }
};
var search_results_default = SharefileSearchResults;

// src/sharefile-client-api.ts
var ShareFileAPI = class {
  _http;
  _api;
  /**
   * Creates a new instance of ShareFileAPI.
   * 
   * @param {SharefileApiAuth} auth - Authentication details for ShareFile
   */
  constructor(auth) {
    this._api = this;
    this._http = new SharefileHTTP(auth);
  }
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
  async connect() {
    return this._http.authenticate();
  }
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
  async getItem(idOrPath2) {
    try {
      const isPath = idOrPath2.includes("/");
      const endpoint = isPath ? "Items/ByPath" : `Items(${idOrPath2})`;
      const params = isPath ? { path: idOrPath2 } : void 0;
      const data = await this._http.get(endpoint, params);
      return new SharefileItem(data, this._http, this);
    } catch (error) {
      throw new Error(`Failed to retrieve item ${idOrPath2}: ${error?.message}`);
    }
  }
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
  async getFolderContents(folderId, queryParams = {}) {
    try {
      const data = await this._http.get(`Items(${folderId})/Children`, queryParams);
      return data.value.map((item) => new SharefileItem(item, this._http, this));
    } catch (error) {
      throw new Error(`Failed to retrieve folder contents: ${error?.message}`);
    }
  }
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
  async createItem(parentId, itemType, itemData) {
    try {
      const data = await this._http.post(`Items(${parentId})/${itemType}`, itemData);
      return new SharefileItem(data, this._http, this);
    } catch (error) {
      throw new Error(`Failed to create item: ${error?.message}`);
    }
  }
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
  async deleteItem(itemId) {
    try {
      await this._http.delete(`Items(${itemId})`);
    } catch (error) {
      throw new Error(`Failed to delete item: ${error?.message}`);
    }
  }
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
  async searchItems(query, searchParams = {}) {
    try {
      const data = await this._http.get("Items/Search", { ...searchParams, query });
      return new search_results_default(data, this._http, this._api);
    } catch (error) {
      throw new Error(`Search failed: ${error?.message}`);
    }
  }
  /**
   * Returns the underlying HTTP client for advanced usage.
   * 
   * @returns {SharefileHTTP} The HTTP client instance
   * 
   * @example
   * const httpClient = api.getHttpClient();
   * const customData = await httpClient.get('CustomEndpoint');
   */
  getHttpClient() {
    return this._http;
  }
  async items(id, queryParams = {}) {
    console.warn("Deprecated: The items() method is deprecated. Use getItem() instead.");
    return this.getItem(id || "");
  }
  async itemsByPath(path) {
    console.warn("Deprecated: The itemsByPath() method is deprecated. Use getItem() instead.");
    return this.getItem(path);
  }
  async createFolder(parentId, folderName) {
    console.warn("Deprecated: The createFolder() method is deprecated. Use createItem() instead.");
    return this.createItem(parentId, "Folder", { Name: folderName });
  }
};
__decorateClass([
  Deprecated("Use getItem() instead")
], ShareFileAPI.prototype, "items", 1);
__decorateClass([
  Deprecated("Use getItem() instead")
], ShareFileAPI.prototype, "itemsByPath", 1);
__decorateClass([
  Deprecated("Use createItem() instead")
], ShareFileAPI.prototype, "createFolder", 1);
function Deprecated(message) {
  return (target, propertyKey, descriptor) => {
    if (descriptor) {
      const original = descriptor.value;
      descriptor.value = function(...args) {
        console.warn(`Deprecated: ${propertyKey} is deprecated. ${message}`);
        return original.apply(this, args);
      };
    } else {
      console.warn(`Deprecated: ${propertyKey} is deprecated. ${message}`);
    }
  };
}

// src/index.ts
var src_default = ShareFileAPI;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShareFileAPI
});
//# sourceMappingURL=index.js.map