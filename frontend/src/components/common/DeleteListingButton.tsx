import './DeleteListingButton.scss';
import { useAppSelector } from '../../redux/store';
import { useState } from 'react';
import { useDeleteListingMutation } from '../../redux/api/listings';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Snackbar, Alert, Button, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFailMessage, setSuccessMessage } from '../../redux/reducers/appSlice';

interface DeleteListingButtonProps {
  handleClick: any;
  successMessage?: any;
  disabled?: boolean;
  tooltipContent?: string;
  queueMessage?: string;
  failMessage: string;
  showIcon?: boolean;
}

const DeleteListingButton: React.FC<DeleteListingButtonProps> = ({
  successMessage,
  handleClick,
  queueMessage,
  tooltipContent,
  disabled,
  failMessage,
  showIcon = true,
}) => {
  const [queueToast, setQueueToast] = useState(false);
  const dispatch = useDispatch();
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setQueueToast(false);
  };

  return (
    <div>
      {queueMessage && (
        <Snackbar open={queueToast} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="info" sx={{ width: '100%' }}>
            {queueMessage}
          </Alert>
        </Snackbar>
      )}
      <Tooltip title={tooltipContent}>
        <Button className="pdp__delete-listing" disabled={disabled}>
          {showIcon && <DeleteOutlineIcon sx={{ fontSize: 20 }} />}
          <span
            onClick={() => {
              setQueueToast(true);
              handleClick()
                ?.unwrap()
                .then(() => {
                  setQueueToast(false);
                  dispatch(setFailMessage(null));
                  dispatch(setSuccessMessage(successMessage));
                })
                .catch((e: any) => {
                  dispatch(setSuccessMessage(null));
                  setQueueToast(false);
                  dispatch(setFailMessage(failMessage));
                });
            }}
          >
            Remove Listing
          </span>
        </Button>
      </Tooltip>
    </div>
  );
};

export default DeleteListingButton;
