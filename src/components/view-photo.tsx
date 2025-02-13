import { useState, useCallback } from 'react';
import PhotoAlbum from 'react-photo-album';
import { ViewPhotoProps } from '../models';
import { mapPhotoDataModelToPhotoViewModel } from '../utils';

export default function ViewPhoto(props: ViewPhotoProps) {
  const { photo, closeCallback } = props;

  const photoHeight = 600;
  const photoWidth = 800;

  const photoData = mapPhotoDataModelToPhotoViewModel(photo, photoHeight, photoWidth);

  const handleCloseClicked = useCallback(() => {
    closeCallback();
  }, [closeCallback]);

  return (
    <div className='content-wrapper centered-wrapper'>
        <div className='content-wrapper'>
            <PhotoAlbum layout="rows" photos={[photoData]}/>
        </div>
        <div className='right-justify content-wrapper even-spacing'>
          <button onClick={handleCloseClicked}>Close</button>
        </div>
    </div>
  );
}
