import getAlbumsResponseJson from '../../../data/get-albums-response.json';
import getAlbum1ResponseJson from '../../../data/get-album-1-response.json';
import getPhoto1ResponseJson from '../../../data/get-photo-1-response.json';
import { GetAlbumResponse, GetAlbumsResponse, GetPhotoResponse} from '../../../../src/models';
import { LeanTechniquesPhotoClient } from '../../../../src/clients';

describe('LeanTechniquesPhotoClient tests', function () {
    let sut: LeanTechniquesPhotoClient;

    beforeEach(function(){
        sut = new LeanTechniquesPhotoClient();
    });

    describe('getAlbums tests', function () {
        let expectedGetAlbumsResponse: GetAlbumsResponse;

        beforeEach(function () {
            expectedGetAlbumsResponse = getAlbumsResponseJson as GetAlbumsResponse;
        });

        it('fetches the albums', async function () {
            const actualGetAlbumsResponse = await sut.getAlbums();

            expect(actualGetAlbumsResponse).toEqual(expectedGetAlbumsResponse);
        });
    });
});
