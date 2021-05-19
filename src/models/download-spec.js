"use strict";

/**
 *
 *
 * @class DownloadSpecification
 */
class DownloadSpecification {
  constructor(
    values = {
      DownloadToken: "",
      DownloadUrl: "",
      DownloadPrepStatusURL: "",
      "odata.metadata": "",
      "odata.type": "",
    }
  ) {
    this.token = values.DownloadToken;
    this.url = values.DownloadUrl;
    this.prepStatus = values.DownloadPrepStatusURL;
    this.odata = {};
    this.odata.metadata = values["odata.metadata"];
    this.odata.type = values["odata.type"];
  }
}

module.exports = DownloadSpecification