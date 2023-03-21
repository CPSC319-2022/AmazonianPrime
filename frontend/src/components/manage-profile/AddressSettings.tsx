import { LoadingButton } from '@mui/lab';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import AddressGrid from '../common/AddressGrid';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PaymentGrid from '../common/PaymentGrid';
import BuyerRegistration from '../login/BuyerRegistration';
import './AddressSettings.scss';
import { ShowMoreContent } from './ShowMoreContent';

export const AddressSettings = () => {
  const [shippingAddressInput, setShippingAddressInput] = useState('');
  const [shippingCityInput, setShippingCityInput] = useState('');
  const [shippingProvinceInput, setShippingProvinceInput] = useState('');
  const [shippingPostalCodeInput, setShippingPostalCodeInput] = useState('');
  const [shippingCountryInput, setShippingCountryInput] = useState('');

  const [searchParams] = useSearchParams();
  const handleClick = () => {};

  if (Number(searchParams.get('page')) !== 4) {
    return null;
  }
  return (
    <div className="buyer-registration-page__forms">
      <ShowMoreContent
        title="Your Existing Shipping Addresses"
        contents={[
          <div className="more-content__details">
            <span>1234 Ave Burnaby BC, v6c 0k2</span>
          </div>,
          <div className="more-content__details">
            <span>1234 Ave Burnaby BC, v6c 0k2</span>
          </div>,
        ]}
      />
      <div>
        <span>Shipping Address</span>
      </div>
      <div className="buyer-registration-page__shipping-contents"></div>
      <AddressGrid
        setAddressInput={setShippingAddressInput}
        setCityInput={setShippingCityInput}
        setProvinceInput={setShippingProvinceInput}
        setPostalCodeInput={setShippingPostalCodeInput}
        setCountryInput={setShippingCountryInput}
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
