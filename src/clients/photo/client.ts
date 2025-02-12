import { GetAlbumResponse, GetAlbumsResponse, GetPhotoResponse} from '../../models';

export interface PhotoClient {
    getAlbum(): Promise<GetAlbumResponse>

    getAlbums(albumId: number): Promise<GetAlbumsResponse>

    getPhoto(photoId: number): Promise<GetPhotoResponse>
}
