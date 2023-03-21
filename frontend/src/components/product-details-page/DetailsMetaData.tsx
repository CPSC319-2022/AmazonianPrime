import { Grid, Select, MenuItem } from '@mui/material';
import React, { useRef } from 'react';
import { useAppSelector } from '../../redux/store';
import { QuantitySelect } from '../common/QuantitySelect';
import './DetailsMetaData.scss';

const DetailsMetaData: React.FC<{ quantityRef: any }> = ({ quantityRef }) => {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  if (!listing) {
    return null;
  }
  const getDetailsRow = (category: string, value: string) => (
    <>
      <Grid item xs={3}>
        <p className="product-details__details__grey-text">{category}</p>
      </Grid>
      <Grid item xs={9}>
        <p className="product-details__details__category-value">{value}</p>
      </Grid>
    </>
  );
  return (
    <div>
      <div className="product-details__small-header">Details</div>
      <Grid container rowSpacing={0} className="product-details__small-text">
        {getDetailsRow('Condition', listing.ItemCondition)}
        {getDetailsRow('Category', listing.Category)}
        {getDetailsRow('Brand', listing.Brand ? listing.Brand : 'N/A')}
        {getDetailsRow('Colour', listing.Colour ? listing.Colour : 'N/A')}
        {getDetailsRow('Size', listing.Size ? listing.Size : 'N/A')}
        <Grid item xs={3}>
          <p className="product-details__details__grey-text">Quantity</p>
        </Grid>
        <Grid item xs={9} marginTop={1.5}>
          <QuantitySelect quantity={listing.Quantity} selectRef={quantityRef} />
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailsMetaData;
