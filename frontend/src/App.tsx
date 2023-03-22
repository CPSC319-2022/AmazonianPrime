import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './ThemeOverrides';
import { useAppDispatch, useAppSelector } from './redux/store';
import NavBar from './components/common/NavBar';
import { ReactNode, useEffect } from 'react';
import LoginPage from './components/login/LoginPage';
import ProductDetailsPage from './components/product-details-page/ProductDetailsPage';
import OrdersPage from './components/orders/OrdersPage';
import CartPage from './components/cart/CartPage';
import MyListings from './components/my-listings/MyListings';
import BrowsePage from './components/browse-page/BrowsePage';
import BuyerRegistration from './components/login/BuyerRegistration';
import { useShoppingCartQuery } from './redux/api/shoppingCart';
import { addItemsToCart, setIsLoadingCart } from './redux/reducers/shoppingCartSlice';
import { Snackbar, Alert } from '@mui/material';
import { setFailMessage, setSuccessMessage } from './redux/reducers/appSlice';

const AppWrapper = () => {
  const user = useAppSelector((state) => state.user.value);
  const successMessage = useAppSelector((state) => state.app.successMessage);
  const failMessage = useAppSelector((state) => state.app.failMessage);
  const dispatch = useAppDispatch();
  const isLoggedIn = sessionStorage.getItem('user');
  const { data, isLoading } = useShoppingCartQuery(user?.UserID || '');

  const renderHomePage = (): ReactNode => {
    if (!user && !isLoggedIn) {
      return <LoginPage />;
    } else if (!user?.Department) {
      return <BuyerRegistration />;
    } else {
      return <LandingPage />;
    }
  };

  useEffect(() => {
    dispatch(setIsLoadingCart({ isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingCart(false));
      dispatch(addItemsToCart(data));
    }
  }, [data]);

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setFailMessage(null));
    dispatch(setSuccessMessage(null));
  };

  return (
    <ThemeProvider theme={Theme}>
      <NavBar />
      <Snackbar open={successMessage !== null} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={failMessage !== null} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {failMessage}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={renderHomePage()} />
        <Route path="/listing/:listingId" element={<ProductDetailsPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-listings" element={<MyListings />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppWrapper;
