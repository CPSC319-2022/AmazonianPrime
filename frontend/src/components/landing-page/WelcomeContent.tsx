import { Button } from "@mui/material";
import "./WelcomeContent.scss";

function WelcomeContent() {
    return (
      <div className="welcome-content">
        <div className="welcome-content__messages">
        <span  className="welcome-content__main-message">At Amazonian Prime, We're All Prime Members.</span>
        <span>Welcome NAME, to your office-powered marketplace. </span>
        <Button color="secondary" variant="contained" className="welcome-content__button">
                Sell Now
              </Button>
        </div>
      </div>
    );
  } 
  
  export default WelcomeContent;