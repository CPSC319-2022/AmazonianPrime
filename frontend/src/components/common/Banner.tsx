import { useState, useEffect } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import "./Banner.scss";

function Banner() {
  // todo change type
  const [user, setUser] = useState<any>();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/user")
      .then((res) => res.json())
      .then((res) => {
        const address = res.user.address;
        setUser(res.user);
        setAddress(
          `${address.streetAddress}, ${address.city}, ${address.province} ${address.postalCode}`
        );
      });
  }, [setUser]);
  return (
    <div className="banner">
      <span className="banner__content">
        <PinDropIcon sx={{fontSize: 17, marginRight: "0.5em"}}/>
        {address}
      </span>
      <span className="banner__welcome-message">
        Welcome, {user?.firstName}!
      </span>
    </div>
  );
}

export default Banner;
