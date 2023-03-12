import ListingRow from '../listing/ListingRow';
import './LandingPage.scss';
import WelcomeContent from './WelcomeContent';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useGetListingsQuery, useGetRecentListingsQuery } from '../../redux/api/listings';
import { setAmazonExclusives, setRecentListings } from '../../redux/reducers/listingsSlice';

function LandingPage() {
  const paginatedRecentListings = useAppSelector((state) => state.listings.recentListings);
  const paginatedAmazonExclusives = useAppSelector((state) => state.listings.amazonExlusives);
  const dispatch = useAppDispatch();
  const { data: recentListings, isLoading: isLoadingRecentListings } = useGetRecentListingsQuery();
  const { data: amazonExclusives, isLoading: isLoadingAmazonExclusives } = useGetListingsQuery({
    page: 1,
    category: 'amazon-merchandise',
    name: '',
  });
  useEffect(() => {
    if (recentListings) {
      dispatch(setRecentListings(recentListings));
    }
    if (amazonExclusives) {
      dispatch(setAmazonExclusives(amazonExclusives));
    }
  }, [recentListings, amazonExclusives]);

  return (
    <div>
      <div className="landing-page__welcome-content">
        <WelcomeContent />
      </div>
      <>
        <ListingRow
          isLoading={isLoadingRecentListings}
          title={'Recently Added'}
          listings={paginatedRecentListings?.Data}
        />
        <ListingRow
          isLoading={isLoadingAmazonExclusives}
          title={'Amazon Merchandise'}
          listings={paginatedAmazonExclusives?.Data}
        />
      </>
    </div>
  );
}

export default LandingPage;
