/**
 * @memberof ShareFile.Api.Models.DownloadSpecification
 * @link https://api.sharefile.com/docs/resource?name=ShareFile.Api.Models.DownloadSpecification
 */
import { ShareFileResponse } from '../types/sharefileresponse'
import SharefileClientAPIElement from "./api-element";
import SharefileHTTP from "../http";
import ShareFileAPI from "../sharefile-client-api";
import https from 'https'
import { Readable,Writable } from 'stream';
import { IncomingMessage } from 'http';


export interface HttpResponse_DownloadSpecification {
    DownloadToken: string
    DownloadUrl: string
    DownloadPrepStatusURL: string
    "odata.metadata": string
    "odata.type": string
}


/**
 * 
 * ````
 *  const downloadSpec = new DownloadSpecification(response, http, api);
 *
 *  // Download as Buffer (default)
 *  const buffer = await downloadSpec.download().toBuffer();
 *
 *  // Download as Stream
 *  const stream = await downloadSpec.download().toStream();
 *
 *  // Wait and then download as Buffer
 *  const buffer = await downloadSpec.waitAndDownload().then(chain => chain.toBuffer());
 *
 *  // Wait and then download as Stream
 *  const stream = await downloadSpec.waitAndDownload().then(chain => chain.toStream());
 * ````
 * 
 */
export default class DownloadSpecification extends SharefileClientAPIElement {
    readonly token: string = "";
    readonly url: string = "";
    readonly prepStatus: string = "";
    readonly odata: ShareFileResponse.OData = {
        metadata: "",
        type: ""
    };

    constructor(x: HttpResponse_DownloadSpecification, http: SharefileHTTP, api: ShareFileAPI) {
        super(http, api)
        this.token = x.DownloadToken;
        this.url = x.DownloadUrl;
        this.prepStatus = x.DownloadPrepStatusURL;
        this.odata = {
            metadata: x["odata.metadata"],
            type: x["odata.type"]
        };
    }

    /**
     * Checks the preparation status of the download.
     * @returns {Promise<boolean>} True if the download is ready, false otherwise.
     */
    async checkStatus(): Promise<boolean> {
        if(!this.prepStatus){return true}
        try {
            return  await this._http.get(this.prepStatus);
        } catch (error) {
            console.error('Error checking download status:', error);
            return false;
        }
    }

    /**
     * Initiates the file download.
     * @returns {DownloadChain} A chainable object with toBuffer and toStream methods.
     */
    download(): DownloadChain {
        return new DownloadChain(this.url, this.token);
    }

    /**
     * Waits for the download to be ready and then initiates the download.
     * @param {number} [maxAttempts=10] - Maximum number of status check attempts.
     * @param {number} [interval=1000] - Interval between status checks in milliseconds.
     * @returns {Promise<DownloadChain>} A chainable object with toBuffer and toStream methods.
     */
    async waitAndDownload(maxAttempts: number = 10, interval: number = 2000): Promise<DownloadChain> {
        for (let i = 0; i < maxAttempts; i++) {
            if (await this.checkStatus()) {
                return this.download();
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        throw new Error('Download preparation timed out');
    }
}

class DownloadChain {
    private url: string;
    private token: string;

    constructor(url: string, token: string) {
        this.url = url;
        this.token = token;
    }

    private makeRequest(): Promise<IncomingMessage> {
        return new Promise((resolve, reject) => {
            const options = {
                headers: { 'Authorization': `Bearer ${this.token}` }
            };

            https.get(this.url, options, (response) => {
                if (response.statusCode === 200) {
                    resolve(response);
                } else {
                    reject(new Error(`HTTP Error: ${response.statusCode}`));
                }
            }).on('error', reject);
        });
    }

    async toBuffer(): Promise<Buffer> {
        const response = await this.makeRequest();
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            response.on('data', (chunk: Buffer) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        });
    }

    async toStream(): Promise<Readable> {
        const response = await this.makeRequest();
        return response;
    }
}