import './BrowsePage.scss';
import { useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useGetListingsQuery } from '../../redux/api/listings';
import { setIsLoadingListings, setListings } from '../../redux/reducers/listingsSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../common/Breadcrumbs';
import Gallery from '../common/Gallery';
import { useDispatch } from 'react-redux';

function BrowsePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const searchQuery = searchParams.get('q')?.replace('+', ' ') || '';
  const paginatedListings = useAppSelector((state) => state.listings.listings);
  const dispatch = useDispatch();

  const { data, isLoading } = useGetListingsQuery({
    category: category ?? '',
    page: Number(page) ?? 1,
    name: searchQuery,
  });
  useEffect(() => {
    dispatch(setIsLoadingListings({ isLoadingListings: isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(setListings(data));
      dispatch(setIsLoadingListings({ isLoadingListings: false }));
    } else {
      dispatch(setIsLoadingListings({ isLoadingListings: true }));
    }
  }, [data]);

  if (!page || !category) {
    navigate('/');
    return null;
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setIsLoadingListings({ isLoadingListings: true }));
    navigate(`?category=${category}${searchQuery && `&q=${searchQuery}`}&page=${value}`);
  };

  return (
    <div>
      <Breadcrumbs />
      <Gallery
        totalListingsLength={Number(paginatedListings?.TotalListings)}
        listings={paginatedListings?.Data}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default BrowsePage;
