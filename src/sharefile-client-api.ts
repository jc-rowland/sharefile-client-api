import SharefileItem from './models/item';
import SharefileHTTP, { SharefileApiAuth } from './http/index';
import { ShareFileAPIModels } from './types/sharefile.api.models';
import SharefileSearchResults, { ISearchResult_Reponse } from './models/search-results';
import SharefileClientAPIElement from './models/api-element';
/**
 * ShareFileAPI class provides a high-level interface for interacting with the ShareFile API.
 * It handles authentication, item management, and other core ShareFile operations.
 * 
 * @example
 * const api = new ShareFileAPI({
 *   subdomain: 'mycompany',
 *   username: 'user@example.com',
 *   password: 'password123',
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret'
 * });
 * 
 * await api.connect();
 * const rootFolder = await api.getItem('home');
 */
export default class ShareFileAPI {
  _http: SharefileHTTP;
  _api:ShareFileAPI

  /**
   * Creates a new instance of ShareFileAPI.
   * 
   * @param {SharefileApiAuth} auth - Authentication details for ShareFile
   */
  constructor(auth: SharefileApiAuth) {
    this._api = this
    this._http = new SharefileHTTP(auth);
  }

  /**
   * Authenticates with the ShareFile API.
   * This method should be called before making any other API requests.
   * 
   * @returns {Promise<string>} A promise that resolves to the access token
   * @throws {Error} If authentication fails
   * 
   * @example
   * await api.connect();
   */
  async connect(): Promise<string> {
    return this._http.authenticate();
  }

  /**
   * Retrieves a ShareFile item by its ID or path.
   * 
   * @param {string} idOrPath - The ID or path of the item to retrieve
   * @returns {Promise<SharefileItem>} A promise that resolves to the requested item
   * @throws {Error} If the item retrieval fails
   * 
   * @example
   * const homeFolder = await api.getItem('home');
   * const specificFile = await api.getItem('fi123456789');
   * const folderByPath = await api.getItem('/Personal Folders/Documents');
   */
  async getItem(idOrPath: string|ShareFileAPIModels.SpecialItemIDs): Promise<SharefileItem> {
    try {
      const isPath = idOrPath.includes('/');
      const endpoint = isPath ? 'Items/ByPath' : `Items(${idOrPath})`;
      const params = isPath ? { path: idOrPath } : undefined;
      const data = await this._http.get<ShareFileAPIModels.Item>(endpoint, params);
      return new SharefileItem(data, this._http, this);
    } catch (error: any) {
      throw new Error(`Failed to retrieve item ${idOrPath}: ${error?.message}`);
    }
  }

  /**
   * Retrieves the contents of a folder.
   * 
   * @param {string} folderId - The ID of the folder
   * @param {Record<string, any>} [queryParams] - Additional query parameters
   * @returns {Promise<SharefileItem[]>} A promise that resolves to an array of folder contents
   * @throws {Error} If retrieval of folder contents fails
   * 
   * @example
   * const folderContents = await api.getFolderContents('fo123456789');
   * const filteredContents = await api.getFolderContents('fo123456789', { $filter: 'IsFolder eq true' });
   */
  async getFolderContents(folderId: string, queryParams: Record<string, any> = {}): Promise<SharefileItem[]> {
    try {
      const data = await this._http.get<{ value: ShareFileAPIModels.Item[] }>(`Items(${folderId})/Children`, queryParams);
      return data.value.map(item => new SharefileItem(item, this._http, this));
    } catch (error: any) {
      throw new Error(`Failed to retrieve folder contents: ${error?.message}`);
    }
  }

