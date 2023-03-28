import { Button, Grid } from "@mui/material";
import './User.scss';
import { useChangePrivilegeLevelMutation } from '../../redux/api/admin';
import { useAppSelector } from '../../redux/store';
import { User as UserType } from '../../types/user';
import CloseIcon from '@mui/icons-material/Close';

interface UserProps {
    user: UserType;
}

const User: React.FC<UserProps> = ({
    user,
}) => {
    const thisUserID = useAppSelector((state) => state.user.value?.UserID);
    const [changePrivilege] = useChangePrivilegeLevelMutation();
    const { FirstName, LastName, Department, IsAdmin, Email, UserID } = user;

    function swapPrivilegeLevel() {
        const userInfo = {
            UserID: thisUserID,
            IsAdmin: (IsAdmin == 0) ? 1 : 0
          };
        changePrivilege({user: UserID, body: userInfo})
    }
    return (
        <div>
          <Grid item xs={1} marginTop={3} className="user">
            <div>
                <div className="user__username">{FirstName} {LastName}, {Department}</div>
                <div className="user__user-information">{Email}</div>
            </div>
            <div className="user__buttons">
                <Button 
                    className="user__button" 
                    variant="contained" 
                    color="secondary" 
                    onClick={swapPrivilegeLevel}> 
                    {IsAdmin ? "Demote" : "Promote"} 
                </Button> 
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