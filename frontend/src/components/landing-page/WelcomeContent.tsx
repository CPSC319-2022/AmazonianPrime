import { Button } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import './WelcomeContent.scss';
import { useDispatch } from 'react-redux';
import { modifyCreateListingModalVisibility } from '../../redux/reducers/sellerModalSlice';
import useAdminPrivelege from '../../utils/useAdminPrivelege';

function WelcomeContent() {
  const user = useAppSelector((state) => state.user.value);
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const dispatch = useDispatch();

  function handleOpenSellerModal() {
    dispatch(modifyCreateListingModalVisibility(true));
  }

  return (
    <div className="welcome-content">
      <div className="welcome-content__messages-background">
        <div className="welcome-content__messages">
          <div className="welcome-content__main-message">
            {isAdminPrivelegeRequested ? (
              <span>
                As an <p>Administrator</p>, you can manage
                <br /> Listings, Users, and Orders.
              </span>
            ) : (
              <span>
                At <p>Amazonian Prime</p>,<br /> Amazonians Are All Prime Members.
              </span>
            )}
          </div>
          <span>Welcome {user?.FirstName}, to Your Office-Powered Marketplace. </span>
          {!isAdminPrivelegeRequested && (
            <Button
              color="secondary"
              variant="contained"
              className="welcome-content__button"
              onClick={() => handleOpenSellerModal()}
            >
              Sell Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;
