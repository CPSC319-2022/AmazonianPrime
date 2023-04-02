import './BuyerRegistration.scss';
import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import {
  useSignupMutation,
  useAddAddressMutation,
  useAddPaymentMutation,
  useAddShippingAddressMutation,
} from '../../redux/api/user';
import { setUser, setPayment, setPaymentAddress, setShippingAddress } from '../../redux/reducers/userSlice';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PaymentGrid from '../common/PaymentGrid';
import AddressGrid from '../common/AddressGrid';
import { LoadingButton } from '@mui/lab';
import { UserSetting } from '../common/UserSettings';

function BuyerRegistration() {
  const user = useAppSelector((state) => state.user.value);

  const [useBillingAddressForShipping, setUseBillingAddressForShipping] = useState(true);
  const [loading, setIsLoading] = useState(false);

  const [departmentInput, setDepartmentInput] = useState('');

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [creditCardInput, setCreditCardInput] = useState('');
  const expiryDateInput = useRef<any>(null);
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

  const profileFirstNameInput = useRef<any>(null);
  const profileLastNameInput = useRef<any>(null);
  const [openErrorToast, setOpenErrorToast] = useState('');

  const dispatch = useAppDispatch();
  const [updateProfile, updateProfileResult] = useSignupMutation();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const [addAddress, addAddressResult] = useAddAddressMutation();
  const [updatePayment, addPaymentResult] = useAddPaymentMutation();

  if (addPaymentResult.data) {
    dispatch(setPayment(addPaymentResult.data));
  }

  async function register() {
    const updatedUser = {
      UserID: user?.UserID,
      FirstName: profileFirstNameInput.current?.value || user?.FirstName,
      LastName: profileLastNameInput.current?.value || user?.LastName,
      Department: departmentInput,
    };

    if (!updatedUser.FirstName || !updatedUser.LastName || !updatedUser.Department) {
      setOpenErrorToast('Please fill all required Profile fields!');
      return;
    }
    const billingAddressInfo = {
      UserID: user?.UserID,
      CityName: billingCityInput,
      Province: billingProvinceInput,
      StreetAddress: billingAddressInput,
      PostalCode: billingPostalCodeInput,
      Country: billingCountryInput,
    };

    if (
      !billingAddressInfo.CityName ||
      !billingAddressInfo.Province ||
      !billingAddressInfo.StreetAddress ||
      !billingAddressInfo.PostalCode ||
      !billingAddressInfo.Country
    ) {
      setOpenErrorToast('Please fill all required Billing fields!');
      return;
    }

    const shippingAddressInfo = !useBillingAddressForShipping
      ? {
          UserID: user?.UserID,
          CityName: shippingCityInput,
          Province: shippingProvinceInput,
          StreetAddress: shippingAddressInput,
          PostalCode: shippingPostalCodeInput,
          Country: shippingCountryInput,
        }
      : billingAddressInfo;

    if (
      !shippingAddressInfo.CityName ||
      !shippingAddressInfo.Province ||
      !shippingAddressInfo.StreetAddress ||
      !shippingAddressInfo.PostalCode ||
      !shippingAddressInfo.Country
    ) {
      setOpenErrorToast('Please fill all required Shipping fields!');
      return;
    }

    const regex = /^\d{16,19}$/; // Checks for 16-19 digit integer
    if (!regex.test(creditCardInput)) {
      setOpenErrorToast('Please fill all required Payment fields!');
      return;
    }

    const paymentInfo = {
      UserID: user?.UserID,
      AddressID: '',
      CreditCardNum: Number(creditCardInput),
      ExpiryDate: expiryDateInput.current?.value.replace(/\s/g, ''),
      CVV: cvvInput,
      CardHolderName: firstNameInput + ' ' + lastNameInput,
    };

    if (!paymentInfo.CreditCardNum || !paymentInfo.ExpiryDate || !paymentInfo.CVV || !paymentInfo.CardHolderName) {
      setOpenErrorToast('Please fill all required Payment fields!');
      return;
    }

    setIsLoading(true);

    updateProfile(updatedUser);

    const billingAddress = await addAddress(billingAddressInfo).unwrap();

    let shippingAddress = billingAddress;
    if (!useBillingAddressForShipping) {
      shippingAddress = await addAddress(shippingAddressInfo).unwrap();
    }
    await addShippingAddress({ UserID: user?.UserID || '', AddressID: shippingAddress.AddressID });

    paymentInfo.AddressID = billingAddress.AddressID;
    await updatePayment(paymentInfo);

    // Update Redux
    dispatch(setPaymentAddress(billingAddressInfo));
    dispatch(setShippingAddress(shippingAddressInfo));
    setIsLoading(false);
    dispatch(setUser(updatedUser));
    window.scrollTo(0, 0);
  }

  function handleShippingCheckbox() {
    setUseBillingAddressForShipping(!useBillingAddressForShipping);
  }

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorToast('');
  };

  return (
    <div className="buyer-registration-page">
      <Snackbar open={!!openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {openErrorToast}
        </Alert>
      </Snackbar>
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
            <span>Profile</span>
          </div>
          <UserSetting
            departmentInput={departmentInput}
            setDepartmentInput={setDepartmentInput}
            profileLastNameInput={profileLastNameInput}
            profileFirstNameInput={profileFirstNameInput}
          />
          <div className="buyer-registration-page__forms">
            <PaymentGrid
              setFirstNameInput={setFirstNameInput}
              setLastNameInput={setLastNameInput}
              setCreditCardInput={setCreditCardInput}
              expiryDateInput={expiryDateInput}
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
          <LoadingButton
            loading={loading}
            className="seller-modal__save-button"
            color="secondary"
            loadingPosition="start"
            variant="contained"
            startIcon={<TrendingFlatIcon />}
            onClick={() => register()}
          >
            Start shopping
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default BuyerRegistration;
