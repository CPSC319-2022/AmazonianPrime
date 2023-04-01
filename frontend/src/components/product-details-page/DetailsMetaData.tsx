import { FormControl, Grid, Tooltip } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../redux/store';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ShoppingCartItem } from '../../types/shoppingCartItem';
import { useCartLock } from '../../utils/useCartLock';
import { QuantitySelect } from '../common/QuantitySelect';
import './DetailsMetaData.scss';

const DetailsMetaData: React.FC<{ selectQuantity: number; setSelectQuantity: any; itemInCart?: ShoppingCartItem }> = ({
  selectQuantity,
  setSelectQuantity,
  itemInCart,
}) => {
  const {isCartLocked} = useCartLock();
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

  let shownListingQuantity = listing.Quantity;
  if (shownListingQuantity <= 0 && isCartLocked) {
    shownListingQuantity = itemInCart?.Quantity ?? 0
  }
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
          <span className="product-details__details__grey-text">({shownListingQuantity} items available)</span>
        </Grid>
        <Grid item xs={9} marginTop={1.5} className="product-details__quantity-container">
          <FormControl
          disabled={isCartLocked}
          >
          <QuantitySelect
            quantity={shownListingQuantity}
            controlledValue={selectQuantity}
            setValue={setSelectQuantity}
            defaultValue={itemInCart?.Quantity}
          />
          
          </FormControl>
          {
          !isCartLocked && itemInCart && itemInCart?.Quantity > listing.Quantity ? <div className="cart__listing-low-stock">
            <ErrorOutlineIcon color="primary"/>
            <span>Looks like the stock has changed since you left</span></div> : null
        }
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailsMetaData;
