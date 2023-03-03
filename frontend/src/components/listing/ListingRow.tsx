import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import './ListingRow.scss';
import { IconButton } from '@mui/material';
import ListingPreview from './ListingPreview';
import { ListingPreview as ListingPreviewType } from '../../types/listingPreview';

interface ListingRowProps {
  title: string;
  isLoading: boolean;
  listings: ListingPreviewType[];
}

const ListingRow: React.FC<ListingRowProps> = ({ title, listings, isLoading }) => {
  return (
    <div className="listing-row">
      <h2 className="listing-row__title">{title}</h2>

      <ScrollMenu scrollContainerClassName="listing-row__list" LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {(!isLoading ? listings : Array(10).fill(0)).map((listing, index) => (
          <ListingPreview listing={listing} key={index} />
        ))}
      </ScrollMenu>
    </div>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

  return (
    <div className="listing-row__button-container">
      <IconButton
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
        color="primary"
        component="label"
        className="listing-row__button"
      >
        <ArrowLeftIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div className="listing-row__button-container">
      <IconButton
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
        color="primary"
        component="label"
        className="listing-row__button"
      >
        <ArrowRightIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </div>
  );
}

export default ListingRow;
