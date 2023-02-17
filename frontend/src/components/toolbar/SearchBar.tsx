import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './SearchBar.scss';
import { Button } from '@mui/material';

function SearchBar() {
  // TODO: FIX ALL BUTTON
  return (
    <div className="search-bar">
      <Button className="search-bar__categories-button">
        All <ArrowDropDownIcon />
      </Button>
      <InputBase className="search-bar__input-base" placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      <div className="search-bar__search-icon">
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchBar;
