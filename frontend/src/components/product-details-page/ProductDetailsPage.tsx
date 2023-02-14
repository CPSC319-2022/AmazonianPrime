import './ProductDetailsPage.scss';
import { useAppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { useGetListingByIdQuery } from '../../redux/api/listings';
import { setListingDetails } from '../../redux/reducers/listingsSlice';
import { Grid } from '@mui/material';
import ImagePreviews from './ImagePreviews';
import ProductDetails from './ProductDetails';

function ProductDetailsPage() {
  const dispatch = useAppDispatch();
  const { data } = useGetListingByIdQuery();
  useEffect(() => {
    if (data) {
      dispatch(setListingDetails(data));
    }
  }, [data]);

  return (
    <Grid container className="product-details-page">
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
