import './Breadcrumbs.scss';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Link, Typography, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { getFriendlyCategoryString } from './convertSlugCategory';
import { Paths } from '../../Paths';

function Breadcrumbs() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const { listingId } = useParams();
  const category = searchParams.get('category') ?? location.state?.category;
  const searchQuery = searchParams.get('q')?.replace('-', ' ') ?? location.state?.searchQuery;
  const page = location.state?.page;

  let breadCrumbs = [];
  // This is the order in which the breadcrumbs will appear
  if (category) {
    breadCrumbs = [
      {
        link: getFriendlyCategoryString(category),
        navigate: `/browse?category=${category}&page=${page ?? 1}`,
      },
    ];

    if (searchQuery) {
      breadCrumbs = [
        ...breadCrumbs,
        {
          link: `"${searchQuery}"`,
          navigate: `/browse?category=${category}${searchQuery && `&q=${searchQuery}`}&page=${page ?? 1}`,
        },
      ];
    }
  } else if (location.state?.previousPage === Paths.MyListings) {
    breadCrumbs = [
      {
        link: 'My Listings',
        navigate: `${Paths.MyListings}?page=${page ?? 1}`,
      },
    ];
  } else {
    breadCrumbs = [
      {
        link: 'Home',
        navigate: Paths.Home,
      },
    ];
  }
  if (listingId && listing?.ListingName) {
    breadCrumbs = [
      ...breadCrumbs,
      {
        link: listing.ListingName,
        navigate: '',
      },
    ];
  }

  return (
    <div className="breadcrumbs">
      <MUIBreadcrumbs aria-label="breadcrumb" className="breadcrumbs__category">
        {breadCrumbs.map(({ link, navigate }: { link: string; navigate: string }, index: number) => {
          return index === breadCrumbs.length - 1 ? (
            <Typography className="breadcrumbs__final-string" color="text.primary">
              {link}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" href={navigate}>
              {link}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
}

export default Breadcrumbs;
