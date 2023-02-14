import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import './LoginPage.scss';
import Banner from '../common/Banner';


function LoginPage () {
    return (
        <div className="login-page">
        <div className="user-info-bar">
            <Banner />
        </div>
        </div>
    );
}

export default LoginPage;
