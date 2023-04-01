import { Alert, Button } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useCartLock } from '../../utils/useCartLock';
import {
  shoppingCartApi,
  useCancelCartLockMutation,
  useLazyShoppingCartQuery,
  useRetryCheckoutMutation,
} from '../../redux/api/shoppingCart';
import { useAppSelector } from '../../redux/store';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { unsetCartLock } from '../../redux/reducers/appSlice';
import { setIsLoadingCart, addItemsToCart } from '../../redux/reducers/shoppingCartSlice';
import useAdminPrivelege from '../../utils/useAdminPrivelege';
import { listingsApi, useLazyGetListingByIdQuery } from '../../redux/api/listings';
import { useLocation, useParams } from 'react-router-dom';
import { setIsLoadingListingDetails, setListingDetails } from '../../redux/reducers/listingsSlice';

const Timer = () => {
  let interval: any;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();
  const { arn, taskToken, expiryDate } = useAppSelector((state) => state.app);
  const isCartLocked = expiryDate !== null;
  const [retryCheckout] = useCancelCartLockMutation();
  const user = useAppSelector((state) => state.user.value);
  const [loading, setLoading] = useState(false);
  const deadline = useAppSelector((state) => state.app.expiryDate);
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const [trigger, { isFetching, data }] = useLazyShoppingCartQuery();

  const [listingId, setListingId] = useState<string | null>(null);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith('/listing')) {
      setListingId(location.pathname.replace('/listing/', ''));
    }
  }, [location]);
  const [getListing, { data: listingData, isFetching: isListingLoading }] = useLazyGetListingByIdQuery();

  useEffect(() => {
    if (listingData) {
      dispatch(setListingDetails(listingData));
    }
  }, [listingData]);

  useEffect(() => {
    if (isAdminPrivelegeRequested) {
      // clearCartStorage();
    }
  }, [isAdminPrivelegeRequested]);

  useEffect(() => {
    dispatch(setIsLoadingCart({ isLoading: isFetching }));
    dispatch(setIsLoadingListingDetails(isListingLoading));
  }, [isFetching, isListingLoading]);

  const stopTimer = () => {
    setMinutes(0);
    setSeconds(0);
    dispatch(unsetCartLock(null));
    trigger(user?.UserID || '');
    if (listingId) {
      getListing(listingId || '');
    }
    dispatch(listingsApi.util.invalidateTags(['ListingDetails']));
    dispatch(shoppingCartApi.util.invalidateTags(['CartItems']));
  };

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingCart(false));
      dispatch(setIsLoadingListingDetails(false));
      dispatch(addItemsToCart(data));
    }
  }, [data]);

  const getTime = () => {
    if (!deadline) {
      return;
    }
    const time = Date.parse(deadline) - Date.now();

    if (time <= 0) {
      stopTimer();
      return;
    }

    let min: any = Math.floor((time / 1000 / 60) % 60);
    if (min < 10) {
      min = '0' + min;
    }

    let sec: any = Math.floor((time / 1000) % 60);
    if (sec < 10) {
      sec = '0' + sec;
    }
    setMinutes(min);
    setSeconds(sec);
  };

  useEffect(() => {
    interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return isCartLocked && minutes !== 0 && seconds !== 0 ? (
    <Alert
      icon={<AccessAlarmsIcon fontSize="inherit" />}
      severity="info"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      We will hold the items in your Cart for the duration of this period:&nbsp;
      <strong>
        {minutes}:{seconds}.
      </strong>
      &nbsp; During this period you may not edit your Shopping Cart Items.
      <LoadingButton
        size="small"
        loading={loading}
        color="secondary"
        style={{
          marginLeft: '1em',
          fontSize: '1em',
        }}
        onClick={() => {
          setLoading(true);
          retryCheckout({
            UserID: user?.UserID || '',
            body: {
              TaskToken: taskToken || '',
              ExecutionArn: arn || '',
              PaymentID: -1,
            },
          }).then(() => {
            setLoading(false);
            stopTimer();
          });
        }}
      >
        Clear Timer
      </LoadingButton>
    </Alert>
  ) : null;
};

export default Timer;
