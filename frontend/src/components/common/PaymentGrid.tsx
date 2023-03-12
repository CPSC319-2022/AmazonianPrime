import { TextField, Grid } from '@mui/material';
import './PaymentGrid.scss';
import AddressGrid from './AddressGrid';

function PaymentGrid() {
  return (
    <div className='payment-grid'>
      <div className="payment-grid__payment-prompt">
        <span>Payment Details</span>
      </div>
      <div className="payment-grid__grid">
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
      <div className="payment-grid__address-prompt">
        <span>Billing Address</span>
      </div>
      <AddressGrid />
    </div>
  );
}

export default PaymentGrid;
