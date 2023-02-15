import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
  MenuItem,
  Select,
} from '@mui/material';
import './SellerModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/index';
import { toggleModal, toggleSellerInfoApplied, toggleCreateListingModal } from '../../redux/reducers/sellerModalSlice';

function SellerModal() {
  const isSellerModalOpen = useSelector((state: RootState) => state.sellerModal.isSellerModalOpen);
  const isSellerInfoApplied = useSelector((state: RootState) => state.sellerModal.isSellerInfoApplied);
  const isCreateListingModalOpen = useSelector((state: RootState) => state.sellerModal.isCreateListingModalOpen);
  const dispatch = useDispatch();

  function handleClose(value: boolean) {
    dispatch(toggleSellerInfoApplied(value));
    dispatch(toggleModal(false));
  }

  function handleSubmit() {
    // TODO handle redirect to newly created listing page with submitted info
    dispatch(toggleCreateListingModal(false));
  }

  function handleListingClose() {
    dispatch(toggleCreateListingModal(false));
  }

  return (
    <div>
      <Dialog open={isCreateListingModalOpen} onClose={() => handleListingClose()}>
        <DialogTitle>Create New Listing</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={4}>
            Add your product details!
          </DialogContentText>
          <Stack spacing={4}>
            <TextField required id="filled-required" label="Listing Name" defaultValue="" variant="filled" />
            <TextField required id="filled-required" label="Cost" defaultValue="" variant="filled" />
            <TextField required id="filled-required" label="Quantity" defaultValue="" variant="filled" />
            <Select
              name="condition"
            >
              <MenuItem value={0}>Used</MenuItem>
              <MenuItem value={1}>New</MenuItem>
            </Select>
            <TextField
              required
              id="filled-multiline-static"
              label="Description"
              multiline
              rows={4}
              defaultValue=""
              variant="filled"
            />
            <Button variant="contained" component="label">Upload Images<input type="file" hidden/></Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <div className="seller-modal__button-container">
            <Button onClick={() => handleListingClose()}>Cancel</Button>
            <Button
              className="seller-modal__save-button"
              color="secondary"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              Post Listing
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog open={isSellerModalOpen && !isSellerInfoApplied} onClose={() => handleClose(false)}>
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
            <div className="seller-modal__button-container">
              <Button onClick={() => handleClose(false)}>Cancel</Button>
              <Button
                className="seller-modal__save-button"
                color="secondary"
                variant="contained"
                onClick={() => handleClose(true)}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </Dialog>
    </div>
  );
}

export default SellerModal;
