import './ProductDetailsPage.scss';
import { useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const listings = useAppSelector((state) => state.listings.recentListings);
  const { listingId } = useParams<{ listingId: string }>();

  // TODO: if listingDetails is null, we should call proper API to retry
  const listingDetails = listings.filter((listing) => listing.id === listingId)[0];
  return <div className="listing-row">{JSON.stringify(listingDetails)}</div>;
}

export default ProductDetailsPage;
