import { ShareFileResponse } from '../types/sharefileresponse'
import SharefileClientAPIElement from "./api-element";
import SharefileHTTP from "../http/index";
import ShareFileAPI from "../sharefile-client-api";

export interface HttpResponse_DownloadSpecification {
    DownloadToken: string
    DownloadUrl: string
    DownloadPrepStatusURL: string
    "odata.metadata": string
    "odata.type": string
}

/**
 *  ````
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
 * @memberof ShareFile.Api.Models.DownloadSpecification
 * @link https://api.sharefile.com/docs/resource?name=ShareFile.Api.Models.DownloadSpecification
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

    async checkStatus(): Promise<boolean> {
        if (!this.prepStatus) return true;
        try {
            return await this._http.get(this.prepStatus);
        } catch (error) {
            console.error('Error checking download status:', error);
            return false;
        }
    }

    download(): DownloadChain {
        return new DownloadChain(this.url, this.token);
    }

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

    private async makeRequest(): Promise<Response> {
        const response = await fetch(this.url, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return response;
    }

    async toBuffer(): Promise<Buffer> {
        const response = await this.makeRequest();
        return await response.arrayBuffer().then(res=>Buffer.from(res));
    }

    async toStream(): Promise<ReadableStream> {
        const response = await this.makeRequest();
        return response.body!;
    }
}