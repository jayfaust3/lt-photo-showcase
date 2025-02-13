import { GetAlbumResponse, GetAlbumsResponse, GetPhotoResponse} from '../../models';
import { PhotoClient } from '.';
import { getEnvVar } from '../../utils';

export class LeanTechniquesPhotoClient implements PhotoClient {
    private readonly _serviceBaseUrl: string;
    private readonly _defaultHeaders: Record<string, string> = {
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    };
    private readonly _apiKeyHeaderKey: string;
    private readonly _apiKeyHeaderValue: string;
   
    constructor() {
        this._serviceBaseUrl = getEnvVar('LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL_PROXY');
        this._apiKeyHeaderKey = getEnvVar('LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY_HEADER');
        this._apiKeyHeaderValue = getEnvVar('LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY');
    }

    async getAlbums(): Promise<GetAlbumsResponse> {
        const headers = this.getRequestHeaders();

        const endpoint = `${this._serviceBaseUrl}/albums`;

        const response = await fetch(endpoint, {
            headers
        });

        return await this.handleHttpResponse(response);
    }

    async getAlbum(albumId: number): Promise<GetAlbumResponse> {
        const headers = this.getRequestHeaders();

        const endpoint = `${this._serviceBaseUrl}/albums/${albumId}`;

        const response = await fetch(endpoint, {
            headers
        });

        return await this.handleHttpResponse(response);
    }

    async getPhoto(photoId: number): Promise<GetPhotoResponse> {
        const headers = this.getRequestHeaders();

        const endpoint = `${this._serviceBaseUrl}/photos/${photoId}`;

        const response = await fetch(endpoint, {
            headers
        });

        return await this.handleHttpResponse(response);
    }

    private async handleHttpResponse<TResponseData>(response: Response) {
        if (response.status >= 400)
            throw new Error(`HTTP response returned the following non-2xx status: ${response.status}`);

        const responseData = await response.json();

        return responseData as TResponseData;
    }

    private getRequestHeaders(): Record<string, string> {
        return {
            ...this._defaultHeaders,
            [this._apiKeyHeaderKey]: this._apiKeyHeaderValue
        };
    }
}
