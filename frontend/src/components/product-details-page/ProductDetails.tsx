import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';
import { Alert, Button, Grid, IconButton, Snackbar } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DetailsMetaData from './DetailsMetaData';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import NoContent from '../common/NoContent';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeleteListingMutation } from '../../redux/api/listings';
import { useState } from 'react';
import DeleteListingButton from '../common/DeleteListingButton';

interface ProductDetailsProps {
  isLoading: boolean;
}

// IF USRR ID OF LISTING == USER ID IN SESSION STORAGE

export const ProductDetails: React.FC<ProductDetailsProps> = ({ isLoading }) => {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const user = useAppSelector((state) => state.user.value);
  const [successToast, setSuccessToast] = useState(false);
  const [queueToast, setQueueToast] = useState(false);
  const [failToast, setFailToast] = useState(false);
  const [deleteListing] = useDeleteListingMutation();
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailToast(false);
    setSuccessToast(false);
    setQueueToast(false);
  };
  if (!listing) {
    // TODO: add no results page
    if (isLoading) {
      return <ProductDetailsSkeleton />;
    }
    return <NoContent message="There was no listing found, please try again later!" />;
  }
  const { ListingName, Cost, User, Description, PostedTimestamp } = listing;

  return (
    <div className="product-details">
      <h1 className="product-details__name">{ListingName}</h1>
      <Grid container rowSpacing={0}>
        <Grid item xs={12} className="product-details__seller-details">
          <div className="product-details_user-avatar">
            {User.FirstName?.charAt(0)}
            {User.LastName?.charAt(0)}
          </div>
          <div className="product-details__user-name">
            {User.FirstName}&nbsp;{User.LastName?.charAt(0)}.
            <div className="product-details__user-department">{User.Department}</div>
          </div>
        </Grid>
      </Grid>
      <Grid container rowSpacing={0}>
        <Grid item xs={12} className="product-details__listed-detail">
          <span className="product-details__product-cost">C${Cost}</span>
          <span className="product-details__listed-time">
            Listed on&nbsp;
            {new Date(PostedTimestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </Grid>
        <Grid item xs={12} margin={0} className="product-details__shipping">
          <LocalShippingIcon className="product-details__shipping-icon" />
          <p className="product-details__small-text">Offers shipping</p>
        </Grid>
        {Number(user?.UserID) !== listing.UserID ? (
          <Grid item xs={12} className="product-details__buttons">
            <Button
              variant="contained"
              color="secondary"
              sx={{ paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ ml: 2, paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
            >
              Buy Now
            </Button>
          </Grid>
        ) : null}
      </Grid>
      <DetailsMetaData />
      <div className="product-details__description-container">
        <div className="product-details__small-header">Description</div>
        <div className="product-details__description">{Description}</div>
      </div>
      {Number(user?.UserID) === listing.UserID ? <DeleteListingButton listingId={listing.ListingID} /> : null}
    </div>
  );
};

export default ProductDetails;
