import { Button } from '@mui/material';
import './CategoriesButton.scss';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../common/Categories';
import Menu from '../common/Menu';
import useMenu from '../common/useMenu';
import { getSlugCategory } from '../common/convertSlugCategory';
import { useDispatch } from 'react-redux';
import { setIsLoadingListings } from '../../redux/reducers/listingsSlice';

function CategoriesButton() {
  const { handleOpenMenu, handleCloseMenu, open, anchorEl } = useMenu();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRedirect = (category: string) => {
    dispatch(setIsLoadingListings({ isLoadingListings: true }));
    handleCloseMenu();
    navigate(`browse?category=${getSlugCategory(category)}&page=1`);
  };

  return (
    <>
      <Button className="categories-button" disableElevation onClick={handleOpenMenu}>
        Categories
      </Button>
      <Menu
        items={categories}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleCloseMenu}
        handleClick={handleRedirect}
      />
    </>
  );
}

export default CategoriesButton;
