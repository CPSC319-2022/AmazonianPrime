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
  const paymentAddress = useAppSelector((state) => state.paymentAddress.value);
  const shippingAddress = useAppSelector((state) => state.shippingAddress.value);

  const [useBillingAddressForShipping, setUseBillingAddressForShipping] = useState(true);

  const [departmentInput, setDepartmentInput] = useState('');

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [creditCardInput, setCreditCardInput] = useState('');
  const [expiryDateInput, setExpiryDateInput] = useState('');
  const [cvvInput, setCVVInput] = useState('');

  const [billingAddressInput, setBillingAddressInput] = useState('');
  const [billingCityInput, setBillingCityInput] = useState('');
  const [billingProvinceInput, setBillingProvinceInput] = useState('');
  const [billingPostalCodeInput, setBillingPostalCodeInput] = useState('');
  const [billingCountryInput, setBillingCountryInput] = useState('');

  const [shippingAddressInput, setShippingAddressInput] = useState('');
  const [shippingCityInput, setShippingCityInput] = useState('');
  const [shippingProvinceInput, setShippingProvinceInput] = useState('');
  const [shippingPostalCodeInput, setShippingPostalCodeInput] = useState('');
  const [shippingCountryInput, setShippingCountryInput] = useState('');

  const dispatch = useAppDispatch();
  const [updateProfile, result] = useSignupMutation();

  let updatedUser = {
    UserId: user?.UserID,
    FirstName: user?.FirstName,
    LastName: user?.LastName,
    Department: '',
  };

  let paymentInfo = {
    UserID: user?.UserID,
    AddressID: payment?.AddressID,
    CreditCardNum: payment?.CreditCardNum,
    ExpiryDate: payment?.ExpiryDate,
    CVV: payment?.CVV,
    CardHolderName: payment?.CardHolderName,

    FirstName: payment?.FirstName,
    LastName: payment?.LastName,
  };

  function register() {
    //dispatch(setUser(updatedUser));
    //updateProfile(updatedUser);
    console.log(departmentInput);
    console.log(firstNameInput, lastNameInput, creditCardInput, cvvInput, expiryDateInput);
    console.log(
      billingAddressInput,
      billingCityInput,
      billingCountryInput,
      billingPostalCodeInput,
      billingProvinceInput,
    );
    console.log(
      shippingAddressInput,
      shippingCityInput,
      shippingCountryInput,
      shippingPostalCodeInput,
      shippingProvinceInput,
    );
  }

  function handleShippingCheckbox() {
    if (paymentAddress) {
      const { IsShipAddr, ...rest } = paymentAddress;
      dispatch(setPaymentAddress({ ...rest, IsShipAddr: !useBillingAddressForShipping }));
    }
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
            onChange={(e) => setDepartmentInput(e.target.value)}
          />
          <div className="buyer-registration-page__forms">
            <PaymentGrid
              setFirstNameInput={setFirstNameInput}
              setLastNameInput={setLastNameInput}
              setCreditCardInput={setCreditCardInput}
              setExpiryDateInput={setExpiryDateInput}
              setCVVInput={setCVVInput}
              setBillingAddressInput={setBillingAddressInput}
              setBillingCityInput={setBillingCityInput}
              setBillingProvinceInput={setBillingProvinceInput}
              setBillingPostalCodeInput={setBillingPostalCodeInput}
              setBillingCountryInput={setBillingCountryInput}
            />
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
              <AddressGrid
                setAddressInput={setShippingAddressInput}
                setCityInput={setShippingCityInput}
                setProvinceInput={setShippingProvinceInput}
                setPostalCodeInput={setShippingPostalCodeInput}
                setCountryInput={setShippingCountryInput}
              />
            )}
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
