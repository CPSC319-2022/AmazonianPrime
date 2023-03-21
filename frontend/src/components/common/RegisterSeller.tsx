import { Button, TextField, Alert, Snackbar } from '@mui/material';
import './RegisterSeller.scss';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/store/index';
import React, { useRef, useState } from 'react';
import AddressGrid from '../common/AddressGrid';
import { useAddAddressMutation, useAddBankingMutation } from '../../redux/api/user';
import LoadingButton from '@mui/lab/LoadingButton';

interface RegisterSellerProps {
  onCancel?: any;
}
const RegisterSeller: React.FC<RegisterSellerProps> = ({ onCancel }) => {
  const [billingAddressInput, setBillingAddressInput] = useState('');
  const [billingCityInput, setBillingCityInput] = useState('');
  const [billingProvinceInput, setBillingProvinceInput] = useState('');
  const [billingPostalCodeInput, setBillingPostalCodeInput] = useState('');
  const [billingCountryInput, setBillingCountryInput] = useState('');

  const [updateAddress] = useAddAddressMutation();
  const [updateBanking] = useAddBankingMutation();
  const user = useAppSelector((state) => state.user.value);
  const [openErrorToast, setOpenErrorToast] = useState('');
  const fullName = useRef<any>(null);
  const accountNumber = useRef<any>(null);
  const institutionNumber = useRef<any>(null);
  const transitNumber = useRef<any>(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function handleClose(value: boolean) {
    setOpenErrorToast('');
    setIsLoading(false);
  }

  const handleSave = async () => {
    if (
      !fullName?.current?.value ||
      !accountNumber?.current?.value ||
      !institutionNumber?.current?.value ||
      !transitNumber?.current?.value
    ) {
      setOpenErrorToast('Please fill out all required fields!');
      return;
    }
    if (accountNumber && accountNumber?.current?.value?.length < 7) {
      setOpenErrorToast('The account number must be at least 7 characters!');
      return;
    }
    if (
      !Number(accountNumber?.current?.value) ||
      !Number(institutionNumber?.current?.value) ||
      !Number(transitNumber?.current?.value)
    ) {
      setOpenErrorToast('Only numbers can be added to the Account, Institution, and Transit Numbers.');
      return;
    }
    setOpenErrorToast('');
    setIsLoading(true);
    const billingAddressInfo = {
      UserID: user?.UserID,
      CityName: billingCityInput,
      Province: billingProvinceInput,
      StreetAddress: billingAddressInput,
      PostalCode: billingPostalCodeInput,
      Country: billingCountryInput,
    };
    const address = await updateAddress(billingAddressInfo).unwrap();

    const bankingInfo = {
      UserID: user?.UserID,
      AddressID: address?.AddressID,
      InstitutionNum: Number(institutionNumber?.current?.value),
      AccountNum: Number(accountNumber?.current?.value),
      TransitNum: Number(transitNumber?.current?.value),
      NameOnCard: fullName?.current?.value,
    };

    const bank = await updateBanking(bankingInfo).unwrap();
    setIsLoading(false);
    handleClose(true);
  };

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorToast('');
  };

  return (
    <>
      <Snackbar open={!!openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {openErrorToast}
        </Alert>
      </Snackbar>
      <div>
        <span>Banking Details</span>
        <div className="seller-__banking-details">
          <div className="seller-__banking-details-row">
            <TextField
              autoComplete="off"
              inputRef={fullName}
              className="seller-__fname"
              size="small"
              required
              id="outlined-required"
              label="Full Name"
            />
          </div>
          <TextField
            autoComplete="off"
            inputRef={accountNumber}
            inputProps={{ maxLength: 12 }}
            helperText="7 to 12-digit number"
            className="seller-__banking-details-row"
            size="small"
            required
            id="outlined-required"
            label="Account No."
          />
          <div className="seller-__banking-details-row">
            <TextField
              autoComplete="off"
              inputRef={institutionNumber}
              inputProps={{ maxLength: 3 }}
              className="seller-__banking-details-inst-no"
              size="small"
              required
              id="outlined-required"
              label="Institution No."
              helperText="3 digit number"
            />
            <TextField
              autoComplete="off"
              inputProps={{ maxLength: 5 }}
              inputRef={transitNumber}
              size="small"
              required
              id="outlined-required"
              label="Transit No."
              helperText="5 digit number"
            />
          </div>
        </div>
      </div>
      <span>Billing Address</span>
      <div className="seller__address">
        <AddressGrid
          setAddressInput={setBillingAddressInput}
          setCityInput={setBillingCityInput}
          setProvinceInput={setBillingProvinceInput}
          setPostalCodeInput={setBillingPostalCodeInput}
          setCountryInput={setBillingCountryInput}
        />
      </div>
      <div className="seller-__button-container">
        <div className="seller-buttons-left">
          {onCancel && (
            <Button onClick={() => onCancel(false)} className="cancel__button">
              Cancel
            </Button>
          )}
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            startIcon={<DoneAllIcon />}
            className="seller-__save-button"
            color="secondary"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </>
  );
};

export default RegisterSeller;
