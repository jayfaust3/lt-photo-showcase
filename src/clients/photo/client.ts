import { GetAlbumResponse, GetAlbumsResponse, GetPhotoResponse} from '../../models';

export interface PhotoClient {
    getAlbums(): Promise<GetAlbumsResponse>

    getAlbum(albumId: number): Promise<GetAlbumResponse>

    getPhoto(photoId: number): Promise<GetPhotoResponse>
}
