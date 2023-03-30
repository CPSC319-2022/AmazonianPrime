import { debounce, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import './OrdersPage.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Ordered } from './Ordered';
import { Delivered } from './Delivered';
import { Order } from '../../types/order';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { useGetOrdersQuery, useLazyGetOrdersQuery } from '../../redux/api/orders';
import { setIsLoadingOrders } from '../../redux/reducers/ordersSlice';
import { useAppSelector } from '../../redux/store';
import NoContent from '../common/NoContent';

function OrdersPage() {
  const dummyOrders: Order[] = [];

    const user = useAppSelector((state) => state.user.value);
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');
    const orders = useAppSelector((state) => state.orders.orders);
    const isLoading = useAppSelector((state) => state.orders.isLoading) || !orders;
    const [getOrdersByName, filteredData] = useLazyGetOrdersQuery();
    const { data: data } = useGetOrdersQuery({
      userId: user?.UserID,
      page: page == null || Number(page) <= 0 ? 1 : Number(page),
      category: '',
      name: ''});

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

    const [searchInput, setSearchInput] = useState('');
    const [validatedSearchInput, setValidatedSearchInput] = useState('');

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
      setValidatedSearchInput(dashSeperatedInput);
      getOrdersByName({
        userId: user?.UserID,
        page: page == null || Number(page) <= 0 ? 1 : Number(page),
        category: "",
        name: dashSeperatedInput,
      });
    }
  
    const changeHandler = (event: any) => {
      setSearchInput(event.target?.value);
      searchForOrders(event.target?.value);
    };
    const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (<div className="orders-page">
    <div className="orders">
      Orders
    </div>
    <Grid container rowSpacing={0} className="orders-page__main">
      <Grid item xs={1.2}>
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            className="orders-page__header-text"
            size="small"
            variant="standard"
            style={{ backgroundColor: '#ffffff', width: 100}}>
              <MenuItem value={"ordered"}>Ordered</MenuItem>
              <MenuItem value={"delivered"}>Delivered</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={10.8} paddingTop={2} marginBottom={-10}>
        <TextField
          placeholder="Search…"
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
    </Grid>
    
  </div>
  );
}

export default OrdersPage;
function useLazyGetUsersQuery(): [any, any] {
  throw new Error('Function not implemented.');
}

