import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import picture from "../../images/frog.jpg";
import "./ListingRow.scss";

interface ListingPreviewProps {
  // TODO: add type
  listing: any;
  onClick: (param: any) => any;
}

const ListingPreview: React.FC<ListingPreviewProps> = ({
  onClick,
  listing,
}) => {
  const { image, listingName, cost, condition, description } = listing;
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        margin: "1em",
      }}
      tabIndex={0}
    >
      <div>
        <img src={`data:image/jpeg;base64,${image}`} height="250px"/>
        <span>${cost}</span>
        <div>{listingName}</div>
      </div>
    </div>
  );
};

export default ListingPreview;
