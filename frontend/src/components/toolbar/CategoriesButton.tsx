import { Button } from '@mui/material';
import './CategoriesButton.scss';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryMenu from './CategoryMenu';

function CategoriesButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRedirect = (category: string) => {
    handleClose();
    navigate(`browse?category=${category.split(' ').join('-').toLocaleLowerCase()}&page=1`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button className="categories-button" disableElevation onClick={handleClick}>
        Categories
      </Button>
      <CategoryMenu anchorEl={anchorEl} open={open} handleClose={handleClose} handleClick={handleRedirect} />
    </>
  );
}

export default CategoriesButton;
