import { useEffect, useState } from 'react';
import { Photo, FetchResult, GetPhotoResponse } from '../../models';
import { getPhotoClient } from '../../utils';
import { PhotoClient } from '../../clients';

export const useGetPhoto = (photoId?: number) => {
    const [result, setResult] = useState<FetchResult<Photo | undefined>>({
        status: 'loading'
    });

    useEffect(
        () => {
            const photoClient: PhotoClient = getPhotoClient();

            if (photoId) {
                const getData = async () => {
                    const getPhotoResponse: GetPhotoResponse = await photoClient.getPhoto(photoId);
    
                    setResult({ data: getPhotoResponse, status: 'loaded' });
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
                setResult({ data: undefined, status: 'loaded' });
            }
        },
        [photoId]
    );

    return result;
};
