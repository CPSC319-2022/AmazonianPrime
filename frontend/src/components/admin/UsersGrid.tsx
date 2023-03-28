import { Grid, Pagination } from "@mui/material";
import './UsersGrid.scss';
import { setIsLoadingListings, setListings } from '../../redux/reducers/listingsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import User from "./User";
import { User as UserType } from '../../types/user';
interface UsersGridProps {
  users: UserType[] | undefined;
  totalUsersNumber: number;
}

const UsersGrid: React.FC<UsersGridProps> = ({
  users,
  totalUsersNumber,
}) => {
  return (
      <>
        <Grid container className="users__container-grid" columns={1}>
            {(true ? users : Array(20).fill(0))?.map((user: UserType, index) => (
              <Grid item xs={1} className="users__container__grid-item" key={index}>
                <User
                  user={user}
                />
              </Grid>
            ))}
          </Grid>
      </>
    )
}

export default UsersGrid;