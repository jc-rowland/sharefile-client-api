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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ShareFileAPI: () => sharefile_node_api_default,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/models/upload-spec.ts
var detectContentType = require("detect-content-type");
var https = require("https");
var url = require("url");
var UploadSpecification = class {
  Method;
  ChunkUri;
  ProgressData;
  IsResume;
  ResumeIndex;
  ResumeOffset;
  ResumeFileHash;
  MaxNumberOfThreads;
  CanAcceptParamsInHeaders;
  constructor(values) {
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
    const chunkURL = new url.URL(this.ChunkUri);
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
          "Content-Type": detectContentType(Buffer.from(contents)),
          "Content-Length": contents.length
        }
      };
      const sfRequest = https.request(ops, function(response) {
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
var DownloadSpecification = class {
  token = "";
  url = "";
  prepStatus = "";
  odata = {
    metadata: "",
    type: ""
  };
  constructor(x) {
    this.token = x.DownloadToken;
    this.url = x.DownloadUrl;
    this.prepStatus = x.DownloadPrepStatusURL;
    this.odata = {
      metadata: x["odata.metadata"],
      type: x["odata.type"]
    };
  }
};
var download_spec_default = DownloadSpecification;

// src/utils/id-or-path.ts
function idOrPath(str) {
  return str.split("-").length === 5 ? "id" : "path";
}

// src/models/item.ts
var SharefileItem = class _SharefileItem {
  #http;
  #api;
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
   */
  constructor(body, http, api) {
    this.#http = http;
    this.#api = api;
    this.id = body.Id;
    this.Name = body.Name;
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
   *
   *
   * @param {boolean} [redirect=false] Redirect to download link if set to true (default), or return a DownloadSpecification if set to false
   * @param {boolean} [includeAllVersions=false] For folder downloads only, includes old versions of files in the folder in the zip when true, current versions only when false (default)
   * @param {boolean} [includeDeleted=false] For FINRA or other archive enabled account only, Super User can set includeDelete=true to download archived item. The default value of includeDeleted is false
   * @return {DownloadSpecification|string} the download link or DownloadSpecification for the this item.
   * @memberof SharefileItem
   */
  async download(redirect = false, includeAllVersions = false, includeDeleted = false) {
    return this.#http.get(
      this.url + `Download`,
      { redirect, includeAllVersions, includeDeleted }
    ).then((res) => {
      if (redirect) {
        return res;
      } else {
        return new download_spec_default(res.data);
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
  async updateItem(ops) {
    return this.#http.patch(this.url, ops).then((item) => {
      this.Name = item.Name;
      this.FileName = item.FileName;
      this.Description = item.Description;
      this.ExpirationDate = item.ExpirationDate;
      this.Parent.Id = item.Parent.Id;
      return this;
    });
  }
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
      parentId = await this.#api.itemsByPath(parentIdorPath).then(({ id }) => id);
    }
    return this.updateItem({ Parent: { Id: parentId } });
  }
  /** DEPRECATED use getParent() */
  async parent() {
    console.warn('[DEPRECATION NOTICE] The SharefileItem "parent()" method is DEPRECATED, please use "getParent()"');
    return this.getParent();
  }
  async getParent() {
    return this.#http.get(this.url + `Parent`, {}).then((parent) => new _SharefileItem(parent, this.#http, this.#api));
  }
  /**
   * Handler for the Children navigation property of a given Item. A 302 redirection is returned if the folder is a SymbolicLink. The redirection will enumerate the children of the remote connector
   *
   * @return {SharefileItem[]} the list of children under the given object ID
   * @memberof SharefileItem
   */
  async children(includeDeleted = false) {
    return this.#http.get(this.url + `Children`, { includeDeleted }).then(
      ({ value }) => {
        return value.map((item) => new _SharefileItem(item, this.#http, this.#api));
      }
    );
  }
  get token() {
    return this.#http.access_token;
  }
  set token(x) {
    this.#http.access_token = x;
  }
  /**
   * Gets first Child based on a given property.
   */
  async childBy(propName, propVal, includeDeleted = false) {
    return this.children(includeDeleted).then((list) => {
      return list.find((item) => item[propName] === propVal);
    });
  }
  async upload(contents, filename) {
    const ops = {
      Method: "standard",
      Raw: true,
      FileName: filename
    };
    const url2 = this.url + `/Upload2`;
    const uploadSpec = await this.#http.post(url2, ops).then((data) => new upload_spec_default(data));
    return await uploadSpec.upload(contents).then(async () => this.childBy("FileName", filename));
  }
};
var item_default = SharefileItem;

// src/http/index.ts
var import_axios = __toESM(require("axios"));
var SharefileHTTP = class {
  auth;
  access_token;
  access_token_expires;
  constructor(auth) {
    this.auth = auth;
    this.access_token = "";
    this.access_token_expires = /* @__PURE__ */ new Date();
  }
  get apiPath() {
    return `https://${this.auth.subdomain}.sf-api.com/sf/v3/`;
  }
  async _req(path, method, body = {}, query = {}) {
    return await import_axios.default.request({
      url: this.apiPath + path,
      method,
      data: body,
      params: query,
      headers: {
        authorization: "Bearer " + await this.getToken()
      }
    }).then(({ data }) => data).catch((err) => err);
  }
  get get() {
    return (path, params) => this._req(path, "GET", void 0, params);
  }
  get post() {
    return (path, body, params) => this._req(path, "POST", body, params);
  }
  get patch() {
    return (path, body, params) => this._req(path, "PATCH", body, params);
  }
  async getToken() {
    if (!this.access_token || this.isTokenExpired) {
      return this.authenticate();
    } else {
      return this.access_token;
    }
  }
  authenticate() {
    const config = `grant_type=password&username=${this.auth.username}&password=${this.auth.password}&client_id=${this.auth.clientId}&client_secret=${this.auth.clientSecret}`;
    return import_axios.default.post(
      `https://${this.auth.subdomain}.sharefile.com/oauth/token`,
      config,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    ).then((result) => {
      this.access_token = result.data.access_token;
      this.access_token_expires = new Date(
        (/* @__PURE__ */ new Date()).getTime() + result.data.expires_in
      );
      return result.data.access_token;
    });
  }
  get isTokenExpired() {
    if (!this.access_token_expires) {
      return true;
    } else {
      return /* @__PURE__ */ new Date() >= this.access_token_expires;
    }
  }
};

// src/sharefile-node-api.ts
var ShareFileAPI = class {
  #http;
  constructor(auth) {
    this.#http = new SharefileHTTP(auth);
  }
  connect() {
    return this.#http.authenticate();
  }
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
  async items(id, queryParams = null) {
    if (id && idOrPath(id) === "path") {
      return this.itemsByPath(id);
    }
    const idPath = id ? `(${id})` : "";
    return this.#http.get(`Items` + idPath, queryParams).then((data) => new item_default(data, this.#http, this));
  }
  /**
   * Retrieves an item from its path. 
   * 
   * The path is of format /foldername/foldername/filename
   * 
   * This call may redirect the client to another API provider, if the path contains a symbolic link.
   * @param {string} path -  ex: "/Shared Folders/Some Other Folder/somefile.ext"
   * @memberof ShareFileAPI
   */
  async itemsByPath(path) {
    return this.#http.get("Items/ByPath", { path }).then((data) => new item_default(data, this.#http, this));
  }
};
var sharefile_node_api_default = ShareFileAPI;

// src/index.ts
var src_default = sharefile_node_api_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShareFileAPI
});
