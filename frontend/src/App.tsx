import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './ThemeOverrides';
import { useAppSelector } from './redux/store';
import NavBar from './components/common/NavBar';
import { ReactNode } from 'react';
import LoginPage from './components/login/LoginPage';
import ProductDetailsPage from './components/product-details-page/ProductDetailsPage';
import Browse from './components/browse/Browse';

const AppWrapper = () => {
  const user = useAppSelector((state) => state.user.value);
  // TEMP
  const isLoggedIn = sessionStorage.getItem('user');

  const renderHomePage = (): ReactNode => {
    if (!user && !isLoggedIn) {
      return <LoginPage />;
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
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppWrapper;
