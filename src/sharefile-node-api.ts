import axios, { AxiosError }  from 'axios'
import querystring            from 'querystring';
import SharefileItem          from './models/item'

interface Sharefile_Api_Auth {
  subdomain   : String;
  username    : String;
  password    : String;
  clientId    : String;
  clientSecret: String;
}

declare interface Sharefile_Login_Response {
  data: {
    access_token: string; // Returns an access code or access token, depending on which was requested.
    state: string; // The optional value that was passed to the authorization page.
    subdomain: string; // The user’s ShareFile subdomain, i.e. if they access their ShareFile account through https://mycompany.sharefile.com , this value would return “mycompany”. Some username / password combinations may be active on multiple accounts. The user would need to choose an account in this case.
    apicp: string; // The user's ShareFile API control plane, i.e. sharefile.com, securevdr.com, etc.
    appcp: string; // The user's ShareFile account control plane, i.e. sharefile.com, securevdr.com, etc.
    expires_in: number; // The expiration time in seconds.
    h: string; // A SHA-256 HMAC digest of the path and query string signed with your client secret for validation that the values came from ShareFile.
  };
}

class ShareFileAPI {
auth:Sharefile_Api_Auth;
access_token:string;

constructor(auth:Sharefile_Api_Auth){
      this.auth = auth;
      this.access_token = ""
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
        .then((result:Sharefile_Login_Response) => {
          this.access_token = result.data.access_token;
          return result.data.access_token
        })
        .catch((err:AxiosError) => {
          throw err
        });
  
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
async items(id:string,queryParams:any =null) {

  const httpConfig = await this.getHttpConfig();

    const basePath = `${this.apiPath}/Items`;
    const idPath = id ? `(${id})` : "";
    const query = queryParams?'?'+querystring.stringify(queryParams):''
    return axios
      .get(basePath + idPath + query, httpConfig)
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
async itemsByPath(path:string){
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

export default ShareFileAPI;
