import { Grid, Select, MenuItem } from '@mui/material';
import { useAppSelector } from '../../redux/store';
import { Listing } from '../../types/listing';
import { ListingPreview } from '../../types/listingPreview';

function Details() {
  const listing = useAppSelector((state) => state.listings.listingDetails);
  if (!listing) {
    return null;
  }
  const { listingName, cost, condition, user, id } = listing;
  const getDetailsRow = (category: string ,value: string) => (
    <>
    <Grid item xs={3}>
        <p className="category">{category}</p>
    </Grid>
    <Grid item xs={9}>
        <p  className="category-value" >{value}</p>
    </Grid>
    </>
  )
  return (
    <div>
      <h3 className="product-details">Details</h3>
      <Grid container rowSpacing={0} fontSize="small">
        {
          getDetailsRow("Condition", listing.condition)
        }
        {
          getDetailsRow("Size", "N/A")
        }
        {
          getDetailsRow("Brand", "N/A")
        }
        {
          getDetailsRow("Colour", "N/A")
        }
        <Grid item xs={3}>
          <p className="category">Quantity</p>
        </Grid>
        <Grid item xs={9} marginTop={1}>
          <Select className="select" defaultValue={1} size="small" >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}



export default Details;
