import { Photo } from '../data';
import { ViewablePhoto } from '../view';

export type ViewPhotosProps = {
    photos: Photo[]
    clickHandler: (photo: ViewablePhoto) => void
}
