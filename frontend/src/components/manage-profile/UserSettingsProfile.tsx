import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { UserSetting } from '../common/UserSettings';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Alert, LoadingButton } from '@mui/lab';
import './UserSettingsProfile.scss';
import { Snackbar } from '@mui/material';
import { useSignupMutation } from '../../redux/api/user';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userSlice';

export const UserSettingsProfile = () => {
  const [searchParams] = useSearchParams();
  const user = useAppSelector((state) => state.user.value);
  const profileFirstNameInput = useRef<any>(null);
  const profileLastNameInput = useRef<any>(null);
  const [openErrorToast, setOpenErrorToast] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [updateProfile, updateProfileResult] = useSignupMutation();
  const [departmentInput, setDepartmentInput] = useState(user?.Department || '');

  const handleClick = async () => {
    const updatedUser = {
      UserID: user?.UserID,
      FirstName: profileFirstNameInput.current?.value || user?.FirstName,
      LastName: profileLastNameInput.current?.value || user?.LastName,
      Department: departmentInput,
    };
    if (!updatedUser.FirstName || !updatedUser.LastName || !updatedUser.Department || updatedUser.Department === '') {
      setOpenErrorToast('Please fill all required Profile fields!');
      return;
    }
    setLoading(true);
    const newUser = await updateProfile(updatedUser).unwrap();
    dispatch(setUser(newUser));
    setLoading(false);
  };
  if (Number(searchParams.get('page')) !== 1) {
    return null;
  }
  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorToast('');
  };

  return (
    <div className="user-settings__container">
      <Snackbar open={!!openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
          {openErrorToast}
        </Alert>
      </Snackbar>
      <UserSetting
        departmentInput={departmentInput}
        setDepartmentInput={setDepartmentInput}
        profileLastNameInput={profileLastNameInput}
        profileFirstNameInput={profileFirstNameInput}
      />
      <div className="user-settings__button">
        <LoadingButton
          loading={loading}
          loadingPosition="start"
          startIcon={<DoneAllIcon />}
          className="seller-__save-button"
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          Save
        </LoadingButton>
      </div>
    </div>
  );
};
