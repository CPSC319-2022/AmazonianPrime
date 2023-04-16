import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  shoppingCartApi,
  useRemoveListingFromCartMutation,
  useUpdateListingToCartMutation,
} from '../../redux/api/shoppingCart';
import { setPartialListingDetails, unsetListingDetails } from '../../redux/reducers/listingsSlice';
import { useAppSelector } from '../../redux/store';
import { ListingPreview } from '../../types/listingPreview';
import { ShoppingCartItem } from '../../types/shoppingCartItem';
import { costToString } from '../../utils/costToString';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import useBreadcrumbHistory from '../../utils/useBreadcrumbHistory';
import DeleteListingButton from '../common/DeleteListingButton';
import { QuantitySelect } from '../common/QuantitySelect';
import { UserDisplayName } from '../common/UserDisplayName';
import { listingsApi } from '../../redux/api/listings';

interface CartItemProps {
  order: ShoppingCartItem;
  isCartLockedInput: boolean;
}
export const CartItem: React.FC<CartItemProps> = ({ order, isCartLockedInput }) => {
  const { Listing } = order;
  const dispatch = useDispatch();
  const isCartLocked = useAppSelector((state) => state.app.expiryDate) !== null;
  const user = useAppSelector((state) => state.user.value);
  const [selectQuantity, setSelectQuantity] = useState(order.Quantity);
  const [addListingToCart] = useUpdateListingToCartMutation();
  // Weird bug - need this to keep it up to date
  useEffect(() => {
    setSelectQuantity(order.Quantity);
  }, [order.Quantity]);

  const navigate = useNavigate();
  const [removeItem] = useRemoveListingFromCartMutation();
  const history = useBreadcrumbHistory();
  if (!Listing) return null;

  const navigateToListing = (listing: ListingPreview) => {
    dispatch(setPartialListingDetails(listing));
    navigate(`/listing/${listing.ListingID}`, { state: { ...history, previousPage: window.location.pathname } });
  };

  const listingQuantityCost = Number((Math.round(order.Quantity * Listing.Cost * 100) / 100).toFixed(2));

  const quantity = () => {
    const fixedQuantity = Listing.Quantity <= 0 ? 0 : Listing.Quantity;
    const shownListingQuantity = isCartLocked ? order.Quantity : fixedQuantity;

    return shownListingQuantity === 0 ? (
      <span>Sold out</span>
    ) : (
      <>
        <span className="cart__listing-quantity">Quantity</span>
        <QuantitySelect
          defaultValue={order.Quantity}
          controlledValue={selectQuantity}
          disabled={isCartLocked}
          tooltipContent={isCartLocked ? 'You may not edit your cart while we hold your items.' : ''}
          setValue={(value) => {
            addListingToCart({
              listing: Listing,
              userId: user?.UserID || '',
              body: {
                ListingID: Listing.ListingID,
                Quantity: Number(value),
                ShoppingCartItemID: order.ShoppingCartItemID,
              },
            });
            setSelectQuantity(value);
          }}
          quantity={shownListingQuantity}
        />
        {!isCartLocked && order.Quantity > Listing.Quantity ? (
          <div className="cart__listing-low-stock">
            <ErrorOutlineIcon color="primary" />
            <span>Looks like the stock has changed since you left</span>
          </div>
        ) : null}
      </>
    );
  };
  return (
    <div className="cart__listing-container">
      <img
        className="cart__listing-image"
        onClick={() => navigateToListing(Listing)}
        src={Listing?.ImagePreview}
        height="150px"
        width="130px"
      ></img>
      <div className="cart__listing-details">
        <div className="cart__listing-header">
          <span
            className="cart__listing-name"
            onClick={() => {
              dispatch(listingsApi.util.invalidateTags(['ListingDetails']));
              return navigateToListing(Listing);
            }}
          >
            {Listing?.ListingName}&nbsp;
            <span className="cart__listing-name-quantity">({`x${order.Quantity} $${Listing.Cost}`})</span>
          </span>
          <span className="cart__listing-cost">${costToString(listingQuantityCost)}</span>
        </div>
        <div className="cart__listing-user">{Listing?.User && <UserDisplayName user={Listing?.User} />}</div>
        <div className="cart__listing-quantity-container">{quantity()}</div>
        <div className="cart__remove">
          <DeleteListingButton
            showIcon={false}
            disabled={isCartLocked}
            tooltipContent={isCartLocked ? 'You may not edit your cart while we hold your items.' : ''}
            successMessage={null}
            failMessage="We ran into an issue removing an item from your cart. Please try again later"
            buttonText="Remove from cart"
            handleClick={() =>
              removeItem({
                quantityRemoved: selectQuantity,
                userId: user?.UserID || '',
                body: { ListingID: order.ListingID },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
