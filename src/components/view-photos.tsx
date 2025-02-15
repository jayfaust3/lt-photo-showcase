import { useCallback } from 'react';
import PhotoAlbum, { ClickHandlerProps } from 'react-photo-album';
import { ViewablePhoto, ViewPhotosProps } from '../models';
import { mapPhotoDataModelToPhotoViewModel } from '../utils';

export default function ViewPhotos(props: ViewPhotosProps) {
  const {
    photos,
    clickHandler
  } = props;

  const photoHeight = 3;
  const photoWidth = 4;

  const photoData = photos.map(
    photo =>
      mapPhotoDataModelToPhotoViewModel(
        photo,
        photoHeight,
        photoWidth
      )
   );

  const handlePhotoClicked = useCallback(({ photo }: ClickHandlerProps<ViewablePhoto>) => {
    clickHandler(photo);
  }, [clickHandler]);

  return (
    <div className='content-wrapper centered-wrapper'>
      <PhotoAlbum
        layout='masonry'
        photos={photoData}
        onClick={handlePhotoClicked}
      />
    </div>
  );
}
