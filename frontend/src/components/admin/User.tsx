import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './User.scss';
import { useChangePrivilegeLevelMutation, useRemoveUserMutation } from '../../redux/api/admin';
import { useAppSelector } from '../../redux/store';
import { User as UserType } from '../../types/user';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  const thisUserID = useAppSelector((state) => state.user.value?.UserID);
  const [changePrivilege] = useChangePrivilegeLevelMutation();
  const [removeUser] = useRemoveUserMutation();
  const { FirstName, LastName, Department, IsAdmin, Email, UserID } = user;

  async function swapPrivilegeLevel() {
    const userInfo = {
      UserID: thisUserID,
      IsAdmin: IsAdmin === 0 ? 1 : 0,
    };
    await changePrivilege({ user: UserID, body: userInfo });
  }

  async function deleteUser() {
    const userInfo = {
      UserID: thisUserID,
    };
    await removeUser({ user: UserID, body: userInfo });
  }

  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    deleteUser();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid item xs={1} marginTop={3} className="user">
        <div>
          <div className="user__username">
            {FirstName} {LastName}, {Department}
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
            onClick={() => setOpen(true)}
            startIcon={<CloseIcon />}
          >
            {' '}
            Deactivate
          </Button>
        </div>
      </Grid>
      <Dialog open={open} onClose={handleCancel} PaperProps={{ style: { padding: '8px', width: '350px' } }}>
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
    </div>
  );
};

export default User;
