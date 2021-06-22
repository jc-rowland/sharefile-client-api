declare interface Sharefile_Login_Response {
  data: {
    access_token: string; // Returns an access code or access token, depending on which was requested.
    state: string; // The optional value that was passed to the authorization page.
    subdomain: string; // The user’s ShareFile subdomain, i.e. if they access their ShareFile account through https://mycompany.sharefile.com , this value would return “mycompany”. Some username / password combinations may be active on multiple accounts. The user would need to choose an account in this case.
    apicp: string; // The user's ShareFile API control plane, i.e. sharefile.com, securevdr.com, etc.
    appcp: string; // The user's ShareFile account control plane, i.e. sharefile.com, securevdr.com, etc.
    expires_in: number; // The expiration time in seconds.
    h: string; // A SHA-256 HMAC digest of the path and query string signed with your client secret for validation that the values came from ShareFile.
  };
}
