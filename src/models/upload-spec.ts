"use strict";
/**
 * @memberof ShareFile.Api.Models.UploadSpecification
 * @link https://api.sharefile.com/docs/resource?name=ShareFile.Api.Models.UploadSpecification
 */
//@ts-expect-error - no declaration
import detectContentType from "detect-content-type";
import https from "https";
import url from "url";
import SharefileClientAPIElement from "./api-element";
import SharefileHTTP from "../http";
import ShareFileAPI from "../sharefile-client-api";

interface HTTPResponse_UploadSpecification {
  Method                   : string
  ChunkUri                 : string
  ProgressData             : string
  IsResume                 : boolean
  ResumeIndex              : number
  ResumeOffset             : number
  ResumeFileHash           : string
  MaxNumberOfThreads       : number
  CanAcceptParamsInHeaders : boolean
}

class UploadSpecification extends SharefileClientAPIElement {
  readonly Method                  : string;
  readonly ChunkUri                : string;
  readonly ProgressData            : string;
  readonly IsResume                : boolean;
  readonly ResumeIndex             : number;
  readonly ResumeOffset            : number;
  readonly ResumeFileHash          : string;
  readonly MaxNumberOfThreads      : number;
  readonly CanAcceptParamsInHeaders: boolean;

  constructor(
    values :HTTPResponse_UploadSpecification,
    http:SharefileHTTP,api:ShareFileAPI
  ) {
    super(http,api)
    this.Method                   = values.Method;
    this.ChunkUri                 = values.ChunkUri;
    this.ProgressData             = values.ProgressData;
    this.IsResume                 = values.IsResume;
    this.ResumeIndex              = values.ResumeIndex;
    this.ResumeOffset             = values.ResumeOffset;
    this.ResumeFileHash           = values.ResumeFileHash;
    this.MaxNumberOfThreads       = values.MaxNumberOfThreads;
    this.CanAcceptParamsInHeaders = values.CanAcceptParamsInHeaders;
  }

  get sendOptions() {
    const chunkURL = new url.URL(this.ChunkUri);

    return {
      path: chunkURL.href,
      hostname: chunkURL.hostname,
      method: "POST",
      port: "443",
    };
  }

  /**
   *
   *
   * @param {String|Buffer} contents
   * @return {*}
   * @memberof UploadSpecification
   */
  async upload(contents:string|Buffer) {
    if (!Buffer.isBuffer(contents)) {
      contents = Buffer.from(contents);
    }

    return new Promise((resolve, reject) => {
      const ops = {
        ...this.sendOptions,
        headers: {
          "Content-Type": detectContentType(Buffer.from(contents)),
          "Content-Length": contents.length,
        },
      };

      const sfRequest = https.request(ops, function (response:any) {
        response.setEncoding("utf8");
        response.on("data" , resolve);
        response.on("error", reject);
      });
      sfRequest.on("error", reject);
      sfRequest.write(contents);
      sfRequest.end();
    });
  }

  
}

export default  UploadSpecification;
