import axios, { AxiosError, AxiosResponse, Method } from "axios";
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

  private async request<T>(
    path: string,
    method: Method,
    body?: Record<string, any>,
    query?: Record<string, any>
  ): Promise<T> {
    try {
      const { data } = await axios.request<T>({
        url: this.apiPath + path,
        method,
        data: body,
        params: query,
        headers: {
          authorization: `Bearer ${await this.getToken()}`,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`API request failed: ${axiosError.message}`);
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
      const { data } = await axios.post<ShareFileResponse.Login>(
        `https://${this.auth.subdomain}.sharefile.com/oauth/token`,
        config.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      this.access_token = data.access_token;
      this.access_token_expires = new Date(Date.now() + data.expires_in * 1000);
      return this.access_token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Authentication failed: ${axiosError.message}`);
      }
      throw error;
    }
  }

  private get isTokenExpired(): boolean {
    return Date.now() >= this.access_token_expires.getTime();
  }
}