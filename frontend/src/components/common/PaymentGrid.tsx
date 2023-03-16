import { TextField, Grid } from '@mui/material';
import './PaymentGrid.scss';
import AddressGrid from './AddressGrid';

interface PaymentGridProps {
  setFirstNameInput: (e: string) => void;
  setLastNameInput: (e: string) => void;
  setCreditCardInput: (e: string) => void;
  setExpiryDateInput: (e: string) => void;
  setCVVInput: (e: string) => void;

  setBillingAddressInput: (e: string) => void;
  setBillingCityInput: (e: string) => void;
  setBillingProvinceInput: (e: string) => void;
  setBillingPostalCodeInput: (e: string) => void;
  setBillingCountryInput: (e: string) => void;
}

const PaymentGrid: React.FC<PaymentGridProps> = ({
  setFirstNameInput,
  setLastNameInput,
  setCreditCardInput,
  setExpiryDateInput,
  setCVVInput,

  setBillingAddressInput,
  setBillingCityInput,
  setBillingProvinceInput,
  setBillingPostalCodeInput,
  setBillingCountryInput,
}) => {
  return (
    <div className="payment-grid">
      <div className="payment-grid__payment-prompt">
        <span>Payment Details</span>
      </div>
      <div className="payment-grid__grid">
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="First Name"
              defaultValue=""
              variant="filled"
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Last Name"
              defaultValue=""
              variant="filled"
              onChange={(e) => setLastNameInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Card Number"
              defaultValue=""
              variant="filled"
              onChange={(e) => setCreditCardInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              label="CVV"
              defaultValue=""
              variant="filled"
              onChange={(e) => setCVVInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              label="MM / YY"
              defaultValue=""
              variant="filled"
              onChange={(e) => setExpiryDateInput(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      <div className="payment-grid__address-prompt">
        <span>Billing Address</span>
      </div>
      <AddressGrid
        setAddressInput={setBillingAddressInput}
        setCityInput={setBillingCityInput}
        setProvinceInput={setBillingProvinceInput}
        setPostalCodeInput={setBillingPostalCodeInput}
        setCountryInput={setBillingCountryInput}
      />
    </div>
  );
};

export default PaymentGrid;
