import { Dialog, DialogTitle, DialogContent, DialogContentText, Tooltip } from '@mui/material';
import './RegisterSellerModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '../../redux/store/index';
import { modifyRegisterUserModalVisibility, modifyIsSellerRegistered } from '../../redux/reducers/sellerModalSlice';
import HelpIcon from '@mui/icons-material/Help';
import RegisterSeller from '../common/RegisterSeller';

function RegisterSellerModal() {
  const isSellerModalOpen = useSelector((state: RootState) => state.sellerModal.isSellerModalOpen);
  const isSellerRegistered = useSelector((state: RootState) => state.sellerModal.isSellerRegistered);
  const dispatch = useDispatch();

  function handleClose(value: boolean) {
    dispatch(modifyIsSellerRegistered(value));
    dispatch(modifyRegisterUserModalVisibility(false));
  }

  return (
    <div>
      <Dialog open={isSellerModalOpen && !isSellerRegistered} onClose={() => handleClose(false)}>
        <DialogTitle>Register Before Selling</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={1}>
            <div className="register__title">
              <span>Before You Start Selling, Please Add Your Banking Details!</span>
              <Tooltip title="These banking details are different from the payment details you provided during the registration/ sign up. These details will allow other users to buy your product, and for you to get compensated.">
                <HelpIcon className="register__tooltip" sx={{ fontSize: '20px' }} />
              </Tooltip>
            </div>
          </DialogContentText>
          <RegisterSeller onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegisterSellerModal;
