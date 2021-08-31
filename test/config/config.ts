import creds from "./secrets/auth.js";

const BAD_STRING = "$_NOT_REAL_DATA_$"

const credentials = {
  good: {
    subdomain   : creds.subdomain,
    username    : creds.username,
    password    : creds.password,
    clientId    : creds.clientId,
    clientSecret: creds.clientSecret,
  },
  badUsername: {
    subdomain   : creds.subdomain,
    username    : BAD_STRING,
    password    : creds.password,
    clientId    : creds.clientId,
    clientSecret: creds.clientSecret,
  },
  badPassword: {
    subdomain   : creds.subdomain,
    username    : creds.username,
    password    : BAD_STRING,
    clientId    : creds.clientId,
    clientSecret: creds.clientSecret,
  },
  badClientId: {
    subdomain   : creds.subdomain,
    username    : creds.username,
    password    : creds.password,
    clientId    : BAD_STRING,
    clientSecret: creds.clientSecret,
  },
  badSecret: {
    subdomain   : creds.subdomain,
    username    : creds.username,
    password    : creds.password,
    clientId    : creds.clientId,
    clientSecret: BAD_STRING,
  },
};

export default credentials;
