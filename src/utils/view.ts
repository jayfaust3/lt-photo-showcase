import { Photo, ViewablePhoto } from '../models';

export function mapPhotoDataModelToPhotoViewModel(dataModel: Photo, height: number, width: number): ViewablePhoto  {
    const {
      photoId: id,
      title,
      url: src
    } = dataModel;

    return {
      id,
      title,
      src,
      height,
      width
    };
}
