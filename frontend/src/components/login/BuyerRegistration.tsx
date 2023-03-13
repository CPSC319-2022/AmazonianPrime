import './BuyerRegistration.scss';
import { Button, TextField } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useSignupMutation } from '../../redux/api/user';
import { setUser } from '../../redux/reducers/userSlice';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PaymentGrid from '../common/PaymentGrid';
import AddressGrid from '../common/AddressGrid';

function BuyerRegistration() {
  const user = useAppSelector((state) => state.user.value);
  const [useBillingAddressForShipping, setUseBillingAddressForShipping] = useState(true);
  const dispatch = useAppDispatch();
  const [updateProfile, result] = useSignupMutation();

  // if (result.data) {
  //   dispatch(setUser(result.data));
  // }

  let updatedUser = {
    UserId: user?.UserID,
    FirstName: user?.FirstName,
    LastName: user?.LastName,
    Department: '',
  };

  function register() {
    console.log(updatedUser);
    // updateProfile(updatedUser);
  }
  function handleShippingCheckbox() {
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
          <TextField fullWidth required label="Department" 
          defaultValue="" variant="filled"
          className='department-input'
          onChange={handleDepartmentInput}
          />
          <div className="buyer-registration-page__forms">
            <PaymentGrid />
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
            {!useBillingAddressForShipping && <AddressGrid />}
          </div>
        </div>
        <div className="buyer-registration-page__action-buttons">
          <Button
            color="secondary"
            variant="contained"
            className="buyer-registration-page__continue-button"
            endIcon={<TrendingFlatIcon />}
            onClick={() => register()}
          >
            Start shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BuyerRegistration;
