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
import { useDispatch } from 'react-redux';
import { setFailMessage, setQueueMessage, setSuccessMessage } from '../../redux/reducers/appSlice';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';

function CartPage() {
  const user = useAppSelector((state) => state.user.value);
  const [checkout] = useCheckoutMutation();
  const [retryCheckout] = useRetryCheckoutMutation();
  const [didCheckout, setDidCheckout] = useState(false);
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

  const getSummaryHeading = (title: string, cost: any, bold?: boolean) => {
    return (
      <div className="cart__listing-header-summary" style={{ fontWeight: bold ? 'bold' : 'normal' }}>
        <span className="cart__listing-name">{title}</span>
        <span className="cart__listing-cost">{Number(cost) ? costToString(cost) : cost}</span>
      </div>
    );
  };

  const orderSummaryText = <span className="cart__order-summary-title">Order Summary</span>;
  const clearStorage = () => {
    sessionStorage.removeItem('arn');
    sessionStorage.removeItem('taskToken');
    sessionStorage.removeItem('cartExpiryTime');
    window.dispatchEvent(new Event('cartExpiryTimeEvent'));
  };
  const handleCheckoutError = (reason?: string) => {
    setIsCheckingOut(false);
    clearStorage();
    dispatch(setFailMessage(reason ?? 'Failed to continue with the checkout. Please try again later'));
  };
  const handleCheckoutSuccess = () => {
    dispatch(setSuccessMessage("We've got your order! Please check for a confirmation email."));
    setDidCheckout(true);
    setIsCheckingOut(false);
  };
  const placeOrderButton = (disabled?: boolean) => (
    <div className="confetti-button">
      {didCheckout && <ConfettiExplosion duration={2800} />}
      <LoadingButton
        loading={isCheckingOut}
        onClick={() => {
          const cartExpiry = sessionStorage.getItem('cartExpiryTime');
          const now = new Date();
          const checkoutAddress = shippingAddresses && shippingAddresses[selectedAddress];
          const checkoutPayment = payments && payments[selectedPayment];
          setIsCheckingOut(true);
          dispatch(setQueueMessage('Hang tight while we process your payment!'));
          if (!checkoutAddress || !checkoutPayment) {
            setIsCheckingOut(false);
            return;
          }
          if (moment(now).isBefore(cartExpiry)) {
            retryCheckout({
              UserID: user?.UserID || '',
              body: {
                TaskToken: sessionStorage.getItem('taskToken') || '',
                ExecutionArn: sessionStorage.getItem('arn') || '',
                PaymentID: checkoutPayment.PaymentID,
              },
            })
              .unwrap()
              .then((result) => {
                if (result.status === 400) {
                  handleCheckoutError();
                  return;
                }
                clearStorage();
                handleCheckoutSuccess();
              })
              .catch((e: any) => {
                handleCheckoutError();
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
                  handleCheckoutError(
                    'We encountered an issue with the transaction. Please modify your payment details while we hold your items.',
                  );
                  sessionStorage.setItem('arn', result.ExecutionArn);
                  sessionStorage.setItem('taskToken', result.TaskToken);
                  sessionStorage.setItem('cartExpiryTime', result.ExpiryTime);
                  window.dispatchEvent(new Event('cartExpiryTimeEvent'));
                  return;
                }
                if (result.status === 400) {
                  handleCheckoutError();
                  return;
                }
                handleCheckoutSuccess();
              })
              .catch((e: any) => {
                handleCheckoutError();
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
      {getSummaryHeading('Order Total', <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'3em'} />)}
      {placeOrderButton(isLoading)}
    </div>
  );

  const noContent = didCheckout ? null : <NoContent message="Looks like your Cart is empty!" fixedPosition={false} />;

  const renderCartItems = () => {
    return cartItems && cartItems.TotalQuantity > 0 && !isLoading
      ? cartItems?.Items.map((order, index) => <CartItem key={index} order={order} />)
      : noContent;
  };

  const today = new Date();
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
                  const [month, year] = payment.ExpiryDate.split('/');
                  const expiryDate = moment({ year: Number('20' + year), month: Number(month), day: 1 });
                  const isExpired = moment(today).isAfter(expiryDate);
                  return (
                    <>
                      <div>
                        Credit Card ending in{' '}
                        <span className="address__grey">
                          {creditNumber.substring(creditNumber.length - 5, creditNumber.length)}
                        </span>
                        <span className="expiry-date">
                          {`Expire${isExpired ? 'd' : 's'} on`}&nbsp;{payment.ExpiryDate}
                        </span>
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
                      <span className="cart__listing-name-quantity">{`x${order.Quantity}`}</span>
                    </span>
                    <span className="cart__listing-cost">${costToString(listingQuantityCost)}</span>
                  </div>
                );
              })}
              <span className="cart__order-summary-half-border"></span>
              {getSummaryHeading(
                `Subtotal (${cartItems?.TotalQuantity} items) Before Tax`,
                `$${costToString(subtotal)}`,
              )}
              {getSummaryHeading('Estimated GST/HST', '$0.00')}
              {getSummaryHeading('Estimated PST/RST/QST', '$0.00')}
              <span className="cart__order-summary-border"></span>
              {getSummaryHeading(
                'Order Total',
                `$${costToString(Number((Math.round(Number(subtotal) * 100) / 100).toFixed(2)))}`,
                true,
              )}
              {placeOrderButton()}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CartPage;
