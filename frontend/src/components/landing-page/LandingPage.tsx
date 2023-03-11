import ListingRow from '../listing/ListingRow';
import './LandingPage.scss';
import WelcomeContent from './WelcomeContent';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useGetRecentListingsQuery } from '../../redux/api/listings';
import { setRecentListings } from '../../redux/reducers/listingsSlice';

function LandingPage() {
  const listings = useAppSelector((state) => state.listings.recentListings);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetRecentListingsQuery();
  useEffect(() => {
    if (data) {
      dispatch(setRecentListings(data));
    }
  }, [data]);

  return (
    <div>
      <div className="landing-page__welcome-content">
        <WelcomeContent />
      </div>
      <>
        <ListingRow isLoading={isLoading} title={'Recently Added'} listings={[...listings, ...listings, ...listings]} />
        <ListingRow isLoading={isLoading} title={'Amazon Exclusives'} listings={listings} />
      </>
    </div>
  );
}

export default LandingPage;
