// const DownloadSpecification = require('./download-spec.js')
// const axios = require("axios");

/**
 * Represents a ShareFile Item: an element that can exist inside a ShareFile Folder.
 * This include Files and Folders, as well as other classes that are listed inside
 * directory structures: Links, Notes and Symbolic Links.
 **/
 class SharefileItem {
  /**
   * Creates an instance of SharefileItem.
   * @param {*} [body={}] JSON body of item as received from Sharefile
   * @param {*} httpConfig
   * @memberof SharefileItem
   */
  constructor(body = {}, httpConfig) {
    /** @private */
    this.httpConfig = httpConfig;

    Object.assign(this, body);
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
  download(
    redirect = false,
    includeAllVersions = false,
    includeDeleted = false
  ) {
    return axios
      .get(
        this.url +
          `/Download?redirect=${redirect}&includeallversions=${includeAllVersions}&includeDeleted=${includeDeleted}`,
        this.httpConfig
      )
      .then((res) => {
        if (redirect) {
          return res;
        } else {
          return new DownloadSpecification(res.data);
        }
      });
  }

  parent(){
    return axios
      .get(
        this.url + `/Items(${this.id})/Parent`,
        this.httpConfig
      )
      // .then((res) =>
      //   res.data.value.map((item) => new SharefileItem(item, this.httpConfig))
      // );
  
  }

  /**
   * Handler for the Children navigation property of a given Item. A 302 redirection is returned if the folder is a SymbolicLink. The redirection will enumerate the children of the remote connector
   *
   * @param {boolean} [includeDeleted=false] Specifies whether or not the list of items returned should include deleted children
   * @return {SharefileItem[]} the list of children under the given object ID
   * @memberof SharefileItem
   */
  children(includeDeleted = false) {
    return axios
      .get(
        this.url + `/Children?includeDeleted=${includeDeleted}`,
        this.httpConfig
      )
      .then((res) =>
        res.data.value.map((item) => new SharefileItem(item, this.httpConfig))
      );
  }

  /**
   * Gets first Child based on a given property.
   *
   * @param     {string}  [propName=""] Prop that will be searched on
   * @param     {string}  [propVal=""] Search string
   * @param     {boolean} [includeDeleted=false] Specifies whether or not the list of items returned should include deleted children
   * @return    {SharefileItem} The Child object
   * @memberof  SharefileItem
   */
  async childBy(propName = "", propVal = "", includeDeleted = false) {
    const item = await this.children(includeDeleted).then((list) => {
      return list.find((item) => item[propName] === propVal);
    });
    return new SharefileItem(item, this.httpConfig);
  }

  /**
   *
   *
   * @param     {string}  name Item Name
   * @param     {boolean} includeDeleted Specifies whether or not the list of items returned should include deleted children
   * @return    {SharefileItem} The Child object
   * @memberof  SharefileItem
   */
  async childByName(name, includeDeleted) {
    const item = await this.childBy("Name", name, includeDeleted);
    return new SharefileItem(item, this.httpConfig);
  }

  /**
   *
   *
   * @param {String} id Item identifier
   * @param {Boolean} includeDeleted Specifies whether or not the list of items returned should include deleted children
   * @return {SharefileItem} The Child object
   * @memberof SharefileItem
   */
  async childById(id, includeDeleted) {
    const item = await this.childBy("Id", id, includeDeleted);
    return new SharefileItem(item, this.httpConfig);
  }
}

module.exports = SharefileItem