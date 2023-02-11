import ListingRow from "../listing/ListingRow";
import "./LandingPage.scss";
import WelcomeContent from "./WelcomeContent";
import { useState, useEffect } from "react";
import { useGetUserQuery } from "../../redux/api/user";
import { setUser } from "../../redux/reducers/userSlice";
import { useAppDispatch } from "../../redux/store";

function LandingPage() {
  // TODO: fix type
  const [listings, setListings] = useState<any[]>();
  const dispatch = useAppDispatch();

  // TODO: maybe move this
  const { data } = useGetUserQuery();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

  // TODO: add to redux RTK
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/listings")
      .then((res) => res.json())
      .then((listings) => {
        setListings(listings);
      });
  }, []);

  return (
    <div>
      <div className="landing-page__welcome-content">
        <WelcomeContent />
      </div>
      {listings && (
        <>
          <ListingRow title={"Recently Added"} listings={[...listings, ...listings, ...listings]} />
          <ListingRow title={"Amazon Exclusives"} listings={listings} />
        </>
      )}
    </div>
  );
}

export default LandingPage;
