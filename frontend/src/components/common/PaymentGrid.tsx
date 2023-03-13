import { TextField, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPayment } from '../../redux/reducers/paymentSlice';
import { setPaymentAddress } from '../../redux/reducers/paymentAddressSlice';
import './PaymentGrid.scss';
import AddressGrid from './AddressGrid';

function PaymentGrid() {
  const user = useAppSelector((state) => state.user.value);
  const payment = useAppSelector((state) => state.payment.value);
  const paymentAddress = useAppSelector((state) => state.paymentAddress.value);

  const dispatch = useAppDispatch();

  let paymentInfo = { 
    UserID: user?.UserID, 
    AddressID: payment?.AddressID, 
    CreditCardNum: payment?.CreditCardNum, 
    ExpiryDate: payment?.ExpiryDate, 
    CVV: payment?.CVV, 
    CardHolderName: payment?.CardHolderName,

    FirstName: payment?.FirstName,
    LastName: payment?.LastName,
  }

  function handleFirstNameInput(input: any) {
    paymentInfo.FirstName = input.target.value
    paymentInfo.CardHolderName = paymentInfo.FirstName + " " + paymentInfo.LastName

    dispatch(setPayment(paymentInfo));
  }

  function handleLastNameInput(input: any) {
    paymentInfo.LastName = input.target.value
    paymentInfo.CardHolderName = paymentInfo.FirstName + " " + paymentInfo.LastName

    dispatch(setPayment(paymentInfo));
  }

  function handleCardNumberInput(input: any) {
    paymentInfo.CreditCardNum = input.target.value

    dispatch(setPayment(paymentInfo));
  }

  function handleCVVInput(input: any) {
    paymentInfo.CVV = input.target.value

    dispatch(setPayment(paymentInfo));
  }

  function handleExpiryDateInput(input: any) {
    paymentInfo.ExpiryDate = input.target.value

    dispatch(setPayment(paymentInfo));
  }

  return (
    <div className="payment-grid">
      <div className="payment-grid__payment-prompt">
        <span>Payment Details</span>
      </div>
      <div className="payment-grid__grid">
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <TextField fullWidth required label="First Name" defaultValue="" variant="filled" onChange={handleFirstNameInput} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth required label="Last Name" defaultValue="" variant="filled" onChange={handleLastNameInput} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth required label="Card Number" defaultValue="" variant="filled" onChange={handleCardNumberInput}/>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth required label="CVV" defaultValue="" variant="filled" onChange={handleCVVInput}/>
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth required label="MM / YY" defaultValue="" variant="filled" onChange={handleExpiryDateInput}/>
          </Grid>
        </Grid>
      </div>
      <div className="payment-grid__address-prompt">
        <span>Billing Address</span>
      </div>
      <AddressGrid isBillingAddress={true} isShippingAddress={false}/>
    </div>
  );
}

export default PaymentGrid;
