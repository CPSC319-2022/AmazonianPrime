import { useState, useEffect } from 'react';
import useAdminPrivelege from './useAdminPrivelege';
import { useDispatch } from 'react-redux';
import { useLazyShoppingCartQuery } from '../redux/api/shoppingCart';
import { useAppSelector } from '../redux/store';
import { unsetCartLock } from '../redux/reducers/appSlice';
import { useLazyGetUsersQuery } from '../redux/api/admin';
import { setIsLoadingCart, addItemsToCart } from '../redux/reducers/shoppingCartSlice';

export const useCartLock = () => {
  let interval: any;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const dispatch = useDispatch();
  const deadline = useAppSelector((state) => state.app.expiryDate);
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const user = useAppSelector((state) => state.user.value);
  const [trigger, { isLoading, data }] = useLazyShoppingCartQuery();
  useEffect(() => {
    if (isAdminPrivelegeRequested) {
      // clearCartStorage();
    }
  }, [isAdminPrivelegeRequested]);

  useEffect(() => {
    dispatch(setIsLoadingCart({ isLoading }));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(setIsLoadingCart(false));
      dispatch(addItemsToCart(data));
    }
  }, [data]);

  const getTime = () => {
    if (!deadline) {
      return;
    }
    const time = Date.parse(deadline) - Date.now();

    if (time <= 0) {
      dispatch(unsetCartLock(null));
      trigger(user?.UserID || '');
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
    minutes,
    seconds,
  };
};
