import React from 'react';
import './BuyerRegistration.scss';
import Banner from '../common/Banner';

import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

function BuyerRegistration() {
    const navigate = useNavigate();
    function openRegistrationPage() {
        navigate(`/login/signup`);
    }
  return (
    <div className="buyer-registration-page">
      <Banner />
      <div className="buyer-registration-page__contents">
      </div>
    </div>
  );
}

export default BuyerRegistration;
