import { useEffect, useState } from 'react';
import { Photo, FetchResult, GetAlbumResponse } from '../../models';
import { getPhotoClient } from '../../utils';
import { PhotoClient } from '../../clients';

export const useGetAlbum = (albumId?: number) => {
    const [result, setResult] = useState<FetchResult<Photo[]>>({
        status: 'loading'
    });

    useEffect(
        () => {
            const photoClient: PhotoClient = getPhotoClient();

            if (albumId) {
                const getData = async () => {
                    const getAlbumResponse: GetAlbumResponse = await photoClient.getAlbum(albumId);
    
                    setResult({ data: getAlbumResponse, status: 'loaded' });
                };
    
                getData()
                    .catch(
                        error => 
                            setResult(
                                {
                                    status: 'error',
                                    error: error?.message ?? 'Encountered error while fetching albums'
                                }
                            )
                    );
            } else {
                setResult({ data: [], status: 'loaded' });
            }
        },
        [albumId]
    );

    return result;
};
