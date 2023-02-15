import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/EmailOutlined';

function Description(user: any) {

    return (
        <div className="description">
            <h3 id="description-title">Description</h3>
            <div id="description-body">
                Young and vibrant Monstera plant, great for office or home decor
            </div>
            <Button id="email-button" color="primary" size="small" startIcon={<EmailIcon />}>
                email {user?.firstName} about this listing
            </Button>
            <br></br>
            <Button id="report-button" size="small">
            report this listing
            </Button>
        </div>
    )
}

export default Description;