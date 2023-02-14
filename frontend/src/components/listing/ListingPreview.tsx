import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListingPreview as ListingPreviewType } from '../../types/listingPreview';
import './ListingPreview.scss';

interface ListingPreviewProps {
  listing: ListingPreviewType;
}

const ListingPreview: React.FC<ListingPreviewProps> = ({ listing }) => {
  const navigate = useNavigate();
  const { imagePreview, listingName, cost, user, id } = listing;

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
        <img className="listing-preview__image" src={`data:image/jpeg;base64,${imagePreview}`} height="250px" />
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
