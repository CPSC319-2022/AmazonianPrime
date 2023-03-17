import './DeleteListingButton.scss';
import { useAppSelector } from '../../redux/store';
import { useState } from 'react';
import { useDeleteListingMutation } from '../../redux/api/listings';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Snackbar, Alert } from '@mui/material';

interface DeleteListingButtonProps {
  listingId: any;
}

const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({ listingId }) => {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  const user = useAppSelector((state) => state.user.value);
  const [successToast, setSuccessToast] = useState(false);
  const [queueToast, setQueueToast] = useState(false);
  const [failToast, setFailToast] = useState(false);
  const [deleteListing] = useDeleteListingMutation();
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setFailToast(false);
    setSuccessToast(false);
    setQueueToast(false);
  };

  return (
    <div>
      <Snackbar open={successToast && (!failToast || !queueToast)} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          Successfully deleted the listing!
        </Alert>
      </Snackbar>
      <Snackbar open={failToast && (!successToast || !queueToast)} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          Failed to delete the listing. Please try again later.
        </Alert>
      </Snackbar>
      <Snackbar open={queueToast && !successToast && !failToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
          Hang tight while we delete your listing!
        </Alert>
      </Snackbar>
      <div className="pdp__delete-listing">
        <DeleteOutlineIcon sx={{ fontSize: 20 }} />
        <span
          onClick={() => {
            setQueueToast(true);
            deleteListing({ ListingID: Number(listingId), UserID: user?.UserID || '' })
              .unwrap()
              .then(() => setSuccessToast(true))
              .catch(() => setFailToast(true));
          }}
        >
          Delete Listing
        </span>
      </div>
    </div>
  );
};

export default DeleteListingButton;
