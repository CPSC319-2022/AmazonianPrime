import { Listing } from './listing';

export interface ListingPreview extends Omit<Listing, 'Images'> {
  ImagePreview: string;
}
