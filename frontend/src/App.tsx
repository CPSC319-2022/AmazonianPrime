import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './ThemeOverrides';
import { useAppSelector } from './redux/store';
import NavBar from './components/common/NavBar';
import { ReactNode, useEffect } from 'react';
import LoginPage from './components/login/LoginPage';
import ProductDetailsPage from './components/product-details-page/ProductDetailsPage';
import OrdersPage from './components/orders/OrdersPage';
import CartPage from './components/cart/CartPage';
import MyListings from './components/my-listings/MyListings';
import BrowsePage from './components/browse-page/BrowsePage';
import BuyerRegistration from './components/login/BuyerRegistration';
import { useLazyLoginQuery } from './redux/api/user';
import { setUser } from './redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

const AppWrapper = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const jwt = sessionStorage.getItem('jwt');
  const [triggerGetQuery, result] = useLazyLoginQuery();
  if (result.data) {
    console.log(result.data)
    dispatch(setUser(result.data));
  }
  // If JWT is already saved in session
  useEffect(() => {
    console.log("JWT")
    if (jwt) {
      console.log(jwt)
      triggerGetQuery(jwt);
    }

  }, [user])
  console.log(user)
  const renderHomePage = (): ReactNode => {
    if (!user && !jwt) {
      return <LoginPage />;
    } else if (user && !user.Department) {
      return <BuyerRegistration />;
    } else {
      return <LandingPage />;
    }
  };

  return (
    <ThemeProvider theme={Theme}>
      {
        // TODO: remove this logic
      }
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
