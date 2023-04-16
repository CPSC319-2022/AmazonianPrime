import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';
import { Alert, Button, Grid, Snackbar, Tooltip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DetailsMetaData from './DetailsMetaData';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
import NoContent from '../common/NoContent';
import { useDeleteListingMutation } from '../../redux/api/listings';
import { useState } from 'react';
import DeleteListingButton from '../common/DeleteListingButton';
import { UserDisplayName } from '../common/UserDisplayName';
import { useAddListingToCartMutation, useUpdateListingToCartMutation } from '../../redux/api/shoppingCart';
import { costToString } from '../../utils/costToString';
import { useNavigate } from 'react-router-dom';
import useAdminPrivelege from '../../utils/useAdminPrivelege';

interface ProductDetailsProps {
  isLoading: boolean;
}

// IF USRR ID OF LISTING == USER ID IN SESSION STORAGE

export const ProductDetails: React.FC<ProductDetailsProps> = ({ isLoading }) => {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const navigate = useNavigate();
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const user = useAppSelector((state) => state.user.value);
  const [addListingToCart] = useAddListingToCartMutation();
  const isCartLocked = useAppSelector((state) => state.app.expiryDate) !== null;
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
  const [selectQuantity, setSelectQuantity] = useState(itemInCart?.Quantity || 1);
  const [updateListingToCart] = useUpdateListingToCartMutation();

  const handleQuantityChange = (value: number) => {
    if (itemInCart && listing) {
      const { Images, ...rest } = listing;
      updateListingToCart({
        listing: {
          ImagePreview: Images[0],
          ...rest,
        },
        userId: user?.UserID || '',
        body: {
          ListingID: listing.ListingID,
          Quantity: Number(value),
          ShoppingCartItemID: itemInCart.ShoppingCartItemID,
        },
      });
    }
    setSelectQuantity(value);
  };

  // TODO: add no results page
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!listing || !listing?.IsActiveListing) {
    return <NoContent message="There was no listing found, please try again later!" />;
  }
  const { ListingName, Cost, User, Description, PostedTimestamp, ListingID } = listing;
  const addToCart = () => {
    addListingToCart({
      listing,
      userId: user?.UserID || '',
      body: {
        ListingID,
        Quantity: Number(selectQuantity),
      },
    })
      .unwrap()
      .catch(() => setErrorToast(true));
  };

  let shownListingQuantity = listing.Quantity;
  if (shownListingQuantity <= 0 && isCartLocked) {
    shownListingQuantity = itemInCart?.Quantity ?? 0;
  }
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
        {Number(user?.UserID) !== listing.UserID &&
        !itemInCart &&
        !isAdminPrivelegeRequested &&
        listing.Quantity > 0 ? (
          <Grid item xs={12} className="product-details__buttons">
            <Tooltip title="You may not edit your cart while we hold your items." disableHoverListener={!isCartLocked}>
              <Button
                variant="contained"
                color="secondary"
                disabled={isCartLocked || shownListingQuantity === 0}
                onClick={() => {
                  addToCart();
                }}
                sx={{ paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
              >
                Add to Cart
              </Button>
            </Tooltip>
            <Tooltip title="You may not edit your cart while we hold your items." disableHoverListener={!isCartLocked}>
              <Button
                variant="contained"
                color="secondary"
                disabled={isCartLocked || shownListingQuantity === 0}
                sx={{ ml: 2, paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
                onClick={() => {
                  addToCart();
                  navigate('/cart');
                }}
              >
                Buy Now
              </Button>
            </Tooltip>
          </Grid>
        ) : null}
      </Grid>
      {!isAdminPrivelegeRequested && itemInCart && !errorToast && (
        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate('/cart');
            }}
            sx={{ paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
          >
            View Shopping Cart
          </Button>
          <span className="product-details__cart-description">
            You currently have {itemInCart.Quantity} order(s) of this item in your cart.
          </span>
        </div>
      )}
      <DetailsMetaData
        selectQuantity={selectQuantity}
        setSelectQuantity={handleQuantityChange}
        itemInCart={itemInCart}
      />
      <div className="product-details__description-container">
        <div className="product-details__small-header">Description</div>
        <div className="product-details__description">{Description}</div>
      </div>
      {Number(user?.UserID) === listing.UserID || isAdminPrivelegeRequested ? (
        <DeleteListingButton
          failMessage="Failed to delete the listing. Please try again later."
          successMessage={
            isAdminPrivelegeRequested ? (
              <span>Successfully deleted the listing. Please exit this page.</span>
            ) : (
              <span className="link-toast">
                <p>Successfully deleted your listing. View your other listings&nbsp;</p>
                <a href="/my-listings?page=1">here</a>.
              </span>
            )
          }
          queueMessage={`Hang tight while we delete ${isAdminPrivelegeRequested ? 'the' : 'your'} listing.`}
          handleClick={() => {
            return deleteListing({ ListingID: Number(listing.ListingID), UserID: user?.UserID || '' });
          }}
        />
      ) : null}
    </div>
  );
};

export default ProductDetails;
