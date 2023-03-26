import { useMemo, useState } from 'react';
import { useAppSelector } from '../redux/store';

export const key = 'adminPrivelegeRequested';

const useAdminPrivelege = () => {
  const [isRequestedState, setIsRequestedState] = useState(false);
  const user = useAppSelector((state) => state.user.value);
  const isAdminPrivelegeRequested = useMemo(
    () => sessionStorage.getItem(key) === 'true' && user?.IsAdmin === 1,
    [isRequestedState],
  );
  if (!user?.IsAdmin) {
    return { isAdmin: false };
  }
  const setPrivelege = (isRequested: boolean) => {
    if (isRequested !== undefined) {
      setIsRequestedState(isRequested);
      sessionStorage.setItem(key, new Boolean(isRequested && user?.IsAdmin).toString());
    }
  };

  return { isAdmin: true, isAdminPrivelegeRequested, setPrivelege };
};

export default useAdminPrivelege;
