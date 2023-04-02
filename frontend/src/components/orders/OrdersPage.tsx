import { debounce, Grid, InputAdornment, Pagination, TextField } from '@mui/material';
import './OrdersPage.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Ordered } from './Orders';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useGetOrdersQuery, useLazyGetOrdersQuery } from '../../redux/api/orders';
import { setOrders, setIsLoadingOrders } from '../../redux/reducers/ordersSlice';
import { useAppSelector } from '../../redux/store';
import Breadcrumbs from '../common/Breadcrumbs';
import useAdminPrivelege from '../../utils/useAdminPrivelege';

function OrdersPage() {
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const user = useAppSelector((state) => state.user.value);
  const [searchParams] = useSearchParams();
  const [orderIdQuery, setOrderIdQuery] = useState('');
  const page = searchParams.get('page');
  const orders = useAppSelector((state) => state.orders.orders);
  const isLoading = useAppSelector((state) => state.orders.isLoading);
  const [getOrdersByOrderID, filteredData] = useLazyGetOrdersQuery();
  const { data, isLoading: isDataFetching } = useGetOrdersQuery({
    userId: isAdminPrivelegeRequested ? undefined : user?.UserID,
    orderId: orderIdQuery,
    page: page == null || Number(page) <= 0 ? 1 : Number(page),
  });

  useEffect(() => {
    dispatch(setIsLoadingOrders({ isLoadingOrders: isDataFetching }));
  }, [isDataFetching]);

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingOrders({ isLoadingOrders: false }));
      dispatch(setOrders(data));
    } else {
      dispatch(setIsLoadingOrders({ isLoadingOrders: true }));
    }
  }, [data]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setIsLoadingOrders({ isLoadingOrders: true }));
    navigate(`?page=${value}`);
  };

  function searchForOrders(value: string) {
    setOrderIdQuery(value);
    getOrdersByOrderID({
      page: page == null || Number(page) <= 0 ? 1 : Number(page),
      orderId: value,
      userId: isAdminPrivelegeRequested ? undefined : user?.UserID,
    });
    navigate(`?page=1`);
  }

  const changeHandler = (event: any) => {
    const regex = /^$|^\d+$/; // check for positive integers or empty string
    if (regex.test(event.target?.value)) {
      searchForOrders(event.target?.value);
    }
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div>
      <Breadcrumbs />
      <div className="orders-page">
        <Grid container rowSpacing={0}>
          <Grid item xs={12}>
            <TextField
              placeholder="Order ID"
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
          <Ordered orders={orders?.Data} />
        </Grid>
        <Pagination
          className="gallery__pagination"
          count={
            filteredData?.data?.TotalOrders
              ? Math.ceil(Number(filteredData.data.TotalOrders) / 8.0)
              : data
              ? Math.ceil(Number(data.TotalOrders) / 8.0)
              : 1
          }
          page={Number(page) ? Number(page) : 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default OrdersPage;
