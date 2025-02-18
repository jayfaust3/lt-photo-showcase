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
    private _albumsCache: GetAlbumsResponse | undefined = undefined;
    private readonly _albumCache = new Map<number, GetAlbumResponse>();
    private readonly _photoCache = new Map<number, GetPhotoResponse>();
   
    constructor() {
        this._serviceBaseUrl = getEnvVar('LEAN_TECHNIQUES_PHOTO_SERVICE_BASE_URL');
        this._apiKeyHeaderKey = getEnvVar('LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY_HEADER');
        this._apiKeyHeaderValue = getEnvVar('LEAN_TECHNIQUES_PHOTO_SERVICE_API_KEY');
    }

    async getAlbums(): Promise<GetAlbumsResponse> {
        if (!this._albumsCache) {
            const headers = this.getRequestHeaders();

            const endpoint = `${this._serviceBaseUrl}/albums`;

            const response = await fetch(endpoint, {
                headers
            });

            this._albumsCache = await this.handleHttpResponse(response);
        }
        
        // we know it was either set before the method was called or it was just set
        return this._albumsCache!;
    }

    async getAlbum(albumId: number): Promise<GetAlbumResponse> {
        if (!this._albumCache.has(albumId)) {
            const headers = this.getRequestHeaders();

            const endpoint = `${this._serviceBaseUrl}/albums/${albumId}`;

            const response = await fetch(endpoint, {
                headers
            });

            const albumResponse = await this.handleHttpResponse<GetAlbumResponse>(response);

            this._albumCache.set(albumId, albumResponse);
        }
        
        // we know it was either set before the method was called or it was just set
        return this._albumCache.get(albumId)!;
    }

    async getPhoto(photoId: number): Promise<GetPhotoResponse> {
        if (!this._photoCache.has(photoId)) {
            const headers = this.getRequestHeaders();

            const endpoint = `${this._serviceBaseUrl}/photos/${photoId}`;

            const response = await fetch(endpoint, {
                headers
            });

            const photoResponse = await this.handleHttpResponse<GetPhotoResponse>(response);

            this._photoCache.set(photoId, photoResponse);
        }
        
        // we know it was either set before the method was called or it was just set
        return this._photoCache.get(photoId)!;
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
