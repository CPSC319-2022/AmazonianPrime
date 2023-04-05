import { TextField, Grid } from '@mui/material';
import './PaymentGrid.scss';
import AddressGrid from './AddressGrid';
// @ts-ignore
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRef } from 'react';
import moment from 'moment';

interface PaymentGridProps {
  setFirstNameInput: (e: string) => void;
  setLastNameInput: (e: string) => void;
  setCreditCardInput: (e: string) => void;
  expiryDateInput: any;
  setCVVInput: (e: string) => void;

  setBillingAddressInput: (e: string) => void;
  setBillingCityInput: (e: string) => void;
  setBillingProvinceInput: (e: string) => void;
  setBillingPostalCodeInput: (e: string) => void;
  setBillingCountryInput: (e: string) => void;
}

const today = new Date();
const adapter = new AdapterDayjs({});
const PaymentGrid: React.FC<PaymentGridProps> = ({
  setFirstNameInput,
  setLastNameInput,
  setCreditCardInput,
  expiryDateInput,
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
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="First Name"
              defaultValue=""
              size="small"
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Last Name"
              defaultValue=""
              size="small"
              onChange={(e) => setLastNameInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              helperText="16 to 19-digit number"
              label="Card Number"
              autoComplete="off"
              defaultValue=""
              size="small"
              type="number"
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 19);
              }}
              onChange={(e) => setCreditCardInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              size="small"
              label="CVV"
              autoComplete="off"
              defaultValue=""
              type="number"
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 4);
              }}
              onChange={(e) => setCVVInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                minDate={adapter.date(moment(today).add(1, 'M'))}
                defaultValue={adapter.date(moment(today).add(1, 'M'))}
                format="MM/YY"
                slotProps={{
                  textField: {
                    helperText: 'Expiry Date',
                  },
                }}
                inputRef={expiryDateInput}
                className="payment__date-picker"
                views={['month', 'year']}
              />
            </LocalizationProvider>
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
