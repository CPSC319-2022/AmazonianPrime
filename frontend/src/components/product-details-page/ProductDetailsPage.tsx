import './ProductDetailsPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useGetListingByIdQuery, useGetListingsQuery } from '../../redux/api/listings';
import { setIsLoadingListingDetails, setListingDetails } from '../../redux/reducers/listingsSlice';
import { Grid } from '@mui/material';
import ImagePreviews from './ImagePreviews';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router';
import Breadcrumbs from '../common/Breadcrumbs';
import ListingRow from '../listing/ListingRow';
import { getSlugCategory } from '../../utils/convertSlugCategory';
import useAdminPrivelege from '../../utils/useAdminPrivelege';

function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const { listingId } = useParams();
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const { data: suggestedListings, isLoading: isLoadingSuggestedListings } = useGetListingsQuery({
    page: 1,
    category: getSlugCategory(listing?.Category || ''),
    name: '',
  });

  const { data, isLoading } = useGetListingByIdQuery(listingId || '');
  const isLoadingDetails = useAppSelector((state) => state.listings.isLoadingListingDetails);
  useEffect(() => {
    dispatch(setIsLoadingListingDetails(isLoading));
  }, [isLoading]);
  useEffect(() => {
    if (data) {
      dispatch(setListingDetails(data));
      dispatch(setIsLoadingListingDetails(false));
    }
  }, [data]);

  return (
    <div>
      <Breadcrumbs />
      <Grid container className="product-details-page">
        <Grid item xs={6} className="product-details-page__item">
          <ImagePreviews isLoading={isLoadingDetails} />
        </Grid>
        <Grid item xs={6} className="product-details-page__item">
          <ProductDetails isLoading={isLoadingDetails} />
        </Grid>
        <div className="product-details-page__suggestions">
          {(suggestedListings?.TotalListings || 0) > 2 && !isAdminPrivelegeRequested && (
            <ListingRow
              isLoading={isLoadingSuggestedListings || isLoading}
              title={'Related Items You May Be Interested In'}
              listings={suggestedListings?.Data.filter((item) => item.ListingID !== listing?.ListingID)}
            />
          )}
        </div>
      </Grid>
    </div>
  );
}

export default ProductDetailsPage;
