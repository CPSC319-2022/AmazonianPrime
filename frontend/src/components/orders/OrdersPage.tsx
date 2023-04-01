import {
  debounce,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
} from '@mui/material';
import './OrdersPage.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Ordered } from './Orders';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useGetOrdersQuery, useLazyGetOrdersQuery } from '../../redux/api/orders';
import { addItemsToOrders, setIsLoadingOrders } from '../../redux/reducers/ordersSlice';
import { useAppSelector } from '../../redux/store';
import Breadcrumbs from '../common/Breadcrumbs';
import { Order } from '../../types/order';

function OrdersPage() {
  const user = useAppSelector((state) => state.user.value);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const orders = useAppSelector((state) => state.orders.orders);
  const isLoading = useAppSelector((state) => state.orders.isLoading);
  const [getOrdersByUserID, filteredData] = useLazyGetOrdersQuery();
  const { data, isLoading: isDataFetching } = useGetOrdersQuery({
    userId: user?.UserID,
    page: page == null || Number(page) <= 0 ? 1 : Number(page),
  });

  useEffect(() => {
    dispatch(setIsLoadingOrders({ isLoadingOrders: isDataFetching }));
  }, [isDataFetching]);

  useEffect(() => {
    if (orders) {
      dispatch(setIsLoadingOrders({ isLoadingOrders: false }));
      dispatch(addItemsToOrders(orders));
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

  function searchForOrders(orders: Order[] | undefined, query: string) {
    if (!query || !orders) {
      return orders;
    } else {
      //dummy search query
      return orders.filter((item) => item.OrderTimestamp.toLowerCase().includes(query.toLowerCase()));
    }
  }

  const changeHandler = (event: any) => {
    searchForOrders(data, event.target?.value);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div>
      <Breadcrumbs />
      <div className="orders-page">
        <Grid container rowSpacing={0}>
          <Grid item xs={12}>
            <TextField
              placeholder="Search…"
              size="small"
              autoComplete="off"
              onChange={debouncedChangeHandler}
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
    </div>
  );
}

export default OrdersPage;
