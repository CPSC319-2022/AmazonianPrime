import { LoadingButton } from '@mui/lab';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import AddressGrid from '../common/AddressGrid';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PaymentGrid from '../common/PaymentGrid';
import BuyerRegistration from '../login/BuyerRegistration';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './PaymentSettings.scss';
import { ShowMoreContent } from './ShowMoreContent';

export const PaymentSettings = () => {
  const user = useAppSelector((state) => state.user.value);

  const [useBillingAddressForShipping, setUseBillingAddressForShipping] = useState(true);
  const [loading, setIsLoading] = useState(false);

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

  const profileFirstNameInput = useRef<any>(null);
  const profileLastNameInput = useRef<any>(null);
  const [openErrorToast, setOpenErrorToast] = useState('');
  const [searchParams] = useSearchParams();
  const [isShowing, setIsShowing] = useState(false);
  const handleClick = () => {};

  if (Number(searchParams.get('page')) !== 3) {
    return null;
  }
  return (
    <div className="buyer-registration-page__forms">
      <ShowMoreContent
        title="Your Existing Payment Details"
        contents={[
          <div className="more-content__details">
            <span>Credit card ending in 1234</span>
            <span>
              <span className="more-content__billing">Billing Address</span> 1234 Ave Burnaby BC, v6c 0k2
            </span>
          </div>,
          <div className="more-content__details">
            <span>Credit card ending in 1234</span>
            <span>
              <span className="more-content__billing">Billing Address</span> 1234 Ave Burnaby BC, v6c 0k2
            </span>
          </div>,
        ]}
      />
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
      <div className="buyer-settings__button-container">
        <LoadingButton
          loading={false}
          loadingPosition="start"
          startIcon={<DoneAllIcon />}
          className="buyer-settings__button"
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          Add
        </LoadingButton>
      </div>
    </div>
  );
};
