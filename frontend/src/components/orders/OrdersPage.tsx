import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import './OrdersPage.scss';
import SearchIcon from '@mui/icons-material/Search';
import Ordered from './Ordered';
import Delivered from './Delivered';

function OrdersPage() {
  return (<div className="orders-page">
    <div className="orders">
      Orders
    </div>
    <Grid container rowSpacing={0} className="orders-page__main">
      <Grid item xs={1.2}>
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            className="orders-page__header-text"
            size="small"
            variant="standard"
            style={{ backgroundColor: '#ffffff', width: 100}}>
              <MenuItem value={"ordered"}>Ordered</MenuItem>
              <MenuItem value={"delivered"}>Delivered</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={10.8} paddingTop={2} marginBottom={-10}>
        <TextField
          placeholder="Search…"
          size="small"
          style={{ height: 100 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ), 
            style: {
              height: "30px",
              width: "300px",
            }
          }}
        />
      </Grid>
      <Ordered/>
      <Delivered/>
    </Grid>
    
  </div>
  );
}

export default OrdersPage;
