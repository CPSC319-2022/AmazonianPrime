import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './ThemeOverrides';
import { useAppSelector } from './redux/store';
import NavBar from './components/common/NavBar';
import { ReactNode } from 'react';
import LoginPage from './components/login/LoginPage';
import ProductDetailsPage from './components/product-details-page/ProductDetailsPage';
import OrdersPage from './components/orders/OrdersPage';
import CartPage from './components/cart/CartPage';
import MyListings from './components/my-listings/MyListings';
import BrowsePage from './components/browse-page/BrowsePage';
import BuyerRegistration from './components/login/BuyerRegistration';

const AppWrapper = () => {
  const user = useAppSelector((state) => state.user.value);
  // TEMP
  const isLoggedIn = sessionStorage.getItem('user');

  const renderHomePage = (): ReactNode => {
    return <BuyerRegistration />;
  };

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
