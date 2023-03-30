import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';
import './User.scss';
import { useChangePrivilegeLevelMutation, useRemoveUserMutation } from '../../redux/api/admin';
import { useAppSelector } from '../../redux/store';
import { User as UserType } from '../../types/user';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircleOutline } from '@mui/icons-material/';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useState } from 'react';
import { UserDisplayName } from '../common/UserDisplayName';

interface UserProps {
  user: UserType | null;
}

const User: React.FC<UserProps> = ({ user }) => {
  const thisUserID = useAppSelector((state) => state.user.value?.UserID);
  const [changePrivilege] = useChangePrivilegeLevelMutation();
  const [removeUser] = useRemoveUserMutation();
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [openErrorToast, setErrorToast] = useState(false);
  if (!user) {
    return (
      <div>
        <Grid item xs={1} marginTop={3} className="user">
          <div className="user__skeleton">
            <div className="product-details-skeleton__user">
              <Skeleton className="product-details-skeleton__user-icon" variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: '2em' }} width={100} />
            </div>
            <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={250} />
          </div>
          <div className="user__skeleton-buttons">
            <Skeleton className="user__skeleton-button" variant="text" sx={{ fontSize: '2em' }} width={125} />
            <Skeleton className="user__skeleton-button" variant="text" sx={{ fontSize: '2em' }} width={125} />
          </div>
        </Grid>
      </div>
    );
  }

  const { FirstName, LastName, Department, IsAdmin, Email, UserID } = user;

  async function swapPrivilegeLevel() {
    const userInfo = {
      UserID: thisUserID,
      IsAdmin: IsAdmin === 0 ? 1 : 0,
    };
    try {
      await changePrivilege({ user: UserID, body: userInfo }).unwrap();
    } catch {
      setErrorToast(true);
      return;
    }
  }

  async function deleteUser() {
    const userInfo = {
      UserID: thisUserID,
    };
    try {
      await removeUser({ user: UserID, body: userInfo }).unwrap();
    } catch {
      setErrorToast(true);
      return;
    }
  }

  const handleConfirm = () => {
    deleteUser();
    setConfirmDelete(false);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
  };

  const handleCloseToast = () => {
    setErrorToast(false);
  };

  return (
    <div>
      <Grid item xs={1} marginTop={3} className="user">
        <div>
          <div className="user__username">
            <UserDisplayName user={user} />
          </div>
          <div className="user__user-admin-information"> {IsAdmin ? 'Administrator' : 'User'}</div>
          <div className="user__user-information">{Email}</div>
        </div>
        <div className="user__buttons">
          <Button className="user__button" variant="contained" color="secondary" onClick={swapPrivilegeLevel}>
            {IsAdmin ? 'Demote' : 'Promote'}
          </Button>
          <Button
            variant="text"
            className="user__button-deactivate"
            onClick={() => setConfirmDelete(true)}
            startIcon={<PersonRemoveIcon />}
          >
            Deactivate
          </Button>
        </div>
      </Grid>
      <Dialog
        open={openConfirmDelete}
        onClose={handleCancel}
        PaperProps={{ style: { padding: '8px', width: '350px' } }}
      >
        <DialogTitle>Confirm Deactivate</DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to deactivate user{' '}
            <strong>
              {FirstName} {LastName}
            </strong>
            ?
          </p>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={'error'} sx={{ width: '100%' }}>
          An error has occured. Please try again later.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default User;
