"use strict";

const { axios }         = require("axios");
const detectContentType = require("detect-content-type");
const https             = require("https");
const url               = require("url");

/**
 * @typedef {Object} HTTPResponse_UploadSpecification
 * @property {String} Method
 * @property {String} ChunkUri
 * @property {String} ProgressData
 * @property {Boolean} IsResume
 * @property {Number} ResumeIndex
 * @property {Number} ResumeOffset
 * @property {String} ResumeFileHash
 * @property {Number} MaxNumberOfThreads
 * @property {Boolean} CanAcceptParamsInHeaders
 */

/**
 *
 *
 * @class UploadSpecification
 * @property {String} token
 */
class UploadSpecification {
  /**
   * Creates an instance of UploadSpecification.
   * @param {HTTPResponse_UploadSpecification} values
   * @memberof UploadSpecification
   */
  constructor(
    values = {
      Method                  : "Standard",
      ChunkUri                : "",
      ProgressData            : "",
      IsResume                : false,
      ResumeIndex             : 0,
      ResumeOffset            : 0,
      ResumeFileHash          : "",
      MaxNumberOfThreads      : 4,
      CanAcceptParamsInHeaders: false,
    }
  ) {
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
  async upload(contents) {
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

      const sfRequest = https.request(ops, function (response) {
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

module.exports = UploadSpecification;
