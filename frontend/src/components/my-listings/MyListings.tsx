import { Breadcrumbs, Grid, Pagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetRecentListingsQuery } from '../../redux/api/listings';
import { setRecentListings } from '../../redux/reducers/listingsSlice';
import { useAppSelector } from '../../redux/store';
import Gallery from '../common/Gallery';
import ListingPreview from '../listing/ListingPreview';
import './MyListings.scss';

function MyListings() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // TODO: use NEW query and redux storage (pending backend)
  // TODO: should update redux
  const { data, isLoading } = useGetRecentListingsQuery();
  const page = searchParams.get('page');
  const listings = useAppSelector((state) => state.listings.recentListings);
  useEffect(() => {
    if (data) {
      dispatch(setRecentListings(data));
    }
  }, [data]);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`?page=${value}`);
  };
  const tempData = [...listings, ...listings, ...listings];
  return (
    <div className="browse">
      <Breadcrumbs aria-label="breadcrumb" className="my-listings__breadcrumbs">
        <Typography color="text.primary">My Listings</Typography>
      </Breadcrumbs>
      <Gallery listings={tempData} isLoading={isLoading} handlePageChange={handlePageChange} showRemoveListingButton />
    </div>
  );
}

export default MyListings;
