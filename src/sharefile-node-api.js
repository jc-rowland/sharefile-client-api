"use strict";
const axios = require("axios");
const {SharefileItem} = require('./models/index.js')
/**
 *
 *
 * @class ShareFileAPI
 */
class ShareFileAPI {
  /**
   * Authenticates API with Sharefile.
   *
   * @param {object} auth
   * @param {string} auth.subdomain
   * @param {string} auth.username
   * @param {string} auth.password
   * @param {string} auth.clientId
   * @param {string} auth.clientSecret
   * @return {ShareFileAPI} 
   * @memberof ShareFileAPI
   */
  authenticate( auth = {
    subdomain:'', username:'', password:'', clientId:'', clientSecret:''
  } ) {

    return new Promise((resolve, reject) => {

      const requiredProps = ['subdomain','username','password','clientId','clientSecret'];
      requiredProps.forEach(prop=>{
        if(auth[prop] === ''){
          throw Error(`Prop [${prop}] is required`)
        }
      })

      this.apiPath = `https://${auth.subdomain}.sf-api.com/sf/v3`;

      const config = `grant_type=password&username=${auth.username}&password=${auth.password}&client_id=${auth.clientId}&client_secret=${auth.clientSecret}`;

      axios
        .post(`https://${auth.subdomain}.sharefile.com/oauth/token`, config, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((result) => {
          this.httpConfig = {
            headers: {
              authorization: "Bearer " + result.data.access_token,
            },
          };

          this.cfg = {}
          Object.assign(this.cfg,result.data)

          resolve(this.cfg);
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.error_description) {
            reject(err.response.data.error_description);
          }else{
            reject(err);
          }
        });
    });
  
  }

  async items(id) {
    const basePath = `${this.apiPath}/Items`;
    const idPath = id ? `(${id})` : "";
    const data = await axios
      .get(basePath + idPath, this.httpConfig)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw Error(err.response);
      });
    return new SharefileItem(data, this.httpConfig);
  }
}




module.exports = ShareFileAPI;
