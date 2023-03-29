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
  debounce,
} from '@mui/material';
import './UsersPage.scss';
import UsersGrid from './UsersGrid';
import SearchIcon from '@mui/icons-material/Search';
import { setUsers, setIsLoadingUsers } from '../../redux/reducers/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetUsersQuery, useLazyGetUsersQuery } from '../../redux/api/admin';
import { useCallback, useEffect, useState } from 'react';
import Breadcrumbs from '../common/Breadcrumbs';
import { useAppSelector } from '../../redux/store';

function UsersPage() {
  const paginatedUsers = useAppSelector((state) => state.admin.users);
  const [nameQuery, setNameQuery] = useState('');
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [getUsersByName, filteredData] = useLazyGetUsersQuery();
  const { data, isLoading } = useGetUsersQuery({
    page: page == null || Number(page) <= 0 ? 1 : Number(page),
    name: nameQuery,
  });

  useEffect(() => {
    dispatch(setIsLoadingUsers({ isLoadingUsers: isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(setUsers(data));
      dispatch(setIsLoadingUsers({ isLoadingUsers: false }));
    } else {
      dispatch(setIsLoadingUsers({ isLoadingUsers: true }));
    }
  }, [data]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setIsLoadingUsers({ isLoadingUsers: true }));
    navigate(`?page=${value}`);
  };

  function searchForUsers(value: string) {
    const tokenizedSearchInput = value.split(' ');
    const firstTwoTokens = tokenizedSearchInput.slice(0, 2);
    const dashSeperatedInput = firstTwoTokens.join('-');
    setNameQuery(dashSeperatedInput);

    getUsersByName({
      page: page == null || Number(page) <= 0 ? 1 : Number(page),
      name: dashSeperatedInput,
    });
    navigate(`?page=1`);
  }

  const changeHandler = (event: any) => {
    searchForUsers(event.target?.value);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div className="users-page">
      <Breadcrumbs />
      <Grid container className="users-page__main">
        {/*
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
          */}

        <Grid item xs={10} paddingTop={2} marginBottom={-10}>
          <TextField
            placeholder="Name"
            size="small"
            style={{ height: 100 }}
            autoComplete="off"
            onChange={debouncedChangeHandler}
            InputProps={{
              endAdornment: <SearchIcon />,
              style: {
                height: '30px',
                width: '300px',
              },
            }}
          />
        </Grid>
        <UsersGrid users={paginatedUsers?.Data} />
      </Grid>
      <Pagination
        className="gallery__pagination"
        count={
          filteredData?.data
            ? Math.ceil(Number(filteredData.data.TotalUsers) / 8.0)
            : data
            ? Math.ceil(Number(data.TotalUsers) / 8.0)
            : 1
        }
        page={Number(page) ? Number(page) : 1}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default UsersPage;
