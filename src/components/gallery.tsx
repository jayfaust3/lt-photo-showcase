import { useState, useEffect } from 'react';
import { Photo, ViewablePhoto } from '../models';
import { useGetAlbums, useGetPhoto } from '../hooks'
import Filter from './filter';
import ViewPhotos from './view-photos';
import ViewPhoto from './view-photo';

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | undefined>(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>(undefined);

  const invalidSearchCriteriaValidationText = 'Search term must match the title of an existing photo.';

  const {
    data: albums,
    status: getAlbumsStatus,
    // error: getAlbumsError
  } = useGetAlbums();

  const {
    data: photo,
    status: getPhotoStatus,
    // error: getPhotoError
  } = useGetPhoto(selectedPhotoId);

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

  useEffect(
    () => {
        setSelectedPhoto(photo);
    },
    [photo]
  );

  useEffect(() => {
    setIsLoading(
        getAlbumsStatus === 'loading' ||
        getPhotoStatus === 'loading'
    );
  }, [getAlbumsStatus, getPhotoStatus]);

  const handlePhotoClicked = (photo: ViewablePhoto) => {
    setSelectedPhotoId(photo.id);
  };

  const handlePhotoClosed = () => {
    setSelectedPhotoId(undefined);
  };

  const filterValidator = (searchText: string) => {
    return photos.some(p => p.title === searchText);
  };

  const filterHandler = (searchText: string) => {
    if (searchText) {
        setPhotos(
            photos.filter(p => p.title === searchText) 
        );
    } else {
        setPhotos(
            albums ? 
            albums.flatMap(album => album.photos) :
            [] 
        );
    }
  };

  return (
    <div className='content-wrapper'>
      {isLoading && (
        <div className='right-justify'>
          <p>Loading...</p>
        </div>
      )}
      {selectedPhotoId && selectedPhoto ? (
        <div className='content-wrapper centered-wrapper'>
          <Filter
            validationText={invalidSearchCriteriaValidationText}
            validator={filterValidator}
            filterHandler={filterHandler}
          />
          <ViewPhoto
            photo={selectedPhoto}
            closeHandler={handlePhotoClosed}
          />
        </div>
      ) : (
        <ViewPhotos
          photos={photos}
          clickHandler={handlePhotoClicked}
        />
      )}
    </div>
  );
}
