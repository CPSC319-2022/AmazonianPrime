import './BuyerRegistration.scss';
import { Button, TextField } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useSignupMutation } from '../../redux/api/user';
import { setUser } from '../../redux/reducers/userSlice';
import { setPayment } from '../../redux/reducers/paymentSlice';
import { setPaymentAddress } from '../../redux/reducers/paymentAddressSlice';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PaymentGrid from '../common/PaymentGrid';
import AddressGrid from '../common/AddressGrid';

function BuyerRegistration() {
  const user = useAppSelector((state) => state.user.value);
  const payment = useAppSelector((state) => state.payment.value);
  let paymentAddress = useAppSelector((state) => state.paymentAddress.value);
  let shippingAddress = useAppSelector((state) => state.shippingAddress.value);

  const [useBillingAddressForShipping, setUseBillingAddressForShipping] = useState(true);
  const dispatch = useAppDispatch();
  const [updateProfile, result] = useSignupMutation();

  let updatedUser = {
    UserId: user?.UserID,
    FirstName: user?.FirstName,
    LastName: user?.LastName,
    Department: '',
  };

  function register() {
    //dispatch(setUser(updatedUser));
    //updateProfile(updatedUser);
    console.log(payment);
    console.log(paymentAddress);
    console.log(shippingAddress);
  }

  function handleShippingCheckbox() {
    if (paymentAddress) {
      const { IsShipAddr, ...rest } = paymentAddress;
      dispatch(setPaymentAddress({ ...rest, IsShipAddr: !useBillingAddressForShipping }));
    }
    setUseBillingAddressForShipping(!useBillingAddressForShipping);
  }

  function handleDepartmentInput(input: any) {
    updatedUser.Department = input.target.value;
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
          <div className="buyer-registration-page__department-prompt">
            <span>Department</span>
          </div>
          <TextField
            fullWidth
            required
            label="Department"
            defaultValue=""
            variant="filled"
            className="department-input"
            onChange={handleDepartmentInput}
          />
          <div className="buyer-registration-page__forms">
            <PaymentGrid useBillingAddressForShipping={useBillingAddressForShipping} />
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
            {!useBillingAddressForShipping && <AddressGrid isBillingAddress={false} isShippingAddress={true} />}
          </div>
        </div>
        <div className="buyer-registration-page__action-buttons">
          <Button color="secondary" variant="contained" endIcon={<TrendingFlatIcon />} onClick={() => register()}>
            Start shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BuyerRegistration;
