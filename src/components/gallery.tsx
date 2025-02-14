import { useState, useEffect, useCallback } from 'react';
import { Photo, ViewablePhoto } from '../models';
import { useGetAlbums, useGetPhoto } from '../hooks'
import Filter from './filter';
import ViewPhotos from './view-photos';
import ViewPhoto from './view-photo';

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>(undefined);

  const [selectedPhotoId, setSelectedPhotoId] = useState<number | undefined>(undefined);

  const {
    data: albums,
    status: getAlbumsStatus,
    error: getAlbumsError
  } = useGetAlbums();

  useEffect(
    () => {
        setPhotos(
            albums ? 
            albums.flatMap(album => album.photos) :
            [] 
        );
    },
    [albums]
  );

//   const [photos, setPhotos] = useState<Photo[]>(
//     albums ? 
//             albums.flatMap(album => album.photos) :
//             [] 
//   );

  useEffect(() => {
    setIsLoading(getAlbumsStatus === 'loading');
  }, [getAlbumsStatus]);

  const handlePhotoClicked = (photo: ViewablePhoto) => {
    // setSelectedPhoto(photo);
  };

  return (
    <div className='content-wrapper'>
      {isLoading && (
        <div className='right-justify'>
          <p>Loading...</p>
        </div>
      )}
      {modalOpen /*&& selectedPhoto*/ ? (
        <div className='content-wrapper centered-wrapper'>
          
        </div>
      ) : (
        <ViewPhotos photos={photos} clickHandler={handlePhotoClicked}/>
      )}
    </div>
  );
}
