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
        </div>
      </div>
    </div>
  );
}

export default BuyerRegistration;
