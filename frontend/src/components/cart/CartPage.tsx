import { useAppSelector } from '../../redux/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './CartPage.scss';
import { Button, Grid, Skeleton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { AddressChange } from './AddressChange';
import useSticky from '../../utils/useSticky';
import NoContent from '../common/NoContent';
import { costToString } from '../../utils/costToString';
import { CartItem } from './CartItem';

function CartPage() {
  const user = useAppSelector((state) => state.user.value);
  let subtotal = 0;
  const { sticky, stickyRef } = useSticky(45);
  const cartItems = useAppSelector((state) => state.cart.items);
  const isLoading = useAppSelector((state) => state.cart.isLoading) || !cartItems;

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
  const placeOrderButton = (disabled?: boolean) => (
    <Button
      onClick={() => alert('TODO')}
      disabled={disabled || cartItems?.TotalQuantity === 0}
      startIcon={<ShoppingCartCheckoutIcon sx={{ fontSize: '1.2em' }} />}
      className="cart__checkout-button"
      size="small"
      fullWidth
      color="secondary"
      variant="contained"
    >
      Place Your Order
    </Button>
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

  const renderCartItems = () => {
    return cartItems && cartItems.TotalQuantity > 0 && !isLoading ? (
      cartItems?.Items.map((order, index) => <CartItem key={index} order={order} />)
    ) : (
      <NoContent message="Looks like you your Cart is empty!" fixedPosition={false} />
    );
  };

  return (
    <Grid container className="cart-page">
      <Grid item xs={8}>
        <div className="cart__top-content">
          <div>
            <div className="cart-title">
              <ShoppingCartIcon fontSize="large" className="cart-icon" />
              <span>Shopping Cart</span>
            </div>
            <div className="cart__welcome-message">
              {`Welcome ${user?.FirstName}, to your Shopping Cart. Please review each item before checking out. `}
            </div>
          </div>
          <AddressChange />
          <div className="cart__items-quantity">
            3&nbsp;&nbsp;{`Review Items (${cartItems?.TotalQuantity || 0} items)`}
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
            {getSummaryHeading(`Subtotal (${cartItems?.TotalQuantity} items) Before Tax`, `$${costToString(subtotal)}`)}
            {getSummaryHeading('Estimated GST/HST', '$5.00')}
            {getSummaryHeading('Estimated PST/RST/QST', '$5.00')}
            <span className="cart__order-summary-border"></span>
            {getSummaryHeading('Order Total', '$5.00', true)}
            {placeOrderButton()}
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default CartPage;
