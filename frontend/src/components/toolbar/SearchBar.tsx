import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './SearchBar.scss';
import { Button, IconButton } from '@mui/material';
import CategoryMenu from './CategoryMenu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';
import { categories } from '../common/Categories';

function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const [activeCategory, setActiveCategory] = React.useState(categories[0]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const formattedSearchQuery = useMemo(() => searchQuery.split(' ').join('+'), [searchQuery]);
  const open = Boolean(anchorEl);
  const redirectURL = `browse?category=${activeCategory
    .split(' ')
    .join('-')
    .toLocaleLowerCase()}&q=${formattedSearchQuery}&page=1`;
  const handleOpenCategories = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (category: string) => {
    handleClose();
    setActiveCategory(category);
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
    setSearchQuery('');
    navigate(redirectURL);
  };

  return (
    <div className="search-bar">
      <Button className="search-bar__categories-button" onClick={handleOpenCategories}>
        <span className="search-bar__categories-text">{activeCategory}</span>
        <ArrowDropDownIcon />
      </Button>
      <CategoryMenu anchorEl={anchorEl} open={open} handleClose={handleClose} handleClick={handleClick} />
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
