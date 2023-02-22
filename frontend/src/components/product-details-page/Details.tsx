import { Grid, Select, MenuItem } from '@mui/material';
import { useAppSelector } from '../../redux/store';

function Details() {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  if (!listing) {
    return null;
  }
  const getDetailsRow = (category: string, value: string) => (
    <>
      <Grid item xs={3}>
        <p className="grey">{category}</p>
      </Grid>
      <Grid item xs={9}>
        <p className="category-value">{value}</p>
      </Grid>
    </>
  );
  return (
    <div>
      <div className="small-header">Details</div>
      <Grid container rowSpacing={0} className="small-font">
        {getDetailsRow('Condition', listing.condition)}
        {getDetailsRow('Size', 'N/A')}
        {getDetailsRow('Brand', 'N/A')}
        {getDetailsRow('Colour', 'N/A')}
        <Grid item xs={3}>
          <p className="grey">Quantity</p>
        </Grid>
        <Grid item xs={9} marginTop={1}>
          <Select className="select" defaultValue={1} size="small" style={{ backgroundColor: '#e0e0e0' }}>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}

export default Details;
