import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './ThemeOverrides';
import { useAppDispatch, useAppSelector } from './redux/store';
import { useLocation } from 'react-router-dom';
import NavBar from './components/common/NavBar';
import { useEffect } from 'react';
import { useGetUserQuery } from './redux/api/user';
import { setUser } from './redux/reducers/userSlice';
import LoginPage from './components/login/LoginPage';
import BuyerRegistration from './components/login/BuyerRegistration';
import ProductDetailsPage from './components/product-details-page/ProductDetailsPage';

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  // TODO: remove this... this is temp work, but we should use logic to see if
  // user is logged in or not.
  const location = useLocation();
  const isOnLoginPage = location.pathname.includes('/login');
  // end TODO
  const { data } = useGetUserQuery();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <ThemeProvider theme={Theme}>
      {
        // TODO: remove this logic
      }
      {!isOnLoginPage && <NavBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/signup" element={<BuyerRegistration />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/listing/:listingId" element={<ProductDetailsPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppWrapper;
