import PinDropIcon from '@mui/icons-material/PinDrop';
import './Banner.scss';
import { useLocation } from "react-router-dom";
import { useAppSelector } from '../../redux/store';

function Banner() {
  const user = useAppSelector((state) => state.user.value);
  const isOnLoginPage = useLocation().pathname.includes("/login");

  if (isOnLoginPage) return (
    <div className="banner">
      <span className="banner__content">Amazonian Prime</span>
    </div>
  )
  
  if (!user) {
    return null
  }

  const { address } = user;
  return (
    <div className="banner">
      <span className="banner__content">
        <PinDropIcon sx={{ fontSize: 17, marginRight: '0.5em' }} />
        {`${address.streetAddress}, ${address.city}, ${address.province} ${address.postalCode}`}
      </span>
      <span className="banner__welcome-message">Welcome, {user.firstName}!</span>
    </div>
  );
}

export default Banner;
