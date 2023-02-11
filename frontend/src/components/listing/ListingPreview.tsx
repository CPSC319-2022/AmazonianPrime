import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useNavigate } from 'react-router-dom';
import './ListingPreview.scss';

interface ListingPreviewProps {
  // TODO: add type
  listing: any;
}

const ListingPreview: React.FC<ListingPreviewProps> = ({ listing }) => {
  const navigate = useNavigate();
  const { image, listingName, cost, condition, description, user, id } = listing;

  return (
    <div
      onClick={() => {
        navigate(`listing/${id}`);
      }}
      style={{
        margin: '1em',
      }}
      tabIndex={0}
      className="listing-preview"
    >
      <div>
        <img src={`data:image/jpeg;base64,${image}`} height="250px" />
        <span className="listing-preview__cost">${cost}</span>
        <div>{listingName}</div>
        <div>
          {user.firstName}&nbsp;{user.lastName.charAt(0)}.
        </div>
      </div>
    </div>
  );
};

export default ListingPreview;
