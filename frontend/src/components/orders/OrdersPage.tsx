import {
  debounce,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from '@mui/material';
import './OrdersPage.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Ordered } from './Ordered';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useGetOrdersQuery, useLazyGetOrdersQuery } from '../../redux/api/orders';
import { setIsLoadingOrders } from '../../redux/reducers/ordersSlice';
import { useAppSelector } from '../../redux/store';

function OrdersPage() {
  const user = useAppSelector((state) => state.user.value);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const orders = useAppSelector((state) => state.orders.orders);
  const isLoading = useAppSelector((state) => state.orders.isLoading) || !orders;
  const [getOrdersByUserID, filteredData] = useLazyGetOrdersQuery();
  const { data: data } = useGetOrdersQuery({
    userId: user?.UserID,
    page: page == null || Number(page) <= 0 ? 1 : Number(page),
  });

  useEffect(() => {
    dispatch(setIsLoadingOrders({ isLoadingOrders: isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (orders) {
      dispatch(setIsLoadingOrders({ isLoadingOrders: false }));
    } else {
      dispatch(setIsLoadingOrders({ isLoadingOrders: true }));
    }
  }, [orders]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setIsLoadingOrders({ isLoadingOrders: true }));
    navigate(`?page=${value}`);
  };

  function searchForOrders(value: string) {
    const tokenizedSearchInput = value.split(' ');
    const firstTwoTokens = tokenizedSearchInput.slice(0, 2);
    const dashSeperatedInput = firstTwoTokens.join('-');
    getOrdersByUserID({
      userId: user?.UserID,
      page: page == null || Number(page) <= 0 ? 1 : Number(page),
    });
  }

  const changeHandler = (event: any) => {
    searchForOrders(event.target?.value);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div className="orders-page">
      <div className="orders">Orders</div>
      <Grid container rowSpacing={0} className="orders-page__main">
        <Grid item xs={1.2}>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select
              className="orders-page__header-text"
              size="small"
              variant="standard"
              style={{ backgroundColor: '#ffffff', width: 100 }}
            >
              <MenuItem value={'ordered'}>Ordered</MenuItem>
              <MenuItem value={'delivered'}>Delivered</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10.8} paddingTop={2} marginBottom={-10}>
          <TextField
            placeholder="Search…"
            size="small"
            autoComplete="off"
            onChange={debouncedChangeHandler}
            style={{ height: 100 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                height: '30px',
                width: '300px',
              },
            }}
          />
        </Grid>
        <Ordered orders={data} />
      </Grid>
      <Pagination
        className="gallery__pagination"
        count={
          filteredData?.data ? Math.ceil(Number(filteredData.data) / 8.0) : data ? Math.ceil(Number(data) / 8.0) : 1
        }
        page={Number(page) ? Number(page) : 1}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default OrdersPage;
