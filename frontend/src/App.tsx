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

const AppWrapper = () => {
  const user = useAppSelector((state) => state.user.value);
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

  return (
    <ThemeProvider theme={Theme}>
      <NavBar />
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
