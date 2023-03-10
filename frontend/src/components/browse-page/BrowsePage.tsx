import './BrowsePage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useGetRecentListingsQuery } from '../../redux/api/listings';
import { setRecentListings } from '../../redux/reducers/listingsSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../common/Breadcrumbs';
import Gallery from '../common/Gallery';

function BrowsePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const searchQuery = searchParams.get('q')?.replace('+', ' ') || '';
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
    navigate(`?category=${category}${searchQuery && `&q=${searchQuery}`}&page=${value}`);
  };

  if (!listings)
    return (
      <div>
        <span>No content</span>
      </div>
    );

  const tempData = [...listings, ...listings, ...listings];
  // TODO: change
  const maxPageCount = 10;

  return (
    <div>
      <Breadcrumbs />
      <Gallery listings={tempData} isLoading={isLoading} handlePageChange={handlePageChange} />
    </div>
  );
}

export default BrowsePage;
