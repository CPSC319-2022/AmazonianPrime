import './ProductDetailsPage.scss';
import { useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { useGetListingByIdQuery } from '../../redux/api/listings';
import { setListingDetails } from '../../redux/reducers/listingsSlice';
import { Grid } from '@mui/material';
import ImagePreviews from './ImagePreviews';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router';

function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const { listingId } = useParams();
  const { data, isLoading } = useGetListingByIdQuery(listingId || '');
  useEffect(() => {
    if (data) {
      dispatch(setListingDetails(data));
    }
  }, [data]);

  if (isLoading) {
    // TODO: add loading
    return null;
  }

  return (
    <Grid container className="product-details-page" columnSpacing={{ xs: 10 }}>
      <Grid item xs={6}>
        <div className="product-details-page__previews">
          <ImagePreviews />
        </div>
      </Grid>
      <Grid item xs={6}>
        <ProductDetails />
      </Grid>
    </Grid>
  );
}

export default ProductDetailsPage;
