"use strict";
const axios = require("axios");
const {SharefileItem} = require('./models/index.js')

/**
 * @typedef SharefileAuth
 * @property {string} subdomain
 * @property {string} username
 * @property {string} password
 * @property {string} clientId
 * @property {string} clientSecret
 */

/**
 *
 *
 * @class ShareFileAPI
 */
class ShareFileAPI {
/**
 * Creates an instance of ShareFileAPI.
 * @param {SharefileAuth} auth
 * @memberof ShareFileAPI
 */
constructor(auth){
    const requiredProps = ['subdomain','username','password','clientId','clientSecret'];
      requiredProps.forEach(prop=>{
        if(!auth[prop] || auth[prop] === ''){
          throw Error(`Prop [${prop}] is required`)
        }
      })
      this.auth = auth;
  }

  get apiPath(){
    return `https://${this.auth.subdomain}.sf-api.com/sf/v3`
  }

  async getHttpConfig(){
    let accessToken = this.access_token
    if(!this.access_token){
      accessToken = await this.authenticate()
    }
    return {
      headers: {
        authorization: "Bearer " + accessToken,
      },
    };
  }

  /**
   * Authenticates API with Sharefile.
   *
   * @return {string} Returns token as string
   * @memberof ShareFileAPI
   */
  authenticate() {

      const config = `grant_type=password&username=${this.auth.username}&password=${this.auth.password}&client_id=${this.auth.clientId}&client_secret=${this.auth.clientSecret}`;

      return axios
        .post(`https://${this.auth.subdomain}.sharefile.com/oauth/token`, config, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          this.access_token = result.data.access_token;
          return result.data.access_token
        })
        .catch(err => {
          throw err
        });
  
  }

/**
 * Returns a single Item. 
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
 * @return {Promise<SharefileItem>}
 * @memberof ShareFileAPI
 */
async items(id) {
  const httpConfig = await this.getHttpConfig();

    const basePath = `${this.apiPath}/Items`;
    const idPath = id ? `(${id})` : "";
    return axios
      .get(basePath + idPath, httpConfig)
      .then(({data}) => {
        return new SharefileItem(data, httpConfig)
      })
      .catch((err) => {
        throw err;
      });
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
async itemsByPath(path){
  const httpConfig = await this.getHttpConfig();

    const uri = `${this.apiPath}/Items/ByPath?path=${path}`;
    return axios
      .get(uri, httpConfig)
      .then(({data}) => {
        return new SharefileItem(data, httpConfig)
      })
      .catch((err) => {
        throw err;
      });
  }
}




module.exports = {ShareFileAPI};
