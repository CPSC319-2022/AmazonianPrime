import { Button, Grid } from "@mui/material";
import './User.scss';
import { setIsLoadingListings, setListings } from '../../redux/reducers/listingsSlice';
import { useDispatch } from 'react-redux';
import { User as UserType } from '../../types/user';
import CloseIcon from '@mui/icons-material/Close';

interface UserProps {
    user: UserType;
}

const User: React.FC<UserProps> = ({
    user,
}) => {
    const { FirstName, LastName, Department, IsAdmin, Email } = user;

    return (
        <div>
          <Grid item xs={1} marginTop={3} className="user">
            <div>
                <div className="user__username">{FirstName} {LastName}, {Department}</div>
                <div className="user__user-information">{Email}</div>
            </div>
            <div className="user__buttons">
                {IsAdmin ? 
                    <Button className="user__button" variant="contained" color="secondary" onClick={() => {}}> Demote </Button> :
                    <Button className="user__button" variant="contained" color="secondary" onClick={() => {}}> Promote </Button>
                }
                <Button
                    variant="contained"
                    className="user__button"
                    color="secondary" 
                    onClick={() => {}}
                    startIcon={<CloseIcon/> }
                > Deactivate 
                </Button>
            </div>
          </Grid>
        </div>
    )
}

export default User;