import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './SearchBar.scss';
import { Button, IconButton } from '@mui/material';
import Menu from '../common/Menu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';
import { categories } from '../../utils/Categories';
import useMenu from '../../utils/useMenu';
import { getFriendlyCategoryString, getSlugCategory } from '../../utils/convertSlugCategory';
import { useDispatch } from 'react-redux';
import { setIsLoadingListings } from '../../redux/reducers/listingsSlice';

function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = searchParams.get('category');
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);
  const { handleOpenMenu, handleCloseMenu, open, anchorEl } = useMenu();
  const [searchQuery, setSearchQuery] = React.useState('');
  const formattedSearchQuery = useMemo(() => searchQuery.split(' ').join('-'), [searchQuery]);
  const redirectURL = `browse?category=${getSlugCategory(activeCategory)}&q=${formattedSearchQuery}&page=1`;
  const handleClick = (newCategory: string) => {
    handleCloseMenu();
    setActiveCategory(newCategory);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  useEffect(() => {
    setActiveCategory(category?.replace(/-/g, ' ') || categories[0]);
  }, [searchParams]);

  const search = () => {
    if (formattedSearchQuery.length === 0) {
      return;
    }
    dispatch(setIsLoadingListings({ isLoadingListings: true }));
    setSearchQuery('');
    navigate(redirectURL);
  };

  return (
    <div className="search-bar">
      <Button className="search-bar__categories-button" onClick={handleOpenMenu}>
        <span className="search-bar__categories-text">{getFriendlyCategoryString(activeCategory)}</span>
        <ArrowDropDownIcon />
      </Button>
      <Menu
        items={categories}
        anchorEl={anchorEl}
        open={open}
        handleClose={handleCloseMenu}
        handleClick={handleClick}
      />
      <InputBase
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        value={searchQuery}
        className="search-bar__input-base"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton onClick={search} aria-label="search" className="search-bar__search-icon">
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBar;
