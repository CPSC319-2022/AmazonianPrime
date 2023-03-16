import { TextField, Grid } from '@mui/material';

interface AddressGridProps {
  setAddressInput: (e: string) => void;
  setCityInput: (e: string) => void;
  setProvinceInput: (e: string) => void;
  setPostalCodeInput: (e: string) => void;
  setCountryInput: (e: string) => void;
}

const AddressGrid: React.FC<AddressGridProps> = ({
  setAddressInput,
  setCityInput,
  setProvinceInput,
  setPostalCodeInput,
  setCountryInput,
}) => {
  return (
    <div className="address-grid">
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Street Address"
            defaultValue=""
            variant="filled"
            onChange={(e) => setAddressInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="City"
            defaultValue=""
            variant="filled"
            onChange={(e) => setCityInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Province"
            defaultValue=""
            variant="filled"
            onChange={(e) => setProvinceInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Postal Code"
            defaultValue=""
            variant="filled"
            onChange={(e) => setPostalCodeInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Country"
            defaultValue=""
            variant="filled"
            onChange={(e) => setCountryInput(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressGrid;
