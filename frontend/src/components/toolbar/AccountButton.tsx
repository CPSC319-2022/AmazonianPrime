import { Alert, IconButton, Snackbar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMenu from '../../utils/useMenu';
import { getSlugCategory } from '../../utils/convertSlugCategory';
import { useNavigate } from 'react-router-dom';
import Menu from '../common/Menu';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userSlice';
import useAdminPrivelege from '../../utils/useAdminPrivelege';
import { useState } from 'react';
import { userApi } from '../../redux/api/user';

export const AccountButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toastMessage, setToastMessage] = useState('');
  const { isAdmin, isAdminPrivelegeRequested, setPrivelege } = useAdminPrivelege();
  const switchAdminText = isAdmin
    ? [isAdminPrivelegeRequested ? 'Switch to User Privileges' : 'Switch to Admin Privileges']
    : [];
  const userPrivilegeButtons = !isAdminPrivelegeRequested ? ['Manage Profile', 'My Listings'] : [];

  const items = ['User Settings', 'Home', ...userPrivilegeButtons, ...switchAdminText, 'Logout'];
  const { handleOpenMenu, handleCloseMenu, open, anchorEl } = useMenu();
  const handleRedirect = (category: string) => {
    handleCloseMenu();
    if (category === 'Logout') {
      dispatch(setUser(null));
      sessionStorage.clear();
      dispatch(userApi.util.invalidateTags(['Banking']));
      window.dispatchEvent(new Event('storageChangeEvent'));
    } else if (category === 'Home') {
      navigate('/');
    } else if (category === 'Switch to User Privileges') {
      if (setPrivelege) {
        setPrivelege(false);
      }
      navigate('/');
      setToastMessage('You have successfully switched modes. You are now acting as a User.');
    } else if (category === 'Switch to Admin Privileges') {
      if (setPrivelege) {
        setPrivelege(true);
      }
      navigate('/');
      setToastMessage('You have successfully switched modes. You are now acting as an Administrator.');
    } else {
      navigate(`${getSlugCategory(category)}?page=1`);
    }
  };

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastMessage('');
  };
  return (
    <>
      <Snackbar open={toastMessage !== ''} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
      <IconButton color="primary" component="label" onClick={handleOpenMenu}>
        <AccountCircleIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        disableFirstItem
        anchorEl={anchorEl}
        open={open}
        handleClose={handleCloseMenu}
        handleClick={handleRedirect}
        items={items}
      />
    </>
  );
};
