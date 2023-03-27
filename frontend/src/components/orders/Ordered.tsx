import { Grid } from "@mui/material";
import './Ordered.scss';

function Ordered() {
    //todo get data, iterate and return all ordered items
    return (
    <>
         <Grid item xs={1.9} marginTop={5}>
        <img
          src={""}
          height={200}
          width={200}
        />
      </Grid>
      <Grid item xs={10.1} marginTop={5}>
          <div className="orders-page__ordered__header-text">Item Name</div>
          <div className="orders-page__ordered__text">Sellor Name sold to Buyer Name</div>
          <div className="orders-page__ordered__grey-text">Delivery Method</div>
      </Grid>
    </>
    )
}

export default Ordered;