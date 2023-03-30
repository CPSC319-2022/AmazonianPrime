import { ListingPreview } from "./listingPreview";

export interface Order {
    src: string;
    name: string[];
    sellor: string;
    buyer: string;
    deliveryMethod: string;
    delivered: boolean;
  }

