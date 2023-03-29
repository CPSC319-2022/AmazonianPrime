import PinDropIcon from '@mui/icons-material/PinDrop';
import './Banner.scss';
import { useAppSelector } from '../../redux/store';
import { useGetShippingAddressQuery } from '../../redux/api/user';
import useAdminPrivelege from '../../utils/useAdminPrivelege';

function Banner() {
  const user = useAppSelector((state) => state.user.value);
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  const preferredShippingAddressIndex = useAppSelector((state) => state.user.preferredShippingAddressIndex);
  const { data: shippingAddresses } = useGetShippingAddressQuery(user?.UserID || '');

  if (!user?.Department)
    return (
      <div className="banner">
        <span className="banner__content">Amazonian Prime</span>
      </div>
    );

  let shippingContent = '';
  if (shippingAddresses) {
    const address = shippingAddresses[preferredShippingAddressIndex ?? 0];
    shippingContent = `${address.StreetAddress}, ${address.CityName} ${address.Province}`;
  }

  return (
    <div className="banner">
      <div className="banner__content">
        <span className="banner__address">
          {isAdminPrivelegeRequested ? (
            <span>Administrator</span>
          ) : (
            <>
              <PinDropIcon sx={{ fontSize: 17, marginRight: '0.5em' }} />
              {shippingContent}
            </>
          )}
        </span>
        <span className="banner__welcome-message">Welcome, {user.FirstName}!</span>
      </div>
    </div>
  );
}

export default Banner;
