import { useAppSelector } from '../../redux/store';
import './CartPage.scss';
// @ts-ignore
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';
import { Button, Grid, Skeleton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { AddressChange } from './AddressChange';
import useSticky from '../../utils/useSticky';
import NoContent from '../common/NoContent';
import { costToString } from '../../utils/costToString';
import { CartItem } from './CartItem';
import Breadcrumbs from '../common/Breadcrumbs';
import { useState } from 'react';
import { useGetPaymentsQuery, useGetShippingAddressQuery } from '../../redux/api/user';
import { useCheckoutMutation, useRetryCheckoutMutation } from '../../redux/api/shoppingCart';
import { ordersApi } from '../../redux/api/orders';
import { useDispatch } from 'react-redux';
import {
  setCartLock,
  setFailMessage,
  setQueueMessage,
  setSuccessMessage,
  unsetCartLock,
} from '../../redux/reducers/appSlice';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';
import { ExpiryDate } from '../common/ExpiryDate';

function CartPage() {
  const user = useAppSelector((state) => state.user.value);
  const { arn, taskToken, expiryDate: cartExpiryTime } = useAppSelector((state) => state.app);
  const isCartLocked = cartExpiryTime !== null;
  const [checkout] = useCheckoutMutation();
  const [retryCheckout] = useRetryCheckoutMutation();
  const [didCheckout, setDidCheckout] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const preferredShippingAddressIndex = useAppSelector((state) => state.user.preferredShippingAddressIndex);
  const [selectedAddress, setSelectedAddress] = useState(preferredShippingAddressIndex ?? 0);
  const { data: shippingAddresses } = useGetShippingAddressQuery(user?.UserID || '');
  const { data: payments } = useGetPaymentsQuery(user?.UserID || '');
  const [selectedPayment, setSelectedPayment] = useState(0);
  let subtotal = 0;
  const { sticky, stickyRef } = useSticky(45);
  const cartItems = useAppSelector((state) => state.cart.items);
  const isLoading = useAppSelector((state) => state.cart.isLoading) || !cartItems;
  const dispatch = useDispatch();

  const cartSummaryClass = sticky ? ' cart__order-summary-sticky' : '';

  const cartItemSkeleton = (
    <div className="cart__listing-container">
      <Skeleton className="listing-preview-skeleton__picture" variant="rectangular" height="150px" width="150px" />
      <div className="cart__listing-details">
        <div className="cart__listing-header">
          <span className="cart__listing-name">
            <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={350} />
          </span>
          <span className="cart__listing-cost">
            <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={70} />
          </span>
        </div>
        <Skeleton variant="text" sx={{ fontSize: '2em' }} width={180} />
        <div className="cart__listing-quantity-container">
          <Skeleton variant="text" sx={{ fontSize: '2em' }} width={120} />
        </div>
      </div>
    </div>
  );

  const getSummaryHeading = (title: string, cost?: any, bold?: boolean) => {
    return (
      <div className="cart__listing-header-summary" style={{ fontWeight: bold ? 'bold' : 'normal' }}>
        <span className="cart__listing-name">{title}</span>
        <div className="cart__listing-cost">
          {cost ? (
            <span>{Number(cost) ? costToString(cost) : cost}</span>
          ) : (
            <Skeleton variant="text" sx={{ fontSize: '1em' }} width={'3em'} />
          )}
        </div>
      </div>
    );
  };

  const orderSummaryText = <span className="cart__order-summary-title">Order Summary</span>;

  const handleCheckoutError = (reason?: string, clearCart: boolean = true) => {
    setIsCheckingOut(false);
    if (clearCart) {
      dispatch(unsetCartLock(null));
    }
    dispatch(setFailMessage(reason ?? 'We encountered an error in payment simulation. Please try again later'));
  };
  const handleCheckoutSuccess = () => {
    dispatch(setSuccessMessage("We've got your order! Please check for a confirmation email."));
    dispatch(ordersApi.util.invalidateTags(['Orders']));
    setDidCheckout(true);
    setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    setIsCheckingOut(false);
  };

  const placeOrderButton = (disabled?: boolean) => (
    <div className="confetti-button">
      {didCheckout && showConfetti && <ConfettiExplosion duration={3200} />}
      <LoadingButton
        loading={isCheckingOut}
        onClick={() => {
          const now = new Date();
          const checkoutAddress = shippingAddresses && shippingAddresses[selectedAddress];
          const checkoutPayment = payments && payments[selectedPayment];
          setIsCheckingOut(true);
          dispatch(setQueueMessage('Hang tight while we process your payment!'));
          if (!checkoutAddress || !checkoutPayment) {
            setIsCheckingOut(false);
            return;
          }
          if (moment(now).isBefore(cartExpiryTime)) {
            retryCheckout({
              UserID: user?.UserID || '',
              body: {
                TaskToken: taskToken || '',
                ExecutionArn: arn || '',
                PaymentID: checkoutPayment.PaymentID,
              },
            })
              .unwrap()
              .then((result) => {
                if (result.status === 400) {
                  handleCheckoutError();
                  return;
                }
                dispatch(unsetCartLock(null));
                handleCheckoutSuccess();
              })
              .catch((e: any) => {
                handleCheckoutError('We had an unexpected error. Please contact an administrator.');
              });
          } else {
            checkout({
              UserID: user?.UserID || '',
              AddressID: checkoutAddress.AddressID,
              PaymentID: checkoutPayment.PaymentID,
            })
              .unwrap()
              .then((result) => {
                if (result.TaskToken) {
                  dispatch(
                    setCartLock({
                      arn: result.ExecutionArn,
                      taskToken: result.TaskToken,
                      expiryDate: result.ExpiryTime,
                    }),
                  );
                  handleCheckoutError(
                    'We encountered an issue with the transaction. Please modify your payment details while we hold your items.',
                    false,
                  );
                  return;
                }
                if (result.status === 400) {
                  handleCheckoutError(
                    result.error?.name === 'PurchaseQuantityExceededError'
                      ? 'Looks like some items have been purchased since you were gone. Please update your Shopping Cart before proceeding.'
                      : undefined,
                  );
                  return;
                }
                handleCheckoutSuccess();
              })
              .catch((e: any) => {
                handleCheckoutError('We had an unexpected error. Please contact an administrator.');
              });
          }
        }}
        disabled={disabled || cartItems?.TotalQuantity === 0}
        startIcon={<ShoppingCartCheckoutIcon sx={{ fontSize: '1.2em' }} />}
        className="cart__checkout-button"
        size="small"
        fullWidth
        color="secondary"
        variant="contained"
      >
        Place Your Order
      </LoadingButton>
    </div>
  );

  const cartTotalSkeleton = (
    <div className="cart__order-summary">
      {orderSummaryText}
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'100%'} />
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'100%'} />
      <span className="cart__order-summary-half-border"></span>
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'100%'} />
      <span className="cart__order-summary-border"></span>
      {getSummaryHeading('Order Total', null)}
      {placeOrderButton(isLoading)}
    </div>
  );

  const noContent = didCheckout ? null : <NoContent message="Looks like your Cart is empty!" fixedPosition={false} />;

  const renderCartItems = () => {
    return cartItems && cartItems.TotalQuantity > 0 && !isLoading
      ? cartItems?.Items.map((order, index) => <CartItem isCartLockedInput={isCartLocked} key={index} order={order} />)
      : noContent;
  };

  return (
    <div>
      <Breadcrumbs />

      <Grid container className="cart-page">
        <Grid item xs={8}>
          <div className="cart__top-content">
            <div>
              <div className="cart__welcome-message">
                {`Welcome ${user?.FirstName}, to your Shopping Cart. Please review each item before checking out. `}
              </div>
            </div>
            <AddressChange
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              addresses={
                shippingAddresses?.map((address) => {
                  return `${address.StreetAddress}, ${address.CityName} ${address.Province}`;
                }) || []
              }
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              payments={
                payments?.map((payment) => {
                  const creditNumber = payment.CreditCardNum.toString();
                  return (
                    <>
                      <div>
                        Credit Card ending in{' '}
                        <span className="address__grey">
                          {creditNumber.substring(creditNumber.length - 5, creditNumber.length)}
                        </span>
                        <ExpiryDate date={payment.ExpiryDate} />
                      </div>
                      <div>
                        <span className="address-change__button-billing">Billing Address&nbsp;</span>
                        {payment.CardHolderName},&nbsp;{payment.StreetAddress},&nbsp;{payment.CityName}&nbsp;
                        {payment.Province}
                      </div>
                    </>
                  );
                }) || []
              }
            />
            <div className="cart__items-quantity">
              3&nbsp;&nbsp;Review Items&nbsp;{cartItems && `(${cartItems?.TotalQuantity || 0} items)`}
            </div>
          </div>
          {isLoading
            ? Array(3)
                .fill(0)
                .map(() => cartItemSkeleton)
            : renderCartItems()}
        </Grid>
        <Grid item xs={4}>
          {isLoading ? (
            cartTotalSkeleton
          ) : (
            <div className={`cart__order-summary` + cartSummaryClass} ref={stickyRef}>
              {orderSummaryText}
              {cartItems.Items?.map((order) => {
                const { Listing } = order;
                if (!Listing) {
                  return null;
                }
                const listingQuantityCost = order.Quantity * Listing.Cost;
                subtotal += listingQuantityCost;
                return (
                  <div className="cart__listing-header-summary">
                    <span className="cart__listing-name">
                      {Listing?.ListingName}&nbsp;
                      <span className="cart__listing-name-quantity">({`x${order.Quantity} $${Listing.Cost}`})</span>
                    </span>
                    <span className="cart__listing-cost">${costToString(listingQuantityCost)}</span>
                  </div>
                );
              })}
              <span className="cart__order-summary-half-border"></span>
              {getSummaryHeading(
                `Subtotal (${cartItems?.TotalQuantity} items) Before Tax`,
                cartItems.Subtotal && `$${costToString(cartItems.Subtotal)}`,
              )}
              {getSummaryHeading('Estimated GST/HST', cartItems.GSTTax && `$${costToString(cartItems.GSTTax)}`)}
              {getSummaryHeading('Estimated PST/RST/QST', cartItems.PSTTax && `$${costToString(cartItems.PSTTax)}`)}
              <span className="cart__order-summary-border"></span>
              {getSummaryHeading('Order Total', cartItems.TotalCost && `$${costToString(cartItems.TotalCost)}`, true)}
              {placeOrderButton()}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CartPage;
