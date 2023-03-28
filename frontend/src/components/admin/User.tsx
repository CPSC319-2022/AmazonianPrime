import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import './User.scss';
import { useChangePrivilegeLevelMutation, useRemoveUserMutation } from '../../redux/api/admin';
import { useAppSelector } from '../../redux/store';
import { User as UserType } from '../../types/user';
import CloseIcon from '@mui/icons-material/Close';
import { CheckCircleOutline } from '@mui/icons-material/';
import { useState } from 'react';

interface UserProps {
  user: UserType;
  changeTriggered: () => void;
}

const User: React.FC<UserProps> = ({ user, changeTriggered }) => {
  const thisUserID = useAppSelector((state) => state.user.value?.UserID);
  const [changePrivilege] = useChangePrivilegeLevelMutation();
  const [removeUser] = useRemoveUserMutation();
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
    changeTriggered();
    setSuccessToast(true);
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
    changeTriggered();
  }

  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [openSuccessToast, setSuccessToast] = useState(false);
  const [openErrorToast, setErrorToast] = useState(false);

  const handleConfirm = () => {
    deleteUser();
    setConfirmDelete(false);
  };

  const handleCancel = () => {
    setConfirmDelete(false);
  };

  const handleCloseToast = () => {
    setSuccessToast(false);
    setErrorToast(false);
  };

  return (
    <div>
      <Grid item xs={1} marginTop={3} className="user">
        <div>
          <div className="user__username">
            {FirstName} {LastName}
            {Department ? `, ${Department}` : ''}
          </div>
          <div className="user__user-information">{Email}</div>
        </div>
        <div className="user__buttons">
          <Button className="user__button" variant="contained" color="secondary" onClick={swapPrivilegeLevel}>
            {IsAdmin ? 'Demote' : 'Promote'}
          </Button>
          <Button
            variant="contained"
            className="user__button"
            color="secondary"
            onClick={() => setConfirmDelete(true)}
            startIcon={<CloseIcon />}
          >
            {' '}
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
            Are you sure you want to deactivate user {FirstName} {LastName}?
          </p>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSuccessToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={'success'} sx={{ width: '100%' }}>
          {`Successfully changed ${FirstName} ${LastName}'s access level`}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity={'error'} sx={{ width: '100%' }}>
          An error has occured. Please try again later.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default User;
