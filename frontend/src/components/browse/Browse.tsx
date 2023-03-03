import PinDropIcon from '@mui/icons-material/PinDrop';
import './Browse.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useGetRecentListingsQuery } from '../../redux/api/listings';
import { setRecentListings } from '../../redux/reducers/listingsSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListingPreview from '../listing/ListingPreview';
import { Grid, Pagination } from '@mui/material';

function Browse() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const listings = useAppSelector((state) => state.listings.recentListings);
  const dispatch = useAppDispatch();

  // TODO: use NEW query and redux storage (pending backend)
  const { data, isLoading } = useGetRecentListingsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setRecentListings(data));
    }
  }, [data]);

  if (!page || !category) {
    navigate('/');
    return null;
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`?category=${category}&page=${value}`);
  };

  if (!listings)
    return (
      <div className="Browse">
        <span className="Browse__content">Amazonian Prime</span>
      </div>
    );

  const tempData = [...listings, ...listings, ...listings];
  // TODO: change
  const maxPageCount = 10;

  return (
    <div className="browse">
      <div className="browse__category">{category?.replace(/-/g, ' ')}</div>
      <div className="browse__container">
        <Grid container className="browse__container-grid" columns={4}>
          {(!isLoading ? tempData : Array(20).fill(0)).map((listing, index) => (
            <Grid item xs={1} className="browse__container__grid-item" key={index}>
              <ListingPreview listing={listing} key={index} imageHeight="80%" imageWidth="100%" />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination className="browse__pagination" count={maxPageCount} page={Number(page)} onChange={handlePageChange} />
    </div>
  );
}

export default Browse;
