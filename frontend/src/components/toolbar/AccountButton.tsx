import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMenu from '../../utils/useMenu';
import { getSlugCategory } from '../../utils/convertSlugCategory';
import { useNavigate } from 'react-router-dom';
import Menu from '../common/Menu';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userSlice';

export const AccountButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleOpenMenu, handleCloseMenu, open, anchorEl } = useMenu();
  const handleRedirect = (category: string) => {
    handleCloseMenu();
    if (category === 'Logout') {
      dispatch(setUser(null));
    } else {
      navigate(`${getSlugCategory(category)}?page=1`);
    }
  };
  return (
    <>
      <IconButton color="primary" component="label" onClick={handleOpenMenu}>
        <AccountCircleIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <Menu
        disableFirstItem
        anchorEl={anchorEl}
        open={open}
        handleClose={handleCloseMenu}
        handleClick={handleRedirect}
        items={['User Settings', 'Manage Profile', 'My Listings', 'Logout']}
      />
    </>
  );
};
