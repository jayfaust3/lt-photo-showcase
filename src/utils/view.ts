import { Photo, ViewablePhoto } from '../models';

export function mapPhotoDataModelToPhotoViewModel(dataModel: Photo, height: number, width: number): ViewablePhoto  {
    const {
        photoId: id,
        url: src
    } = dataModel;

    return {
      id,
      src,
      height,
      width
    };
}
