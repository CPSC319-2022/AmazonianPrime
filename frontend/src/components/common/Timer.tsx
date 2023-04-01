import { Alert, Button } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useCartLock } from '../../utils/useCartLock';
import { useCancelCartLockMutation, useRetryCheckoutMutation } from '../../redux/api/shoppingCart';
import { useAppSelector } from '../../redux/store';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

const Timer = () => {
    const {isCartLocked, minutes, seconds, taskToken, arn, clearCartStorage} = useCartLock();
    const [retryCheckout] = useCancelCartLockMutation();
    const user = useAppSelector(state => state.user.value);
    const [loading, setLoading] = useState(false);
  return isCartLocked ? (
    <Alert icon={<AccessAlarmsIcon fontSize="inherit" />} severity="info" style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }}>
      We will hold the items in your Cart for the duration of this period:&nbsp;
      <strong>
        {minutes}:{seconds}.
      </strong>
      &nbsp; During this period you may not edit your Shopping Cart Items.
      <LoadingButton 
      size='small'
      loading={loading}
      color="secondary"
      style={{
        marginLeft: "1em",
        fontSize: "1em"
      }}
      onClick={() => {
        setLoading(true)
        retryCheckout({
            UserID: user?.UserID || '',
            body: {
              TaskToken: taskToken || '',
              ExecutionArn: arn || '',
              PaymentID: -1
            },
          }).then(() => {
            setLoading(false)
            clearCartStorage()
          })
      }}>Clear Timer</LoadingButton>
    </Alert>
  ) : null;
};

export default Timer;
