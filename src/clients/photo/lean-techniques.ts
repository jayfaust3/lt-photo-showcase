import { GetAlbumResponse, GetAlbumsResponse, GetPhotoResponse} from '../../models';
import { PhotoClient } from '.';

export class LeanTechniquesPhotoClient implements PhotoClient {
    async getAlbum(): Promise<GetAlbumResponse> {
        return [];
    }

    async getAlbums(albumId: number): Promise<GetAlbumsResponse> {
        return [];
    }

    async getPhoto(photoId: number): Promise<GetPhotoResponse> {
        return {} as GetPhotoResponse;
    }
}
