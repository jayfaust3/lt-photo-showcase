import { useEffect, useState } from 'react';
import { Album, FetchResult, GetAlbumsResponse } from '../../models';
import { getPhotoClient } from '../../utils';
import { PhotoClient } from '../../clients';

export const useGetAlbums = () => {
    const photoClient: PhotoClient = getPhotoClient();

    const [result, setResult] = useState<FetchResult<Album[]>>({
        status: 'loading'
    });

    useEffect(
        () => {
            const getData = async () => {
                const getAlbumsResponse: GetAlbumsResponse = await photoClient.getAlbums();

                setResult({ data: getAlbumsResponse, status: 'loaded' });
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
        },
        [photoClient]
    );

    return result;
};
