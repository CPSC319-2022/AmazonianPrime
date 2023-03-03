import './CategoryMenu.scss';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { categories } from '../common/Categories';

interface CategoryMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => any;
  handleClick: (category: string) => any;
}
const CategoryMenu: React.FC<CategoryMenuProps> = ({ anchorEl, open, handleClose, handleClick }) => {
  return (
    <Menu className="categories-menu__menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem
        className="categories-menu__menu-item categories-menu__all-categories-text"
        onClick={() => handleClick(categories[0])}
        disableRipple
      >
        {categories[0]}
      </MenuItem>
      {categories.slice(1, categories.length).map((category: string) => (
        <div>
          <Divider className="categories-menu__divider" />
          <MenuItem className="categories-menu__menu-item" onClick={() => handleClick(category)} disableRipple>
            {category}
          </MenuItem>
        </div>
      ))}
    </Menu>
  );
};

export default CategoryMenu;
