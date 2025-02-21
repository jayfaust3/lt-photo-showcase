import { faker } from '@faker-js/faker';
import { GetAlbumResponse, GetAlbumsResponse, GetPhotoResponse, Photo } from '../../../../src/models';
import { LeanTechniquesPhotoClient } from '../../../../src/clients';
import * as utils from '../../../../src/utils';

jest.mock('../../../../src/utils');

describe('LeanTechniquesPhotoClient tests', function () {
    let albumId: number;
    let photoId: number;
    let mockPhoto: Photo;

    let fetchSpy: jest.SpyInstance;

    let sut: LeanTechniquesPhotoClient;

    beforeEach(function () {
        jest.spyOn(utils, 'getEnvVar').mockReturnValueOnce('value');

        global.fetch = jest.fn();
        fetchSpy = jest.spyOn(global, 'fetch');

        albumId = faker.number.int();
        photoId = faker.number.int();

        mockPhoto = {
            albumId,
            photoId,
            url: faker.internet.url(),
            title: faker.string.alphanumeric(10)
        };

        sut = new LeanTechniquesPhotoClient();
    });

    afterEach(function () {
        jest.clearAllMocks();
    });

    describe('getAlbums tests', function () {
        describe('when the request returns a 200 response', function () {
            const data: GetAlbumsResponse = [
                {
                    albumId,
                    photos: [
                        mockPhoto
                    ]
                }
            ];

            beforeEach(function () {
                fetchSpy.mockResolvedValueOnce({
                    status: 200,
                    json: () => Promise.resolve(data)
                } as Response);
            });
            
            it('caches and returns the data', async function () {
                const result = await sut.getAlbums();

                expect(result).toEqual(data);

                const cacheResult = await sut.getAlbums();

                expect(cacheResult).toEqual(data);

                // assert fetch was only called the first time and the second response comes from cache
                expect(fetchSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('when the request returns >= 400 response', function () {
            const errorStatus = 400;

            beforeEach(function () {
                fetchSpy.mockResolvedValueOnce({
                    status: errorStatus,
                } as Response);
            });

            it ('throws an error', async function () {
                await expect(() => sut.getAlbums()).rejects.toThrow(
                    new Error(`HTTP response returned the following non-2xx status: ${errorStatus}`)
                );
            });
        });
    });

    describe('getAlbum tests', function () {
        describe('when the request returns a 200 response', function () {
            const data: GetAlbumResponse = [
                mockPhoto
            ];

            beforeEach(function () {
                fetchSpy.mockResolvedValueOnce({
                    status: 200,
                    json: () => Promise.resolve(data)
                } as Response);
            });
            
            it('caches and returns the data', async function () {
                const result = await sut.getAlbum(albumId);

                expect(result).toEqual(data);

                const cacheResult = await sut.getAlbum(albumId);

                expect(cacheResult).toEqual(data);

                // assert fetch was only called the first time and the second response comes from cache
                expect(fetchSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('when the request returns >= 400 response', function () {
            const errorStatus = 400;

            beforeEach(function () {
                fetchSpy.mockResolvedValueOnce({
                    status: errorStatus,
                } as Response);
            });

            it ('throws an error', async function () {
                expect(() => sut.getAlbum(albumId)).rejects.toThrow(
                    new Error(`HTTP response returned the following non-2xx status: ${errorStatus}`)
                );
            });
        });
    });

    describe('getPhoto tests', function () {
        describe('when the request returns a 200 response', function () {
            const data: GetPhotoResponse = mockPhoto;

            beforeEach(function () {
                fetchSpy.mockResolvedValueOnce({
                    status: 200,
                    json: () => Promise.resolve(data)
                } as Response);
            });
            
            it('caches and returns the data', async function () {
                const result = await sut.getPhoto(photoId);

                expect(result).toEqual(data);

                const cacheResult = await sut.getPhoto(photoId);

                expect(cacheResult).toEqual(data);

                // assert fetch was only called the first time and the second response comes from cache
                expect(fetchSpy).toHaveBeenCalledTimes(1);
            });
        });

        describe('when the request returns >= 400 response', function () {
            const errorStatus = 400;

            beforeEach(function () {
                fetchSpy.mockResolvedValueOnce({
                    status: errorStatus,
                } as Response);
            });

            it ('throws an error', async function () {
                expect(() => sut.getPhoto(photoId)).rejects.toThrow(
                    new Error(`HTTP response returned the following non-2xx status: ${errorStatus}`)
                );
            });
        });
    });
});