  /**
   * Creates a new item in ShareFile.
   * 
   * @param {string} parentId - The ID of the parent folder
   * @param {string} itemType - The type of item to create (e.g., 'Folder', 'File')
   * @param {Record<string, any>} itemData - Data for the new item
   * @returns {Promise<SharefileItem>} A promise that resolves to the created item
   * @throws {Error} If item creation fails
   * 
   * @example
   * const newFolder = await api.createItem('fo123456789', 'Folder', { Name: 'New Folder' });
   * const newFile = await api.createItem('fo123456789', 'File', { Name: 'test.txt', ContentType: 'text/plain' });
   */
  async createItem(parentId: string, itemType: string, itemData: Record<string, any>): Promise<SharefileItem> {
    try {
      const data = await this._http.post<ShareFileAPIModels.Item>(`Items(${parentId})/${itemType}`, itemData);
      return new SharefileItem(data, this._http, this);
    } catch (error: any) {
      throw new Error(`Failed to create item: ${error?.message}`);
    }
  }

  /**
   * Deletes an item from ShareFile.
   * 
   * @param {string} itemId - The ID of the item to delete
   * @returns {Promise<void>}
   * @throws {Error} If item deletion fails
   * 
   * @example
   * await api.deleteItem('fi123456789');
   */
  async deleteItem(itemId: string): Promise<void> {
    try {
      await this._http.delete(`Items(${itemId})`);
    } catch (error: any) {
      throw new Error(`Failed to delete item: ${error?.message}`);
    }
  }

  /**
   * Searches for items in ShareFile.
   * 
   * @param {string} query - The search query
   * @param {Record<string, any>} [searchParams] - Additional search parameters
   * @returns {Promise<SharefileSearchResults>} A promise that resolves to an array of search results
   * @throws {Error} If the search operation fails
   * 
   * @example
   * const searchResults = await api.searchItems('budget');
   * const filteredSearch = await api.searchItems('report', { $filter: 'CreationDate gt 2023-01-01' });
   */
  async searchItems(query: string, searchParams: Record<string, any> = {}): Promise<SharefileSearchResults> {
    try {
      const data = await this._http.get<ISearchResult_Reponse>('Items/Search', { ...searchParams, query });

      return new SharefileSearchResults(data,this._http,this._api)
    } catch (error: any) {
      throw new Error(`Search failed: ${error?.message}`);
    }
  }

  /**
   * Returns the underlying HTTP client for advanced usage.
   * 
   * @returns {SharefileHTTP} The HTTP client instance
   * 
   * @example
   * const httpClient = api.getHttpClient();
   * const customData = await httpClient.get('CustomEndpoint');
   */
  getHttpClient(): SharefileHTTP {
    return this._http;
  }

  // Deprecated methods

  /**
   * @deprecated Use getItem() instead.
   * This method will be removed in a future version.
   */
  @Deprecated('Use getItem() instead')
  async items(id?: string, queryParams: Record<string, any> = {}): Promise<SharefileItem> {
    console.warn('Deprecated: The items() method is deprecated. Use getItem() instead.');
    return this.getItem(id || '');
  }

  /**
   * @deprecated Use getItem() instead.
   * This method will be removed in a future version.
   */
  @Deprecated('Use getItem() instead')
  async itemsByPath(path: string): Promise<SharefileItem> {
    console.warn('Deprecated: The itemsByPath() method is deprecated. Use getItem() instead.');
    return this.getItem(path);
  }

  /**
   * @deprecated Use createItem() instead.
   * This method will be removed in a future version.
   */
  @Deprecated('Use createItem() instead')
  async createFolder(parentId: string, folderName: string): Promise<SharefileItem> {
    console.warn('Deprecated: The createFolder() method is deprecated. Use createItem() instead.');
    return this.createItem(parentId, 'Folder', { Name: folderName });
  }
}

/**
 * TypeScript decorator for deprecation
 * Note: You may need to enable experimentalDecorators in tsconfig.json
 * 
 * @param {string} message - The deprecation message
 */
function Deprecated(message: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (descriptor) {
      const original = descriptor.value;
      descriptor.value = function(...args: any[]) {
        console.warn(`Deprecated: ${propertyKey} is deprecated. ${message}`);
        return original.apply(this, args);
      };
    } else {
      console.warn(`Deprecated: ${propertyKey} is deprecated. ${message}`);
    }
  };
}