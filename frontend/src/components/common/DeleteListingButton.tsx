import './DeleteListingButton.scss';
import { useAppSelector } from '../../redux/store';
import { useState } from 'react';
import { useDeleteListingMutation } from '../../redux/api/listings';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Snackbar, Alert } from '@mui/material';

interface DeleteListingButtonProps {
  handleClick: any;
  successMessage?: any;
  queueMessage?: string;
  failMessage: string;
  showIcon?: boolean;
}

const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({
  successMessage,
  handleClick,
  queueMessage,
  failMessage,
  showIcon = true,
}) => {
  const [successToast, setSuccessToast] = useState(false);
  const [queueToast, setQueueToast] = useState(false);
  const [failToast, setFailToast] = useState(false);
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setQueueToast(false);
    setFailToast(false);
    setSuccessToast(false);
  };

  return (
    <div>
      {successMessage && (
        <Snackbar open={successToast && !failToast} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      {queueMessage && (
        <Snackbar open={queueToast && !(failToast || successToast)} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
            {queueMessage}
          </Alert>
        </Snackbar>
      )}
      <Snackbar open={failToast && !successToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {failMessage}
        </Alert>
      </Snackbar>
      <div className="pdp__delete-listing">
        {showIcon && <DeleteOutlineIcon sx={{ fontSize: 20 }} />}
        <span
          onClick={() => {
            setQueueToast(true);
            handleClick()
              ?.unwrap()
              .then(() => {
                setQueueToast(false);
                setSuccessToast(true);
              })
              .catch(() => {
                setQueueToast(false);
                setFailToast(true);
              });
          }}
        >
          Remove Listing
        </span>
      </div>
    </div>
  );
};

export default DeleteListingButton;
