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
    status: getAlbumsStatus
  } = useGetAlbums();

  const {
    data: photo,
    status: getPhotoStatus
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
        setIsLoading(false);
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
    setIsLoading(true);
    setSelectedPhotoId(photo.id);
  };

  const handlePhotoClosed = () => {
    setSelectedPhotoId(undefined);
    setPhotos(
        albums ? 
        albums.flatMap(album => album.photos) :
        [] 
    );
  };

  const filterValidator = (searchText: string) => {
    return photos.some(
        p => {
            const regex = new RegExp(searchText, 'i');
            return regex.test(p.title);
        }
    );
  };

  const filterHandler = (searchText: string) => {
    if (searchText) {
        setPhotos(
            photos.filter(
                p => {
                    const regex = new RegExp(searchText, 'i');
                    return regex.test(p.title);
                }
            ) 
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
      <h1>Lean Techniques Photo Showcase</h1>
      {isLoading && (
        <div className='right-justify'>
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && selectedPhotoId && selectedPhoto ? (
        <div className='content-wrapper centered-wrapper'>
          <ViewPhoto
            photo={selectedPhoto}
            closeHandler={handlePhotoClosed}
          />
        </div>
      ) : (
        <div className='content-wrapper centered-wrapper'>
          <div className='content-wrapper right-justify'>
            <Filter
                validationText={invalidSearchCriteriaValidationText}
                validator={filterValidator}
                filterHandler={filterHandler}
            />
          </div>
          <div className='content-wrapper centered-wrapper'>
            <ViewPhotos
                photos={photos}
                clickHandler={handlePhotoClicked}
            />
          </div>
        </div>
      )}
    </div>
  );
}
