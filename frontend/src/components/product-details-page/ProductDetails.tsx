import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';
import { Button, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DetailsMetaData from './DetailsMetaData';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';

interface ProductDetailsProps {
  isLoading: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ isLoading }) => {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  if (!listing) {
    // TODO: add no results page
    if (isLoading) {
      return <ProductDetailsSkeleton />;
    }
    return <div>No results!</div>;
  }
  const { listingName, cost, user } = listing;

  return (
    <div className="product-details">
      <h1 className="product-details__name">{listingName}</h1>
      <Grid container rowSpacing={0}>
        <Grid item xs={12} className="product-details__seller-details">
          <div className="product-details_user-avatar">
            {user.FirstName?.charAt(0)}
            {user.LastName?.charAt(0)}
          </div>
          <div className="product-details__user-name">
            {user.FirstName}&nbsp;{user.LastName?.charAt(0)}.
            <div className="product-details__user-department">Marketing</div>
          </div>
        </Grid>
      </Grid>
      <Grid container rowSpacing={0}>
        <Grid item xs={12} className="product-details__listed-detail">
          <span className="product-details__product-cost">C${cost}</span>
          <span className="product-details__listed-time">Listed 1 hour ago</span>
        </Grid>
        <Grid item xs={12} margin={0} className="product-details__shipping">
          <LocalShippingIcon className="product-details__shipping-icon" />
          <p className="product-details__small-text">Offers shipping to desk and home</p>
        </Grid>
        <Grid item xs={12} className="product-details__buttons">
          <Button
            variant="contained"
            color="secondary"
            sx={{ paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ ml: 2, paddingBottom: 0, paddingTop: 0, minWidth: 120, boxShadow: 0 }}
          >
            Buy Now
          </Button>
        </Grid>
      </Grid>
      <DetailsMetaData />
      <div>
        <div className="product-details__small-header">Description</div>
        <div className="product-details__description">{listing.description}</div>
      </div>
    </div>
  );
};

export default ProductDetails;
