import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';

function ProductDetails() {
  const listing = useAppSelector((state) => state.listings.listingDetails);

  return <div className="product-details">{listing?.listingName}</div>;
}

export default ProductDetails;
