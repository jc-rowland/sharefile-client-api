import creds from "./secrets/auth.js";



const credentials = {
  good: {
    subdomain         : creds.subdomain,
    username    : creds.username,
    password    : creds.password,
    clientId    : creds.clientId,
    clientSecret: creds.clientSecret,
  },
  badUsername: {
    subdomain         : creds.subdomain,
    username    : "FAKEFAKEFAKE",
    password    : creds.password,
    clientId    : creds.clientId,
    clientSecret: creds.clientSecret,
  },
  badPassword: {
    subdomain         : creds.subdomain,
    username    : creds.username,
    password    : "FAKEFAKEFAKE",
    clientId    : creds.clientId,
    clientSecret: creds.clientSecret,
  },
  badClientId: {
    subdomain         : creds.subdomain,
    username    : creds.username,
    password    : creds.password,
    clientId    : "FAKEFAKEFAKE",
    clientSecret: creds.clientSecret,
  },
  badSecret: {
    subdomain         : creds.subdomain,
    username    : creds.username,
    password    : creds.password,
    clientId    : creds.clientId,
    clientSecret: "FAKEFAKEFAKE",
  },
};

export default credentials;
