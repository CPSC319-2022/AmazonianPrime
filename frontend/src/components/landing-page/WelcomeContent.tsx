import { Button } from "@mui/material";
import "./WelcomeContent.scss";

function WelcomeContent() {
  return (
    <div className="welcome-content">
      <div className="welcome-content__messages-background">
        <div className="welcome-content__messages">
          <div className="welcome-content__main-message">
            <span>
              At <p>Amazonian Prime</p>,
            </span>
            <span> We're All Prime Members.</span>
          </div>
          <span>Welcome name, To Your Office-Powered Marketplace. </span>
          <Button
            color="secondary"
            variant="contained"
            className="welcome-content__button"
          >
            Sell Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;
