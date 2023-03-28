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
import { useAddShippingAddressMutation, useAddAddressMutation, useGetShippingAddressQuery } from '../../redux/api/user';
import { useDispatch } from 'react-redux';
import { setFailMessage, setSuccessMessage } from '../../redux/reducers/appSlice';

export const AddressSettings = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const { data } = useGetShippingAddressQuery(user?.UserID || '');
  const [shippingAddressInput, setShippingAddressInput] = useState('');
  const [shippingCityInput, setShippingCityInput] = useState('');
  const [shippingProvinceInput, setShippingProvinceInput] = useState('');
  const [shippingPostalCodeInput, setShippingPostalCodeInput] = useState('');
  const [shippingCountryInput, setShippingCountryInput] = useState('');

  const [searchParams] = useSearchParams();
  const [addShippingAddress] = useAddShippingAddressMutation();
  const [addAddress, addAddressResult] = useAddAddressMutation();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    const shippingAddressInfo = {
      UserID: user?.UserID,
      CityName: shippingCityInput,
      Province: shippingProvinceInput,
      StreetAddress: shippingAddressInput,
      PostalCode: shippingPostalCodeInput,
      Country: shippingCountryInput,
    };
    if (
      !shippingAddressInfo.CityName ||
      !shippingAddressInfo.Province ||
      !shippingAddressInfo.StreetAddress ||
      !shippingAddressInfo.PostalCode ||
      !shippingAddressInfo.Country
    ) {
      dispatch(setFailMessage('Please fill all required Shipping fields!'));
      return;
    }
    setIsLoading(true);
    const shippingAddress = await addAddress(shippingAddressInfo).unwrap();

    addShippingAddress({ UserID: user?.UserID || '', AddressID: shippingAddress.AddressID })
      .then(() => {
        setIsLoading(false);
        setShippingAddressInput('');
        setShippingCityInput('');
        setShippingProvinceInput('');
        setShippingPostalCodeInput('');
        setShippingCountryInput('');
        dispatch(setSuccessMessage('Your new address has been saved!'));
      })
      .catch(() => dispatch(setFailMessage('We ran into an issue saving your address. Please try again later!')));
  };

  if (Number(searchParams.get('page')) !== 4) {
    return null;
  }
  return (
    <div className="buyer-registration-page__forms">
      <span className="setting__title">Shipping Address</span>
      <ShowMoreContent
        title="Your Existing Shipping Addresses"
        contents={
          data?.map((address) => (
            <div className="more-content__details">
              <span>
                {address.StreetAddress}&nbsp;{address.CityName},&nbsp;{address.Province}&nbsp;
              </span>
            </div>
          )) || []
        }
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
          loading={isLoading}
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
