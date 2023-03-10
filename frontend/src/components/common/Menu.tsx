import './Menu.scss';
import * as React from 'react';
import MaterialMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

interface MenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => any;
  handleClick: (item: string) => any;
  disableFirstItem?: boolean;
  items: string[];
}
const Menu: React.FC<MenuProps> = ({ anchorEl, open, handleClose, handleClick, disableFirstItem = false, items }) => {
  return (
    <MaterialMenu className="menu__wrapper" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem
        disabled={disableFirstItem}
        className="menu__menu-item menu__all-text"
        onClick={() => handleClick(items[0])}
        disableRipple
      >
        {items[0]}
      </MenuItem>
      {items.slice(1, items.length).map((item: string) => (
        <div>
          <Divider className="menu__divider" />
          <MenuItem className="menu__menu-item" onClick={() => handleClick(item)} disableRipple>
            {item}
          </MenuItem>
        </div>
      ))}
    </MaterialMenu>
  );
};

export default Menu;
