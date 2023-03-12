import './BrowsePage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { useGetListingsQuery } from '../../redux/api/listings';
import { setListings } from '../../redux/reducers/listingsSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../common/Breadcrumbs';
import Gallery from '../common/Gallery';

function BrowsePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const searchQuery = searchParams.get('q')?.replace('+', ' ') || '';
  const paginatedListings = useAppSelector((state) => state.listings.listings);
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetListingsQuery({ category, page, name: searchQuery });

  useEffect(() => {
    if (data) {
      dispatch(setListings(data));
    }
  }, [data]);

  if (!page || !category) {
    navigate('/');
    return null;
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    navigate(`?category=${category}${searchQuery && `&q=${searchQuery}`}&page=${value}`);
  };

  return (
    <div>
      <Breadcrumbs />
      <Gallery
        totalListingsLength={Number(paginatedListings?.TotalListings)}
        listings={paginatedListings?.Data}
        isLoading={isLoading}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default BrowsePage;
