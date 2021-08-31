"use strict";

interface HttpResponse_DownloadSpecification {
    DownloadToken         : string
    DownloadUrl           : string
    DownloadPrepStatusURL : string
    "odata.metadata"      : string
    "odata.type"          : string
  }


class DownloadSpecification {
  readonly token:       string  = "";
  readonly url:         string  = "";
  readonly prepStatus:  string  = "";
  readonly odata:       OData   = {
    metadata: "",
    type: ""
  };

  constructor(x : HttpResponse_DownloadSpecification) 
  {
    this.token          = x.DownloadToken;         
    this.url            = x.DownloadUrl;           
    this.prepStatus     = x.DownloadPrepStatusURL; 
    this.odata          = {
      metadata: x["odata.metadata"],
      type: x["odata.type"]
    };                           
  }
}

export default DownloadSpecification