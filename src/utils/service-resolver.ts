import { LeanTechniquesPhotoClient, PhotoClient } from '../clients';

export function getPhotoClient(): PhotoClient {
    return new LeanTechniquesPhotoClient();
}