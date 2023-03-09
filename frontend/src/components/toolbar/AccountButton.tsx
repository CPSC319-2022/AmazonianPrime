import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMenu from '../common/useMenu';
import { getSlugCategory } from '../common/convertSlugCategory';
import { useNavigate } from 'react-router-dom';
import Menu from '../common/Menu';

export const AccountButton = () => {
  const navigate = useNavigate();
  const { handleOpenMenu, handleCloseMenu, open, anchorEl } = useMenu();
  const handleRedirect = (category: string) => {
    handleCloseMenu();
    navigate(`${getSlugCategory(category)}?page=1`);
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
        items={['User Settings', 'Manage Profile', 'My Listings']}
      />
    </>
  );
};