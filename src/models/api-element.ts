/**
 * Base class for most Sharefile elements
 * 
 */

import SharefileHTTP from "../http/index";
import ShareFileAPI from "../sharefile-client-api";

export default class SharefileClientAPIElement {
  protected _http: SharefileHTTP;
  protected _api: ShareFileAPI;
  'odata.metadata':string
  'odata.type':string
  'url'?:string

  constructor(http:SharefileHTTP,api:ShareFileAPI){
    this._http = http
    this._api = api
  }
}