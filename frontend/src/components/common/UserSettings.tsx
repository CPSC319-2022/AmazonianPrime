import { Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React from 'react';
import { user } from '../../redux/reducers/userSlice';
import { useAppSelector } from '../../redux/store';

interface UserSettingProps {
  profileFirstNameInput: any;
  profileLastNameInput: any;
  departmentInput: string;
  setDepartmentInput: (value: string) => any;
}

const departments = [
  'Marketing',
  'Sales',
  'Development',
  'UX Design',
  'Human Resources',
  'Legal',
  'DevOps',
  'IT',
  'Security',
];
export const UserSetting: React.FC<UserSettingProps> = ({
  profileFirstNameInput,
  profileLastNameInput,
  departmentInput,
  setDepartmentInput,
}) => {
  const user = useAppSelector((state) => state.user.value);
  return (
    <>
      <div>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              required
              label="Preferred First Name"
              defaultValue={user?.FirstName}
              fullWidth
              size="small"
              inputRef={profileFirstNameInput}
              className="buyer-registration-page__name-input"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              label="Last Name"
              defaultValue={user?.LastName}
              fullWidth
              size="small"
              inputRef={profileLastNameInput}
              className="buyer-registration-page__name-input"
            />
          </Grid>
        </Grid>
      </div>
      <FormControl className="buyer-registration-page__department-input" size="small">
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={departmentInput}
          label="Department"
          onChange={(e) => setDepartmentInput(e.target.value)}
        >
          {departments.map((dept) => (
            <MenuItem value={dept}>{dept}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
