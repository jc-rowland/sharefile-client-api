/**
 * @memberof ShareFile._api.Models.SearchResults
 * @link https://api.sharefile.com/docs/resource?name=ShareFile._api.Models.SearchResults
 */

import SharefileItem from './item';
import SharefileHTTP from '../http';
import ShareFileAPI from '../sharefile-client-api';
import SharefileClientAPIElement from './api-element';

/**
 * Represents a single search result item.
 */
export interface ISearchResult_Reponse { 
  PartialResults: boolean; 
  Results: any[]
  TimedOut: boolean;
  TotalCount: number;
}

/**
 * Represents the results of a search operation in ShareFile.
 */
export class SharefileSearchResults extends SharefileClientAPIElement {
  /**
   * Indicates whether the results are partial due to limitations or timeouts.
   */
  readonly partialResults: boolean;

  /**
   * The collection of search result items.
   */
  readonly results: any[];

  /**
   * Indicates whether the search query timed out.
   */
  readonly timedOut: boolean;

  /**
   * The total number of results found.
   */
  readonly totalCount: number;

  /**
   * Creates a new instance of SharefileSearchResults.
   * 
   * @param {Object} data - The raw search results data from the API.
   * @param {SharefileHTTP} http - The HTTP client for making requests.
   * @param {ShareFileAPI} api - The ShareFile API instance.
   */
  constructor(data: ISearchResult_Reponse, http: SharefileHTTP, api: ShareFileAPI) {
    super(http,api)
    this.partialResults = data.PartialResults;
    this.timedOut = data.TimedOut;
    this.totalCount = data.TotalCount;

    // Convert raw results to SearchResultItems
    this.results = data.Results
  }

  /**
   * Gets a specific page of search results.
   * 
   * @param {number} pageNumber - The page number to retrieve.
   * @param {number} pageSize - The number of items per page.
   * @returns {Promise<SharefileSearchResults>} A new instance of SharefileSearchResults with the requested page of results.
   */
  async getPage(pageNumber: number, pageSize: number): Promise<SharefileSearchResults> {
    const skip = (pageNumber - 1) * pageSize;
    const response:ISearchResult_Reponse = await this._http.get('Items/Search', {
      $top: pageSize,
      $skip: skip,
    });
    return new SharefileSearchResults(response, this._http, this._api);
  }

  /**
   * Retrieves the full SharefileItem for each search result.
   * 
   * @returns {Promise<SharefileItem[]>} An array of full SharefileItem objects.
   */
  async getFullItems(): Promise<SharefileItem[]> {
    const itemPromises = this.results.map(result => this._api.getItem(result.Item.id));
    return Promise.all(itemPromises);
  }
}

export default SharefileSearchResults;