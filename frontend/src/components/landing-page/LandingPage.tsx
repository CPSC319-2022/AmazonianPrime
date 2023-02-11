import Banner from "../common/Banner";
import ListingRow from "../listing/ListingRow";
import ToolBar from "../common/ToolBar";
import "./LandingPage.scss";
import WelcomeContent from "./WelcomeContent";
import { useState, useEffect } from "react";

function LandingPage() {
  // TODO: fix type
  const [listings, setListings] = useState<any[]>();

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/listings")
      .then((res) => res.json())
      .then((listings) => {
        setListings(listings);
        console.log(listings)
      });
  }, [setListings]);

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
