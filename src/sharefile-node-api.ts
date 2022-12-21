import SharefileItem          from './models/item';
import {ShareFileResponse} from './types/sharefileresponse';
import SharefileHTTP,{Sharefile_Api_Auth} from './http'

class ShareFileAPI{
  #http:SharefileHTTP

constructor(auth:Sharefile_Api_Auth){
    this.#http = new SharefileHTTP(auth)
  }

  connect(){
    return this.#http.authenticate()
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
 * @return {Promise<SharefileItem>}
 * @memberof ShareFileAPI
 */
async items(id?:string,queryParams:any=null) {
  const idPath = id ? `(${id})` : "";
  return this.#http.get(`Items` + idPath,queryParams)
    .then((data:ShareFileResponse.Item)=>new SharefileItem(data, this.#http))
  }

/**
 * Retrieves an item from its path. 
 * 
 * The path is of format /foldername/foldername/filename
 * 
 * This call may redirect the client to another API provider, if the path contains a symbolic link.
 *
 * @param {string} path -  ex: "/Shared Folders/Some Other Folder/somefile.ext"
 * @return {Promise<SharefileItem>}
 * @memberof ShareFileAPI
 */
async itemsByPath(path:string){
  return this.#http.get('Items/ByPath',{path})
    .then((data:ShareFileResponse.Item)=>new SharefileItem(data, this.#http))
  }
}

export default ShareFileAPI;
