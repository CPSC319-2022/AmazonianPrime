import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Pagination,
} from '@mui/material';
import './UsersPage.scss';
import UsersGrid from './UsersGrid';
import SearchIcon from '@mui/icons-material/Search';
import { setUsers, setIsLoadingUsers } from '../../redux/reducers/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUsersQuery, useLazyGetUsersQuery } from '../../redux/api/admin';
import { useEffect, useState } from 'react';

function UsersPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [getUsersByName, filteredData] = useLazyGetUsersQuery();
  const { data, isLoading } = useGetUsersQuery({
    page: page == null || Number(page) <= 0 ? 1 : Number(page),
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

  const [searchInput, setSearchInput] = useState('');
  const [validatedSearchInput, setValidatedSearchInput] = useState('');


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

  function searchForUsers() {
    const tokenizedSearchInput = searchInput.split(' ');
    const firstTwoTokens = tokenizedSearchInput.slice(0, 2);
    const dashSeperatedInput = firstTwoTokens.join('-');
    setValidatedSearchInput(dashSeperatedInput);
    getUsersByName({
      page: page == null || Number(page) <= 0 ? 1 : Number(page),
      name: dashSeperatedInput,
    });
  }

  function handleKeyDown(event: any) {
    const regex = /^[a-zA-Z\s]*$/; // Regular expression to allow only alphanumeric characters and spaces
    const key = event.key;
    if (!regex.test(key)) {
      event.preventDefault(); // Prevents the input of non-matching characters
    }
    if (event.keyCode === 13) {
      // Check for "Enter" key code
      searchForUsers();
    }
  }

  function changeTriggered() {
    getUsersByName({
        page: page == null || Number(page) <= 0 ? 1 : Number(page),
        name: validatedSearchInput,
      });
  }

  return (
    <div className="users-page">
      <div className="users">Users</div>
      <Grid container className="users-page__main">
        <Grid item xs={2}>
          <FormControl>
            <InputLabel>Department</InputLabel>
            <Select
              className="users-page__header-text"
              size="small"
              variant="standard"
              style={{ backgroundColor: '#ffffff', width: 140 }}
            >
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
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={searchForUsers}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                height: '30px',
                width: '300px',
              },
            }}
          />
        </Grid>
        <UsersGrid users={filteredData?.data ? filteredData.data.Data : data?.Data} changeTriggered={changeTriggered} />
      </Grid>
      <Pagination
        className="gallery__pagination"
        count={Number(data ? Math.ceil(Number(data.TotalUsers) / 8.0) : 1)}
        page={Number(page) ? Number(page) : 1}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default UsersPage;
