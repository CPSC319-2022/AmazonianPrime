import { Button } from '@mui/material';
import './CategoriesButton.scss';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

function CategoriesButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const categories = [
    'Amazon Merchandise',
    'Apparel',
    'Electronis',
    'Office Supplies',
    'Garden & Outdoors',
    'Home Goods',
    'Pet Supplies',
    'Sporting Goods',
    'Toys & Games',
    'Miscellaneous',
  ];

  return (
    <>
      <Button className="categories-button" disableElevation onClick={handleClick}>
        Categories
      </Button>
      <Menu className="categories-button__menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem className="categories-button__menu-item categories-button__all-categories-text" onClick={handleClose} disableRipple>
          All Categories
        </MenuItem>
        {categories.map((category: string) => (
          <>
            <Divider sx={{ my: 0.5 }} className="categories-button__divider" />
            <MenuItem className="categories-button__menu-item" onClick={handleClose} disableRipple>
              {category}
            </MenuItem>
          </>
        ))}
      </Menu>
    </>
  );
}

export default CategoriesButton;
