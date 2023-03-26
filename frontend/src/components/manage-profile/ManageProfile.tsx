import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';

import Breadcrumbs from '../common/Breadcrumbs';
import './ManageProfile.scss';
import { UserSettingsProfile } from './UserSettingsProfile';
import { useNavigate } from 'react-router-dom';
import { SellerSettingsProfile } from './SellerSettingsProfile';
import { PaymentSettings } from './PaymentSettings';
import { useState } from 'react';
import { AddressSettings } from './AddressSettings';

export const ManageProfile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Breadcrumbs />
      <div className="manage-profile__container">
        <div className="manage-profile__menu">
          <List>
            <ListItem disablePadding onClick={() => navigate('/manage-profile?page=1')}>
              <ListItemButton className="manage-profile__menu-btn">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User Settings" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding onClick={() => navigate('/manage-profile?page=2')}>
              <ListItemButton className="manage-profile__menu-btn">
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText primary="Seller Profile Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton className="manage-profile__menu-btn" onClick={handleClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Buyer Profile Settings" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  className="manage-profile__menu-btn"
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/manage-profile?page=3')}
                >
                  <ListItemIcon>
                    <PaymentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payment Details" />
                </ListItemButton>
                <ListItemButton
                  className="manage-profile__menu-btn"
                  sx={{ pl: 4 }}
                  onClick={() => navigate('/manage-profile?page=4')}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Shipping Address" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </div>
        <div className="manage-profile__settings-view">
          <UserSettingsProfile />
          <SellerSettingsProfile />
          <PaymentSettings />
          <AddressSettings />
        </div>
      </div>
    </>
  );
};
