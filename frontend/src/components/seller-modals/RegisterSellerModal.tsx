import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import './RegisterSellerModal.scss';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../redux/store/index';
import { modifyRegisterUserModalVisibility, modifyIsSellerRegistered } from '../../redux/reducers/sellerModalSlice';
import { useRef, useState } from 'react';
import AddressGrid from '../common/AddressGrid';
import { useAddAddressMutation, useAddBankingMutation } from '../../redux/api/user';
import LoadingButton from '@mui/lab/LoadingButton';
import RegisterSeller from '../common/RegisterSeller';

function RegisterSellerModal() {
  const [billingAddressInput, setBillingAddressInput] = useState('');
  const [billingCityInput, setBillingCityInput] = useState('');
  const [billingProvinceInput, setBillingProvinceInput] = useState('');
  const [billingPostalCodeInput, setBillingPostalCodeInput] = useState('');
  const [billingCountryInput, setBillingCountryInput] = useState('');

  const [updateAddress] = useAddAddressMutation();
  const [updateBanking] = useAddBankingMutation();
  const user = useAppSelector((state) => state.user.value);
  const isSellerModalOpen = useSelector((state: RootState) => state.sellerModal.isSellerModalOpen);
  const isSellerRegistered = useSelector((state: RootState) => state.sellerModal.isSellerRegistered);
  const [openErrorToast, setOpenErrorToast] = useState('');
  const fullName = useRef<any>(null);
  const accountNumber = useRef<any>(null);
  const institutionNumber = useRef<any>(null);
  const transitNumber = useRef<any>(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function handleClose(value: boolean) {
    setOpenErrorToast('');
    dispatch(modifyIsSellerRegistered(value));
    dispatch(modifyRegisterUserModalVisibility(false));
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
    <div>
      <Dialog open={isSellerModalOpen && !isSellerRegistered} onClose={() => handleClose(false)}>
        <DialogTitle>Register Before Selling</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={1}>
            Before You Start Selling, Please Add Your Banking Details!
          </DialogContentText>
          <RegisterSeller onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegisterSellerModal;
