import { TextField, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setPaymentAddress } from '../../redux/reducers/paymentAddressSlice';
import { setShippingAddress } from '../../redux/reducers/shippingAddressSlice';

interface AddressGridProps {
  isShippingAddress: boolean;
  isBillingAddress: boolean;
}

const AddressGrid: React.FC<AddressGridProps> = ({ isShippingAddress, isBillingAddress }) => {
  const user = useAppSelector((state) => state.user.value);
  const paymentAddress = useAppSelector((state) => state.paymentAddress.value);
  const shippingAddress = useAppSelector((state) => state.shippingAddress.value);

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

  isBillingAddress
    ? (newAddress = {
        AddressID: paymentAddress?.AddressID,
        UserID: user?.UserID,
        CityName: paymentAddress?.CityName,
        Province: paymentAddress?.Province,
        StreetAddress: paymentAddress?.StreetAddress,
        PostalCode: paymentAddress?.PostalCode,
        Country: paymentAddress?.Country,

        IsBillingAddr: isBillingAddress,
        IsShipAddr: isShippingAddress,
      })
    : (newAddress = {
        AddressID: shippingAddress?.AddressID,
        UserID: user?.UserID,
        CityName: shippingAddress?.CityName,
        Province: shippingAddress?.Province,
        StreetAddress: shippingAddress?.StreetAddress,
        PostalCode: shippingAddress?.PostalCode,
        Country: shippingAddress?.Country,

        IsBillingAddr: isBillingAddress,
        IsShipAddr: isShippingAddress,
      });

  function handleStreetAddressInput(input: any) {
    newAddress.StreetAddress = input.target.value;

    if (isBillingAddress) {
      dispatch(setPaymentAddress(newAddress));
    } else if (isShippingAddress) {
      dispatch(setShippingAddress(newAddress));
    }
  }

  function handleCityInput(input: any) {
    newAddress.CityName = input.target.value;

    if (isBillingAddress) {
      dispatch(setPaymentAddress(newAddress));
    } else if (isShippingAddress) {
      dispatch(setShippingAddress(newAddress));
    }
  }

  function handleProvinceInput(input: any) {
    newAddress.Province = input.target.value;

    if (isBillingAddress) {
      dispatch(setPaymentAddress(newAddress));
    } else if (isShippingAddress) {
      dispatch(setShippingAddress(newAddress));
    }
  }

  function handlePostalCodeInput(input: any) {
    newAddress.PostalCode = input.target.value;

    if (isBillingAddress) {
      dispatch(setPaymentAddress(newAddress));
    } else if (isShippingAddress) {
      dispatch(setShippingAddress(newAddress));
    }
  }

  function handleCountryInput(input: any) {
    newAddress.Country = input.target.value;

    if (isBillingAddress) {
      dispatch(setPaymentAddress(newAddress));
    } else if (isShippingAddress) {
      dispatch(setShippingAddress(newAddress));
    }
  }

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
            onChange={handleStreetAddressInput}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth required label="City" defaultValue="" variant="filled" onChange={handleCityInput} />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Province"
            defaultValue=""
            variant="filled"
            onChange={handleProvinceInput}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Postal Code"
            defaultValue=""
            variant="filled"
            onChange={handlePostalCodeInput}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            label="Country"
            defaultValue=""
            variant="filled"
            onChange={handleCountryInput}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressGrid;
