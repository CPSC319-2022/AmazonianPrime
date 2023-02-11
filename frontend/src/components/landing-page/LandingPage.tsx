import ListingRow from "../listing/ListingRow";
import "./LandingPage.scss";
import WelcomeContent from "./WelcomeContent";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/store";

function LandingPage() {
  // TODO: fix type
  const [listings, setListings] = useState<any[]>();
  const dispatch = useAppDispatch();

  // TODO: add to redux RTK
  useEffect(() => {
    fetch("api/listings")
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
          <ListingRow
            title={"Recently Added"}
            listings={[...listings, ...listings, ...listings]}
          />
          <ListingRow title={"Amazon Exclusives"} listings={listings} />
        </>
      )}
    </div>
  );
}

export default LandingPage;
