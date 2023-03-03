import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';
import { Button, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Details from './Details';

function ProductDetails() {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  if (!listing) {
    return null;
  }
  const { listingName, cost, user } = listing;

  return (
    <div className="product-details">
      <h1 className="product-details__name">{listingName}</h1>
      <Grid container rowSpacing={0}>
        <Grid item xs={0.9} marginTop={0.2} marginBottom={0.2}>
          <div className="product-details_user-avatar">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
        </Grid>
        <Grid item xs={11.1} marginTop={0.5}>
          <div className="product-details__user-name">
            {user.firstName}&nbsp;{user.lastName.charAt(0)}.<div className="product-details__user-department">Marketing</div>
          </div>
        </Grid>
      </Grid>
      <Grid container rowSpacing={0}>
        <Grid item xs={1.2}>
          <p className="product-details__product-cost">C${cost}</p>
        </Grid>
        <Grid item xs={10.8}>
          <p className="product-details__listed-time">Listed 1 hour ago</p>
        </Grid>
        <Grid item xs={0.5} className="product-details__shipping-icon" margin={0}>
          <p>
            <LocalShippingIcon />
          </p>
        </Grid>
        <Grid item xs={11.5} marginTop={1}>
          <p className="product-details__small-text">Offers shipping to desk and home</p>
        </Grid>
        <div className="product-details__buttons">
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
        </div>
      </Grid>
      <Details />
      <div>
        <div className="product-details__small-header">Description</div>
        <div className="product-details__description">{listing.description}</div>
      </div>
    </div>
  );
}

export default ProductDetails;
