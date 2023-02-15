import React from 'react';
import './BuyerRegistration.scss';
import Banner from '../common/Banner';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
} from '@mui/material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

function BuyerRegistration() {
    const navigate = useNavigate();
    function openHomePage() {
        navigate(`/`);
    }
  return (
    <div className="buyer-registration-page">
      <Banner />
      <div className="buyer-registration-page__box">
        <div className="buyer-registration-page__box-contents">
          <div className="buyer-registration-page__welcome">
            <span>
            Welcome to Amazonian Prime
            </span>
          </div>
          <div className="buyer-registration-page__prompt">
            <span>
            We’ve noticed that you’re a <p>new user.</p> Before you start connecting with 
            fellow Amazonians, <br />please give us some more information about yourself.
            </span>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth required label="First Name" defaultValue="" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth required label="Last Name" defaultValue="" variant="filled" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required label="User Name" defaultValue="" variant="filled" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required label="Department" defaultValue="" variant="filled" />
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          variant="contained"
          className="buyer-registration-page__button"
          endIcon={<TrendingFlatIcon />}
          onClick={() => openHomePage()}
          >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}

export default BuyerRegistration;
