import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import './LoginPage.scss';
import Banner from '../common/Banner';


function LoginPage () {
    return (
        <div className="login-page">
        <Banner />
        <div className="login-page__contents">
            <div className="login-page__messages">
                <div className="login-page__welcome-message">
                    <span>
                    Welcome to<br /> Amazonian Prime
                    </span>
                </div>
                    <div className="login-page__mission-statement">
                        <span>
                        Our goal is to increase<br /><p>interaction</p> and<br /><p>collaboration</p> through<br />
                        buying and selling items<br />within the Amazonian<br />community
                        </span>
                    </div>
                </div>
                <div className="login-page__login-prompts">
                        <span>
                        Sign in or Register
                        </span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
