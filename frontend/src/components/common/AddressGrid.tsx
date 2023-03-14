import { TextField, Grid } from '@mui/material';
import { useAppDispatch } from '../../redux/store';

interface AddressGridProps {
  setAddressInput: Function;
  setCityInput: Function;
  setProvinceInput: Function;
  setPostalCodeInput: Function;
  setCountryInput: Function;
}

const AddressGrid: React.FC<AddressGridProps> = ({
  setAddressInput,
  setCityInput,
  setProvinceInput,
  setPostalCodeInput,
  setCountryInput,
}) => {
  const dispatch = useAppDispatch();

  let newAddress: {
    StreetAddress: any;
    CityName: any;
    Province: any;
    PostalCode: any;
    Country: any;
    AddressID?: string | undefined;
    UserID?: string | undefined;
    IsBillingAddr?: boolean;
    IsShipAddr?: boolean;
  };

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
