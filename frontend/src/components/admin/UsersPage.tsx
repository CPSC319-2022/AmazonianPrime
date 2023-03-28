import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Pagination } from '@mui/material';
import './UsersPage.scss';
import UsersGrid from './UsersGrid';
import SearchIcon from '@mui/icons-material/Search';
import { setUsers, setIsLoadingUsers } from '../../redux/reducers/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUsersQuery, useLazyGetUsersQuery } from '../../redux/api/admin';
import { useEffect } from 'react';

function UsersPage() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    const { data, isLoading } = useGetUsersQuery({
        page: (page == null || Number(page) <= 0) ? 1 : Number(page),
        name: '',
    });

    useEffect(() => {
        dispatch(setIsLoadingUsers({ isLoadingUsers: isLoading }));
    }, [isLoading]);

    useEffect(() => {
        if (data) {
          dispatch(setUsers(data));
          dispatch(setIsLoadingUsers({ isLoadingListings: false }));
        } else {
          dispatch(setIsLoadingUsers({ isLoadingListings: true }));
        }
      }, [data]);

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
        navigate(`?page=${value}`);
    };

  return (<div className="users-page">
    <div className="users">
      Users
    </div>
    <Grid container className="users-page__main">
      <Grid item xs={2}>
        <FormControl>
          <InputLabel>Department</InputLabel>
          <Select
            className="users-page__header-text"
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
        users={data?.Data}
      />
    </Grid>
    <Pagination
        className="gallery__pagination"
        count={Number(data ? Math.ceil(Number(data.TotalUsers) / 4.0) : 1)}
        page={Number(page) ? Number(page) : 1}
        onChange={handlePageChange}
      />
  </div>
  );
}

export default UsersPage;