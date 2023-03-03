import './Breadcrumbs.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';

function Breadcrumbs() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('q')?.replace('+', ' ');

  return (
    <div className="breadcrumbs">
      <Button
        onClick={() => navigate(`?category=${category}&page=${1}`)}
        className="breadcrumbs__category"
        variant="text"
      >
        {category?.replace(/-/g, ' ')}
      </Button>
      {searchQuery && (
        <div className="breadcrumbs__search-string">
          <ArrowForwardIosIcon className="breadcrumbs__breadcrumb-separator" />
          <div>"{searchQuery}"</div>
        </div>
      )}
    </div>
  );
}

export default Breadcrumbs;
