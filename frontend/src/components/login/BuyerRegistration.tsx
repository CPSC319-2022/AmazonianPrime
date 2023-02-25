import './BuyerRegistration.scss';
import { Button, TextField, Grid } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useLazySignupQuery } from '../../redux/api/user';
import { setUser } from '../../redux/reducers/userSlice';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function BuyerRegistration() {
  const [useBillingAddressForShipping, setUseBillingAddressForShipping] = useState(true);
  const dispatch = useAppDispatch();
  const [triggerGetQuery, result] = useLazySignupQuery();

  if (result.data) {
    dispatch(setUser(result.data));
  }

  function register() {
    triggerGetQuery();
  }
  function handleShippingCheckbox() {
    setUseBillingAddressForShipping(!useBillingAddressForShipping);
  }

  return (
    <div className="buyer-registration-page">
      <div className="buyer-registration-page__box">
        <div className="buyer-registration-page__box-contents">
          <div className="buyer-registration-page__welcome">
            <span>Welcome to Amazonian Prime</span>
          </div>
          <div className="buyer-registration-page__prompt">
            <span>
              We’ve noticed that you’re a <p>new user.</p> Before you start connecting with fellow Amazonians, <br />
              please give us some more information about yourself.
            </span>
          </div>
          <div className="buyer-registration-page__forms">
            <div className="buyer-registration-page__payment-prompt">
              <span>Payment Details</span>
            </div>
            <div className="buyer-registration-page__payment-grid">
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <TextField fullWidth required label="First Name" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Last Name" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Card Number" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth required label="CVC" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth required label="MM / YY" defaultValue="" variant="filled" />
                </Grid>
              </Grid>
            </div>
            <div className="buyer-registration-page__billing-prompt">
              <span>Billing Address</span>
            </div>
            <div className="buyer-registration-page__billing-grid">
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <TextField fullWidth required label="Street Address" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="City" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Province" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Postal Code" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Country" defaultValue="" variant="filled" />
                </Grid>
              </Grid>
            </div>
            <div className="buyer-registration-page__shipping-prompt">
              <span>Shipping Address</span>
            </div>
            <div className="buyer-registration-page__shipping-contents">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox onChange={handleShippingCheckbox} defaultChecked />}
                  label="Same as billing address"
                />
              </FormGroup>
            </div>
            {!useBillingAddressForShipping && (
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <TextField fullWidth required label="Street Address" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="City" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Province" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Postal Code" defaultValue="" variant="filled" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth required label="Country" defaultValue="" variant="filled" />
                </Grid>
              </Grid>
            )}
          </div>
        </div>
        <Button
          color="secondary"
          variant="contained"
          className="buyer-registration-page__button"
          endIcon={<TrendingFlatIcon />}
          onClick={() => register()}
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}

export default BuyerRegistration;
