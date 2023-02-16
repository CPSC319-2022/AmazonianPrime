import './ProductDetails.scss';
import React from 'react';
import { useAppSelector } from '../../redux/store';
import { Button, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Details from './Details';
import { Listing } from '../../types/listing';

interface ListingPreviewProps {
  listing: Listing;
}

function ProductDetails () {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  if (!listing) {
    return null;
  }
  const { listingName, cost, condition, user, id } = listing;

  return (
    <div className="product-details">
      <h1 className="product-name">{listingName}</h1>
      <div>
        {user.firstName}&nbsp;{user.lastName.charAt(0)}.{' '}
      </div> 
      <br></br>
      <Grid container rowSpacing={0}>
        <Grid item xs={2}>
          <p className="product-cost">
            <b>${cost}</b>
          </p>
        </Grid>
        <Grid item xs={10}>
          <p className="listed-time">Listed 1 hour ago</p>
        </Grid>
        <Grid item xs={0.5}>
          <p>
            <LocalShippingIcon />
          </p>
        </Grid>
        <Grid item xs={11.5} marginTop={1}>
          <p className="shipping-option">Offers shipping to desk and home</p>
        </Grid>
        <div>
          <Button variant="contained" color="secondary">
            <b>Add to Cart</b>
          </Button>
          <Button variant="contained" color="secondary" sx={{ml: 3}}>
            <b>Buy Now</b>
          </Button>
        </div>
      </Grid>
 <Details />
      <div>
        <h3>Description</h3>
        <div>{listing.description}</div>
      </div>
    </div>
  );

}

export default ProductDetails;
