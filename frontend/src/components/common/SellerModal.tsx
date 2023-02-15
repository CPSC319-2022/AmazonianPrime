import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';
import './SellerModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../redux/store/index"
import { toggleModal } from '../../redux/reducers/sellerModalSlice';

function SellerModal() {
  const isSellerModalOpen = useSelector((state: RootState) => state.sellerModal.isSellerModalOpen);
  const dispatch = useDispatch()

  function handleClose() {
    dispatch(toggleModal(false))
  }

  return (
    <div>
      <Dialog open={isSellerModalOpen} onClose={() => handleClose()}>
        <DialogTitle>Seller Registration</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={4}>
            Before You Start Selling, We Have A Few Questions For You!
          </DialogContentText>
          <Stack spacing={4}>
            <TextField required id="filled-required" label="Payment Details" defaultValue="" variant="filled" />
            <TextField
              required
              id="filled-multiline-static"
              label="Billing Address"
              multiline
              rows={4}
              defaultValue=""
              variant="filled"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <div className= "seller-modal__button-container">
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button className= "seller-modal__save-button" color="secondary" variant="contained" onClick={() => handleClose()}>Save</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SellerModal;
