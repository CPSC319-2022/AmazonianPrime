import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteListingMutation } from '../../redux/api/listings';
import { setPartialListingDetails } from '../../redux/reducers/listingsSlice';
import { useAppSelector } from '../../redux/store';
import { ListingPreview as ListingPreviewType } from '../../types/listingPreview';
import useBreadcrumbHistory from '../common/useBreadcrumbHistory';
import './ListingPreview.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ListingPreviewSkeleton } from './ListingPreviewSkeleton';
import DeleteListingButton from '../common/DeleteListingButton';

interface ListingPreviewProps {
  listing: ListingPreviewType | null;
  imageHeight?: string;
  imageWidth?: string;
  showRemoveListingButton?: boolean;
}

const ListingPreview: React.FC<ListingPreviewProps> = ({
  listing,
  imageHeight,
  imageWidth,
  showRemoveListingButton = false,
}) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const height = '250px';
  const width = imageWidth ?? '220px';
  const history = useBreadcrumbHistory();
  const [deleteListing] = useDeleteListingMutation();
  const user = useAppSelector((state) => state.user.value);

  if (!listing) {
    return <ListingPreviewSkeleton imageHeight={height} imageWidth={width} />;
  }
  const { ImagePreview, ListingName, Cost, User, ListingID } = listing;

  return (
    <div tabIndex={0} className="listing-preview">
      <img
        onClick={() => {
          dispath(setPartialListingDetails(listing));
          navigate(`/listing/${ListingID}`, { state: { ...history } });
        }}
        className="listing-preview__image"
        src={ImagePreview}
        height={imageHeight ?? height}
        width={width}
      />
      <span className="listing-preview__cost">${Cost}</span>
      <div className="listing-preview__name">{ListingName}</div>
      {showRemoveListingButton ? (
        <DeleteListingButton listingId={ListingID} />
      ) : (
        <div>
          {User?.FirstName}&nbsp;{User?.LastName?.charAt(0)}.
        </div>
      )}
    </div>
  );
};

export default ListingPreview;
