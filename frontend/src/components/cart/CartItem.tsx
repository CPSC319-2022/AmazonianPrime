import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRemoveListingFromCartMutation } from '../../redux/api/shoppingCart';
import { setPartialListingDetails } from '../../redux/reducers/listingsSlice';
import { useAppSelector } from '../../redux/store';
import { ListingPreview } from '../../types/listingPreview';
import { ShoppingCartItem } from '../../types/shoppingCartItem';
import { costToString } from '../../utils/costToString';
import useBreadcrumbHistory from '../../utils/useBreadcrumbHistory';
import DeleteListingButton from '../common/DeleteListingButton';
import { QuantitySelect } from '../common/QuantitySelect';
import { UserDisplayName } from '../common/UserDisplayName';

interface CartItemProps {
  order: ShoppingCartItem;
}
export const CartItem: React.FC<CartItemProps> = ({ order }) => {
  const { Listing } = order;
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.value);
  const [selectQuantity, setSelectQuantity] = useState(order.Quantity);
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

  const listingQuantityCost = order.Quantity * Listing.Cost;
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
          <span className="cart__listing-name" onClick={() => navigateToListing(Listing)}>
            {Listing?.ListingName}&nbsp;<span className="cart__listing-name-quantity">{`x${order.Quantity}`}</span>
          </span>
          <span className="cart__listing-cost">${costToString(listingQuantityCost)}</span>
        </div>
        <div className="cart__listing-user">{Listing?.User && <UserDisplayName user={Listing?.User} />}</div>
        <div className="cart__listing-quantity-container">
          <span className="cart__listing-quantity">Quantity</span>
          <QuantitySelect
            defaultValue={order.Quantity}
            controlledValue={selectQuantity}
            setValue={setSelectQuantity}
            quantity={Listing.Quantity}
          />
        </div>
        <div className="cart__remove">
          <DeleteListingButton
            showIcon={false}
            successMessage={null}
            failMessage="We ran into an issue removing an item from your cart. Please try again later"
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
