import { Breadcrumbs, Grid, Pagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useDeleteListingMutation,
  useGetListingsByUserIdQuery,
  useGetRecentListingsQuery,
} from '../../redux/api/listings';
import { setIsLoadingListings, setRecentListings } from '../../redux/reducers/listingsSlice';
import { useAppSelector } from '../../redux/store';
import Gallery from '../common/Gallery';
import NoContent from '../common/NoContent';
import ListingPreview from '../listing/ListingPreview';
import './MyListings.scss';

function MyListings() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  // TODO: use NEW query and redux storage (pending backend)
  // TODO: should update redux
  const user = useAppSelector((state) => state.user.value);
  const page = searchParams.get('page');
  const { data, isLoading } = useGetListingsByUserIdQuery({
    page: Number(page) ?? 1,
    listingUserId: user?.UserID || '',
  });
  const paginatedListings = useAppSelector((state) => state.listings.recentListings);
  useEffect(() => {
    dispatch(setIsLoadingListings({ isLoadingListings: isLoading }));
    if (data) {
      dispatch(setRecentListings(data));
    }
  }, [data, isLoading]);
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`?page=${value}`);
  };

  if (!isLoading && (!paginatedListings || paginatedListings.Data.length === 0)) {
    return <NoContent message="Looks like you haven't sold anything yet!" />;
  }
  return (
    <div className="browse">
      <Breadcrumbs aria-label="breadcrumb" className="my-listings__breadcrumbs">
        <Typography color="text.primary">My Listings</Typography>
      </Breadcrumbs>
      <Gallery
        totalListingsLength={Number(paginatedListings?.TotalListings)}
        listings={paginatedListings?.Data}
        handlePageChange={handlePageChange}
        showRemoveListingButton
      />
    </div>
  );
}

export default MyListings;
