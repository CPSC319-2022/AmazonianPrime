import { Grid, Select, MenuItem } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import './DetailsMetaData.scss';

function DetailsMetaData() {
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
        <Grid item xs={3}>
          <p className="product-details__details__grey-text">Quantity</p>
        </Grid>
        <Grid item xs={9} marginTop={1}>
          <Select
            className="product-details__details__select"
            defaultValue={1}
            size="small"
            style={{ backgroundColor: '#e0e0e0' }}
          >
            {Array.from(Array(listing.Quantity).keys()).map((quantity: number) => (
              <MenuItem value={`${quantity + 1}`}>{quantity + 1}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsMetaData;
