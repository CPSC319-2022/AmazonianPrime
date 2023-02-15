import './ProductDetails.scss';
import { useAppSelector } from '../../redux/store';
import { Button, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Details from './Details';
import Description from './Description';

function ProductDetails() {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const user = useAppSelector((state) => state.user.value);
  return (
    <div className="product-details">
      <h1 id="product-name">{listing?.listingName}</h1>
      <div id="seller-name" >{user?.firstName}&nbsp;{user?.lastName.charAt(0)}. </div>
      <br></br>
      <Grid container rowSpacing={0}>
        <Grid item xs={2}>
          <p id="product-cost"><b>${listing?.cost}</b></p>
        </Grid>
        <Grid item xs={10}>
          <p id="listed-time">Listed 1 hour ago</p>
        </Grid>
        <Grid item xs={0.5}>
          <p><LocalShippingIcon/></p>
        </Grid>
        <Grid item xs={11.5}>
          <p id="shipping-option">Offers shipping to desk and home</p>
        </Grid>
         <div className="buy-buttons">
          <Button variant="contained" color="secondary" className="to-cart-button"><b>Add to Cart</b></Button>
          &nbsp;
          &nbsp;
          <Button variant="contained" color="secondary" className="buy-now-button"><b>Buy Now</b></Button>
        </div>
      </Grid>
     
      <Details/>
      <Description{...user}/>

    </div>
  );
}

export default ProductDetails;
