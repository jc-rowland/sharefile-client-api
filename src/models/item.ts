import DownloadSpecification from './download-spec';
import UploadSpecification from './upload-spec';
import axios from 'axios';

 class SharefileItem {
   httpConfig = {}
   url = ""
  /**
   * Creates an instance of SharefileItem.
   * @memberof SharefileItem
   */
  constructor(body: ShareFileResponse_Item, httpConfig:any) {
    /** @private */
    this.httpConfig = httpConfig;
    this.url = ""
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
      .then((res) =>
        res.data.value.map((item:ShareFileResponse_Item) => new SharefileItem(item, this.httpConfig))
      );
  
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
        res.data.value.map((item:ShareFileResponse_Item) => new SharefileItem(item, this.httpConfig))
      );
  }

  /**
   * Gets first Child based on a given property.
   */
  async childBy(propName:keyof ShareFileResponse_Item, propVal:any, includeDeleted = false) {
    const item = await this.children(includeDeleted).then((list:Array<ShareFileResponse_Item>) => {
      return list.find((item) => item[propName] === propVal);
    });
    if(!item){
      return undefined
    }else{
      return new SharefileItem(item, this.httpConfig);
    }
  }

  /**
   *
   *
   * @param     {string}  name Item Name
   * @param     {boolean} includeDeleted Specifies whether or not the list of items returned should include deleted children
   * @return    {SharefileItem} The Child object
   * @memberof  SharefileItem
   */
  async childByName(name:string, includeDeleted:boolean) {
    const item = await this.childBy("Name", name, includeDeleted);
    if(!item){
      return undefined
    }else{
      return new SharefileItem(item, this.httpConfig);
    }
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

  /**
 *
 *
 * @param {String|Buffer} contents
 * @param {String} filename
 * @return {String} 
 * @memberof SharefileItem
 */
async upload(contents,filename){
  const ops = {
    Method: "standard",
    Raw:true,
    FileName: filename
  }
  const url = this.url + `/Upload2`;

  const uploadSpec = await axios.post(url,ops,this.httpConfig).then(({data})=>new UploadSpecification(data));

  return await uploadSpec.upload(contents);
}
}

export default  SharefileItem