import { Photo, ViewablePhoto } from '../models';

export function mapPhotoDataModelToPhotoViewModel(dataModel: Photo, height: number, width: number): ViewablePhoto  {
    const {
      title,
      url: src
    } = dataModel;

    return {
      title,
      src,
      height,
      width
    };
}
