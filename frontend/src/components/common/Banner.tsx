import PinDropIcon from "@mui/icons-material/PinDrop";
import "./Banner.scss";
import { useAppSelector } from "../../redux/store";

function Banner() {
  const user = useAppSelector((state) => state.user.value);
  if (!user) return null;
  const { address } = user;
  return (
    <div className="banner">
      <span className="banner__content">
        <PinDropIcon sx={{ fontSize: 17, marginRight: "0.5em" }} />
        {`${address.streetAddress}, ${address.city}, ${address.province} ${address.postalCode}`}
      </span>
      <span className="banner__welcome-message">
        Welcome, {user.firstName}!
      </span>
    </div>
  );
}

export default Banner;
