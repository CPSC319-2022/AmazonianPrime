import { Grid } from "@mui/material";
import './Delivered.scss';

function Delivered() {
    //todo get data and iterate
 return (
<>
    <Grid item xs={2.2} marginTop={5}>
        <img
          src={""}
          height={100}
          width={100}
        />
      </Grid>
      <Grid item xs={6} marginTop={7}>
          <div className="orders-page__delivered__header-text">Item Name</div>
          <div className="orders-page__delivered__text">Sellor Name sold to Buyer Name</div>
          <div className="orders-page__delivered__grey-text">Delivery Method</div>
      </Grid>
      <Grid item xs={3.8} marginTop={9} className="orders-page__delivered__header-text">Delivered</Grid>
</>
 )
}

export default Delivered;