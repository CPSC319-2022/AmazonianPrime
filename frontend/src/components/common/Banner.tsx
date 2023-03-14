import PinDropIcon from '@mui/icons-material/PinDrop';
import './Banner.scss';
import { useAppSelector } from '../../redux/store';

function Banner() {
  const user = useAppSelector((state) => state.user.value);

  if (!user)
    return (
      <div className="banner">
        <span className="banner__content">Amazonian Prime</span>
      </div>
    );

  // TODO: use get address endpoint to access this information later
  const address = {
    streetAddress: '2366 Main Mall',
    city: 'Vancouver',
    province: 'BC',
    postalCode: 'V6T 1Z4',
  };

  return (
    <div className="banner">
      <div className="banner__content">
        <span className="banner__address">
          <PinDropIcon sx={{ fontSize: 17, marginRight: '0.5em' }} />
          {`${address.streetAddress}, ${address.city}, ${address.province} ${address.postalCode}`}
        </span>
        <span className="banner__welcome-message">Welcome, {user.FirstName}!</span>
      </div>
    </div>
  );
}

export default Banner;
