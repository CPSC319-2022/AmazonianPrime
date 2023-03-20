import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';
import { Alert, Button, Grid, IconButton, Snackbar } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DetailsMetaData from './DetailsMetaData';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import NoContent from '../common/NoContent';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeleteListingMutation } from '../../redux/api/listings';
import { useRef, useState } from 'react';
import DeleteListingButton from '../common/DeleteListingButton';
import { UserDisplayName } from '../common/UserDisplayName';
import { useAddListingToCartMutation } from '../../redux/api/shoppingCart';
import { costToString } from '../../utils/costToString';

interface ProductDetailsProps {
  isLoading: boolean;
}

// IF USRR ID OF LISTING == USER ID IN SESSION STORAGE

export const ProductDetails: React.FC<ProductDetailsProps> = ({ isLoading }) => {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const user = useAppSelector((state) => state.user.value);
  const [addListingToCart] = useAddListingToCartMutation();
  const itemInCart = useAppSelector((state) => state.cart.items)?.Items.find(
    (value) => value.ListingID === listing?.ListingID,
  );
  const [deleteListing] = useDeleteListingMutation();
  const [errorToast, setErrorToast] = useState(false);
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorToast(false);
  };
  const quantityRef = useRef<any>(null);
  if (!listing) {
    // TODO: add no results page
    if (isLoading) {
      return <ProductDetailsSkeleton />;
    }
    return <NoContent message="There was no listing found, please try again later!" />;
  }
  const { ListingName, Cost, User, Description, PostedTimestamp, ListingID } = listing;

  return (
    <div className="product-details">
      <Snackbar open={errorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          We ran into an issue adding {listing.ListingName} to your cart. Please try again later!
        </Alert>
      </Snackbar>
      <h1 className="product-details__name">{ListingName}</h1>
      <Grid container rowSpacing={0}>
        <Grid item xs={12}>
          <UserDisplayName user={User} />
        </Grid>
      </Grid>
      <Grid container rowSpacing={0}>
        <Grid item xs={12} className="product-details__listed-detail">
          <span className="product-details__product-cost">${costToString(Cost)}</span>
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
              onClick={() =>
                addListingToCart({
                  listing,
                  userId: user?.UserID || '',
                  body: {
                    ListingID,
                    Quantity: Number(quantityRef.current.value),
                  },
                })
                  .unwrap()
                  .catch(() => setErrorToast(true))
              }
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
      {itemInCart && !errorToast && (
        <span className="product-details__cart-description">
          You currently have {itemInCart.Quantity} order(s) of this item in your cart.
        </span>
      )}
      <DetailsMetaData quantityRef={quantityRef} />
      <div className="product-details__description-container">
        <div className="product-details__small-header">Description</div>
        <div className="product-details__description">{Description}</div>
      </div>
      {Number(user?.UserID) === listing.UserID ? (
        <DeleteListingButton
          failMessage="Failed to delete the listing. Please try again later."
          successMessage="Successfully deleted the listing!"
          handleClick={() => {
            return deleteListing({ ListingID: Number(listing.ListingID), UserID: user?.UserID || '' });
          }}
        />
      ) : null}
    </div>
  );
};

export default ProductDetails;
