import { useAppSelector } from '../../redux/store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './CartPage.scss';
import { Grid } from '@mui/material';

function CartPage() {
  const user = useAppSelector((state) => state.user.value);
  return (
    <Grid container className="cart-page">
      <Grid item xs={12} className="cart__top-content">
        <div>
          <div className="cart-title">
            <ShoppingCartIcon fontSize="large" className="cart-icon" />
            <span>Shopping Cart</span>
          </div>
          <div className="cart__welcome-message">
            {`Welcome ${user?.FirstName} to your Shopping Cart. Please review each item before checking out. `}
          </div>
        </div>
        <div className="cart__items-quantity">{`Items (1)`}</div>
      </Grid>
      <Grid item xs={8}>
        hello
      </Grid>
      <Grid item xs={4}>
        bye
      </Grid>
    </Grid>
  );
}

export default CartPage;
