"use strict";
/**
 * @memberof ShareFile.Api.Models.UploadSpecification
 * @link https://api.sharefile.com/docs/resource?name=ShareFile.Api.Models.UploadSpecification
 */
//@ts-expect-error - no declaration
import detectContentType from "detect-content-type";
import SharefileClientAPIElement from "./api-element";
import SharefileHTTP from "../http/index";
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
    values: HTTPResponse_UploadSpecification,
    http: SharefileHTTP,
    api: ShareFileAPI
  ) {
    super(http, api)
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

  /**
   * Uploads the contents to the specified ChunkUri.
   * @param {String|Buffer} contents - The content to upload.
   * @return {Promise<string>} A promise that resolves with the upload response.
   * @memberof UploadSpecification
   */
  async upload(contents: string | Buffer): Promise<string> {
    if (!Buffer.isBuffer(contents)) {
      contents = Buffer.from(contents);
    }

    const headers = {
      "Content-Type": detectContentType(contents),
      "Content-Length": contents.length.toString(),
    };

    try {
      const response = await fetch(this.ChunkUri, {
        method: "POST",
        headers: headers,
        body: contents,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }
}

export default UploadSpecification;