import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Pagination } from '@mui/material';
import './UsersPage.scss';
import UsersGrid from './UsersGrid';
import SearchIcon from '@mui/icons-material/Search';
import { setIsLoadingUsers } from '../../redux/reducers/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUsersQuery, useLazyGetUsersQuery } from '../../redux/api/admin';
import { useEffect } from 'react';

function UsersPage() {
    const { data, isLoading } = useGetUsersQuery({
        page: Number(1) ?? 1,
        name: '',
      });

    useEffect(() => {
        dispatch(setIsLoadingUsers({ isLoadingUsers: isLoading }));
    }, [isLoading]);

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

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setIsLoadingUsers({ isLoadingListings: true }));
        navigate(`?users=&page=${value}`);
        console.log(data);
    };

  return (<div className="orders-page">
    <div className="orders">
      Users
    </div>
    <Grid container className="orders-page__main">
      <Grid item xs={2}>
        <FormControl>
          <InputLabel>Department</InputLabel>
          <Select
            className="orders-page__header-text"
            size="small"
            variant="standard"
            style={{ backgroundColor: '#ffffff', width: 140}}>
              {departments.map((dept) => (
            <MenuItem value={dept}>{dept}</MenuItem>
          ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={10} paddingTop={2} marginBottom={-10}>
        <TextField
          placeholder="Name"
          size="small"
          style={{ height: 100 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ), 
            style: {
              height: "30px",
              width: "300px",
            }
          }}
        />
      </Grid>
      <UsersGrid 
        totalUsersNumber={Number(data?.length)}
        users={data}
      />
    </Grid>
    <Pagination
        className="gallery__pagination"
        count={10}
        page={Number(1)}
        onChange={handlePageChange}
      />
  </div>
  );
}

export default UsersPage;