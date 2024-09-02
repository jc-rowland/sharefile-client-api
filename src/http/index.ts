import { ShareFileResponse } from "../types/sharefileresponse";

export interface SharefileApiAuth {
  subdomain: string;
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
}

export default class SharefileHTTP {
  private auth: SharefileApiAuth;
  private access_token: string;
  private access_token_expires: Date;

  constructor(auth: SharefileApiAuth) {
    this.auth = auth;
    this.access_token = "";
    this.access_token_expires = new Date(0);
  }

  private get apiPath(): string {
    return `https://${this.auth.subdomain}.sf-api.com/sf/v3/`;
  }

  private async safeJsonParse(response: Response): Promise<any> {
    const text = await response.text();
    if (!text) {
      return null;
    }
    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn('Failed to parse response as JSON:', text);
      return text;
    }
  }

  private async request<T>(
    path: string,
    method: string,
    body?: Record<string, any>,
    query?: Record<string, any>
  ): Promise<T> {
    const url = new URL(this.apiPath + path);
    if (query) {
      Object.entries(query).forEach(([key, value]) => 
        url.searchParams.append(key, value.toString())
      );
    }

    try {
      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Authorization': `Bearer ${await this.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        const errorBody = await this.safeJsonParse(response);
        throw new Error(`API request failed: ${response.statusText}${errorBody ? ` - ${JSON.stringify(errorBody)}` : ''}`);
      }

      return await this.safeJsonParse(response) as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      }
      throw error;
    }
  }

  get = <T>(path: string, params?: Record<string, any>): Promise<T> =>
    this.request<T>(path, 'GET', undefined, params);

  post = <T>(path: string, body?: Record<string, any>, params?: Record<string, any>): Promise<T> =>
    this.request<T>(path, 'POST', body, params);

  put = <T>(path: string, body?: Record<string, any>, params?: Record<string, any>): Promise<T> =>
    this.request<T>(path, 'PUT', body, params);

  patch = <T>(path: string, body?: Record<string, any>, params?: Record<string, any>): Promise<T> =>
    this.request<T>(path, 'PATCH', body, params);

  delete = <T>(path: string, params?: Record<string, any>): Promise<T> =>
    this.request<T>(path, 'DELETE', undefined, params);

  head = <T>(path: string, params?: Record<string, any>): Promise<T> =>
    this.request<T>(path, 'HEAD', undefined, params);

  private async getToken(): Promise<string> {
    if (!this.access_token || this.isTokenExpired) {
      return this.authenticate();
    }
    return this.access_token;
  }

  async authenticate(): Promise<string> {
    const config = new URLSearchParams({
      grant_type: 'password',
      username: this.auth.username,
      password: this.auth.password,
      client_id: this.auth.clientId,
      client_secret: this.auth.clientSecret,
    });

    try {
      const response = await fetch(
        `https://${this.auth.subdomain}.sharefile.com/oauth/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: config.toString(),
        }
      );

      if (!response.ok) {
        const errorBody = await this.safeJsonParse(response);
        if(errorBody.error_description){
          throw new Error(`${errorBody.error_description}`);
        } else{
          throw new Error(`Authentication failed: ${response.statusText}${errorBody ? ` - ${JSON.stringify(errorBody)}` : ''}`);
        }
      }

      const data = await this.safeJsonParse(response) as ShareFileResponse.Login;

      if (!data || !data.access_token) {
        throw new Error('Authentication failed: Invalid response data');
      }

      this.access_token = data.access_token;
      this.access_token_expires = new Date(Date.now() + data.expires_in * 1000);
      return this.access_token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Authentication failed: ${error.message}`);
      }
      throw error;
    }
  }

  private get isTokenExpired(): boolean {
    return Date.now() >= this.access_token_expires.getTime();
  }
}