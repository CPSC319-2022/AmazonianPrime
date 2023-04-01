import { Alert } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useState, useEffect } from 'react';
import useAdminPrivelege from './useAdminPrivelege';
import { useDispatch } from 'react-redux';
import { shoppingCartApi } from '../redux/api/shoppingCart';
import { listingsApi } from '../redux/api/listings';

export const useCartLock = () => {
    let interval: any;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [deadline, setDeadline] = useState(sessionStorage.getItem('cartExpiryTime'));
  const [arn, setArn] = useState(sessionStorage.getItem('arn'));
  const [taskToken, setTaskToken] = useState(sessionStorage.getItem('taskToken'))
  const { isAdminPrivelegeRequested } = useAdminPrivelege();

  const clearCartStorage =() => {
    clearInterval(interval)
    sessionStorage.removeItem('arn');
    sessionStorage.removeItem('taskToken');
    sessionStorage.removeItem('cartExpiryTime');

    setArn(null)
    setTaskToken(null)
    setDeadline(null)
    dispatch(shoppingCartApi.util.invalidateTags(['CartItems']));
    dispatch(listingsApi.util.invalidateTags(['Listings', 'UserListings', 'ListingDetails']))
  }

  useEffect(() => {
    if (isAdminPrivelegeRequested) {
        clearCartStorage();
    }
  }, [isAdminPrivelegeRequested]);


  const setCartStorage = (arnInput: string, taskTokenInput: string, cartExpiryTime: string) => {
    sessionStorage.setItem('arn', arnInput);
    sessionStorage.setItem('taskToken', taskTokenInput);
    sessionStorage.setItem('cartExpiryTime', cartExpiryTime);

    setArn(arnInput);
    setTaskToken(taskTokenInput);
    setDeadline(cartExpiryTime)
    getTime();
  }

  const getTime = () => {
    if (!deadline) {
      return;
    }
    const time = Date.parse(deadline) - Date.now();

    if (time <= 0) {
      clearCartStorage();
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

  return {
    isCartLocked: deadline !== null,
    clearCartStorage,
    setCartStorage,
    arn,
    taskToken,
    cartExpiryTime: deadline,
    minutes,
    seconds,
    isLoading
}
};