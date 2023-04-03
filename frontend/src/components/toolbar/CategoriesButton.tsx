import { Button } from '@mui/material';
import './CategoriesButton.scss';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories } from '../../utils/Categories';
import Menu from '../common/Menu';
import useMenu from '../../utils/useMenu';
import { getSlugCategory } from '../../utils/convertSlugCategory';
import { useDispatch } from 'react-redux';
import { setIsLoadingListings } from '../../redux/reducers/listingsSlice';

function CategoriesButton() {
  const [searchParams] = useSearchParams();
  const { handleOpenMenu, handleCloseMenu, open, anchorEl } = useMenu();
  const dispatch = useDispatch();
  const category = searchParams.get('category');
  const navigate = useNavigate();
  const handleRedirect = (redirectCategory: string) => {
    if (category === getSlugCategory(redirectCategory)) {
      handleCloseMenu();
      return;
    }
    dispatch(setIsLoadingListings({ isLoadingListings: true }));
    handleCloseMenu();
    navigate(`browse?category=${getSlugCategory(redirectCategory)}&page=1`);
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
