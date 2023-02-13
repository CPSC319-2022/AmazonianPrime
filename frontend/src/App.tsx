import { Route, useParams, Routes } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './ThemeOverrides';
import { useAppDispatch } from './redux/store';
import NavBar from './components/common/NavBar';
import { useEffect } from 'react';
import { useGetUserQuery } from './redux/api/user';
import { setUser } from './redux/reducers/userSlice';
import ProductDetailsPage from './components/product-details-page/ProductDetailsPage';

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetUserQuery();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  return (
    <ThemeProvider theme={Theme}>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/listing/:listingId" element={<ProductDetailsPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppWrapper;
