import { Alert } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useState, useEffect } from 'react';
import useAdminPrivelege from '../../utils/useAdminPrivelege';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [deadline, setDeadline] = useState(sessionStorage.getItem('cartExpiryTime'));
  const { isAdminPrivelegeRequested } = useAdminPrivelege();

  useEffect(() => {
    if (isAdminPrivelegeRequested) {
      sessionStorage.removeItem('arn');
      sessionStorage.removeItem('taskToken');
      sessionStorage.removeItem('cartExpiryTime');
    }
  }, [isAdminPrivelegeRequested]);

  window.addEventListener('cartExpiryTimeEvent', () => {
    setMinutes(0);
    setSeconds(0);
    setDeadline(sessionStorage.getItem('cartExpiryTime'));
  });
  const getTime = () => {
    if (!deadline) {
      return;
    }
    const time = Date.parse(deadline) - Date.now();

    if (time <= 0) {
      sessionStorage.removeItem('arn');
      sessionStorage.removeItem('taskToken');
      sessionStorage.removeItem('cartExpiryTime');
      // reset
      setMinutes(0);
      setSeconds(0);
      setDeadline(null);
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
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return deadline !== null && minutes !== 0 && seconds !== 0 ? (
    <Alert icon={<AccessAlarmsIcon fontSize="inherit" />} severity="info">
      We will hold the items in your Cart for the duration of this period:&nbsp;
      <strong>
        {minutes}:{seconds}
      </strong>
    </Alert>
  ) : null;
};

export default Timer;
