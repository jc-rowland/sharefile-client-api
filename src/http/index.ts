import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
import { ShareFileResponse } from "../types/sharefileresponse";

export interface Sharefile_Api_Auth {
  subdomain: String;
  username: String;
  password: String;
  clientId: String;
  clientSecret: String;
}

export default class SharefileHTTP {
  auth: Sharefile_Api_Auth;
  access_token: string;
  access_token_expires: Date;
  constructor(auth: Sharefile_Api_Auth) {
    this.auth = auth;
    this.access_token = "";
    this.access_token_expires = new Date();
  }

  get apiPath() {
    return `https://${this.auth.subdomain}.sf-api.com/sf/v3/`;
  }

  async _req(
    path: string,
    method: Method,
    body  = {},
    query = {}
  ) {
    return await axios
      .request({
        url: this.apiPath + path,
        method: method,
        data: body,
        params: query,
        headers: {
          authorization: "Bearer " + (await this.getToken()),
        },
      })
      .then(({ data }) => data)
      .catch((err) => err);
  }

  get get(){
    return (path:string,params:object)=>this._req(path,'GET',undefined,params)
  }
  get post(){
    return (path:string,body:object,params?:object)=>this._req(path,'POST',body,params)
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
    return axios
      .post(
        `https://${this.auth.subdomain}.sharefile.com/oauth/token`,
        config,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((result: AxiosResponse<ShareFileResponse.Login>) => {
        this.access_token = result.data.access_token;
        this.access_token_expires = new Date(
          new Date().getTime() + result.data.expires_in
        );
        return result.data.access_token;
      });
  }

  get isTokenExpired() {
    if (!this.access_token_expires) {
      return true;
    } else {
      return new Date() >= this.access_token_expires;
    }
  }
}
