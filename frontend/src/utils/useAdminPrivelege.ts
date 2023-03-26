import { useMemo, useState } from 'react';
import { useAppSelector } from '../redux/store';

export const key = 'adminPrivelegeRequested';

const useAdminPrivelege = () => {
  const user = useAppSelector((state) => state.user.value);
  const [isRequestedState, setIsRequestedState] = useState(
    sessionStorage.getItem(key) === 'true' && user?.IsAdmin === 1,
  );

  window.addEventListener('storageChangeEvent', () => {
    setIsRequestedState(sessionStorage.getItem(key) === 'true' && user?.IsAdmin === 1);
  });
  if (!user?.IsAdmin) {
    return { isAdmin: false };
  }
  const setPrivelege = (isRequested: boolean) => {
    if (isRequested !== undefined) {
      setIsRequestedState(isRequested);
      sessionStorage.setItem(key, new Boolean(isRequested && user?.IsAdmin).toString());
      window.dispatchEvent(new Event('storageChangeEvent'));
    }
  };

  return { isAdmin: true, isAdminPrivelegeRequested: isRequestedState, setPrivelege };
};

export default useAdminPrivelege;
