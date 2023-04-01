import './ProductDetailsPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useGetListingByIdQuery } from '../../redux/api/listings';
import { setIsLoadingListingDetails, setListingDetails } from '../../redux/reducers/listingsSlice';
import { Grid } from '@mui/material';
import ImagePreviews from './ImagePreviews';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router';
import Breadcrumbs from '../common/Breadcrumbs';

function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const { listingId } = useParams();

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
      </Grid>
    </div>
  );
}

export default ProductDetailsPage;
