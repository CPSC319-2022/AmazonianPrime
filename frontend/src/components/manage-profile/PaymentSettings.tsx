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
import { useAddAddressMutation, useAddPaymentMutation, useGetPaymentsQuery } from '../../redux/api/user';
import { setPaymentAddress } from '../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { setFailMessage, setSuccessMessage } from '../../redux/reducers/appSlice';
import { ExpiryDate } from '../common/ExpiryDate';
import { isExpiredDate } from '../../utils/escapeDateFromSQL';

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
  const [searchParams] = useSearchParams();
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();
  const { data: payments } = useGetPaymentsQuery(user?.UserID || '');
  const handleClick = async () => {
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
      dispatch(setFailMessage('Please fill all required Billing fields!'));
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
      dispatch(setFailMessage('Please fill all required Payment fields!'));
      return;
    }

    const regex = /^\d{16,19}$/; // Checks for 16-19 digit integer
    if (!regex.test(paymentInfo.CreditCardNum.toString())) {
      dispatch(setFailMessage('The credit card number must be between 16-19 digits!'));
      return;
    }
    setIsLoading(true);

    const billingAddress = await addAddress(billingAddressInfo).unwrap();

    paymentInfo.AddressID = billingAddress.AddressID;
    await updatePayment(paymentInfo);

    setIsLoading(false);
    dispatch(setSuccessMessage('Successfully added your payment method!'));
    // Update Redux
    dispatch(setPaymentAddress(billingAddressInfo));
  };
  const [addAddress, addAddressResult] = useAddAddressMutation();
  const [updatePayment, addPaymentResult] = useAddPaymentMutation();

  if (Number(searchParams.get('page')) !== 3) {
    return null;
  }
  return (
    <div className="buyer-registration-page__forms">
      <span className="setting__title">Payment Details</span>
      <ShowMoreContent
        title="Your Existing Payment Details"
        contents={
          payments?.map((payment) => {
            const creditNumber = payment.CreditCardNum.toString();
            return (
              <div className="more-content__details">
                <div>
                  Credit Card ending in{' '}
                  <span className="address__grey">
                    {creditNumber.substring(creditNumber.length - 5, creditNumber.length)}
                  </span>
                  <ExpiryDate date={payment.ExpiryDate} />
                </div>
                <div>
                  <span className="more-content__billing">Billing Address&nbsp;</span>
                  {payment.CardHolderName},&nbsp;{payment.StreetAddress},&nbsp;{payment.CityName}&nbsp;
                  {payment.Province}
                </div>
              </div>
            );
          }) || []
        }
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
          loading={loading}
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
