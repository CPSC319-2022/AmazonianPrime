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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/index';
import { modifyRegisterUserModalVisibility, modifyIsSellerRegistered } from '../../redux/reducers/sellerModalSlice';
import { useRef, useState } from 'react';
import AddressGrid from '../common/AddressGrid';

function RegisterSellerModal() {
  const isSellerModalOpen = useSelector((state: RootState) => state.sellerModal.isSellerModalOpen);
  const isSellerRegistered = useSelector((state: RootState) => state.sellerModal.isSellerRegistered);
  const [openErrorToast, setOpenErrorToast] = useState('');
  const firstName = useRef<any>(null);
  const lastName = useRef<any>(null);
  const accountNumber = useRef<any>(null);
  const institutionNumber = useRef<any>(null);
  const transitNumber = useRef<any>(null);
  const dispatch = useDispatch();

  function handleClose(value: boolean) {
    setOpenErrorToast('');
    dispatch(modifyIsSellerRegistered(value));
    dispatch(modifyRegisterUserModalVisibility(false));
  }

  const handleSave = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(accountNumber);
    console.log(institutionNumber);
    console.log(transitNumber);
    if (
      !firstName?.current?.value ||
      !lastName?.current?.value ||
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
      <Snackbar open={!!openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {openErrorToast}
        </Alert>
      </Snackbar>
      <Dialog open={isSellerModalOpen && !isSellerRegistered} onClose={() => handleClose(false)}>
        <DialogTitle>Register Before Selling</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={4}>
            Before You Start Selling, Please Add Your Banking Details!
          </DialogContentText>
          <div>
            <span>Banking Details</span>
            <div className="seller-modal__banking-details">
              <div className="seller-modal__banking-details-row">
                <TextField
                  autoComplete="off"
                  inputRef={firstName}
                  className="seller-modal__fname"
                  size="small"
                  required
                  id="outlined-required"
                  label="First Name"
                />
                <TextField
                  autoComplete="off"
                  inputRef={lastName}
                  size="small"
                  required
                  id="outlined-required"
                  label="Last Name"
                />
              </div>
              <TextField
                autoComplete="off"
                inputRef={accountNumber}
                inputProps={{ maxLength: 12 }}
                helperText="7 to 12-digit number"
                className="seller-modal__banking-details-row"
                size="small"
                required
                id="outlined-required"
                label="Account No."
              />
              <div className="seller-modal__banking-details-row">
                <TextField
                  autoComplete="off"
                  inputRef={institutionNumber}
                  inputProps={{ maxLength: 3 }}
                  className="seller-modal__banking-details-inst-no"
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
          <AddressGrid />
        </DialogContent>
        <DialogActions>
          <div className="seller-modal__button-container">
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button className="seller-modal__save-button" color="secondary" variant="contained" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RegisterSellerModal;
