import { TextField, Grid } from '@mui/material';

function AddressGrid() {
  return (
    <div className='address-grid'>
      <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <TextField fullWidth required label="Street Address" defaultValue="" variant="filled" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth required label="City" defaultValue="" variant="filled" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth required label="Province" defaultValue="" variant="filled" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth required label="Postal Code" defaultValue="" variant="filled" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth required label="Country" defaultValue="" variant="filled" />
          </Grid>
        </Grid>
    </div>
  );
}

export default AddressGrid;
