import { Button } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import './WelcomeContent.scss';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../redux/reducers/sellerModalSlice';

function WelcomeContent() {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();

  function handleOpenSellerModal() {
    dispatch(toggleModal(true));
  }

  return (
    <div className="welcome-content">
      <div className="welcome-content__messages-background">
        <div className="welcome-content__messages">
          <div className="welcome-content__main-message">
            <span>
              At <p>Amazonian Prime</p>,<br /> Amazonians Are All Prime Members.
            </span>
          </div>
          <span>Welcome {user?.firstName}, to Your Office-Powered Marketplace. </span>
          <Button
            color="secondary"
            variant="contained"
            className="welcome-content__button"
            onClick={() => handleOpenSellerModal()}
          >
            Sell Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;
