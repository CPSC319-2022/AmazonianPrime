import { Grid, Pagination } from "@mui/material";
import './UsersGrid.scss';
import { setIsLoadingListings, setListings } from '../../redux/reducers/listingsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import User from "./User";
import { useAppSelector } from '../../redux/store';
import { User as UserType } from '../../types/user';
interface UsersGridProps {
  users: UserType[] | undefined;
}

const UsersGrid: React.FC<UsersGridProps> = ({
  users,
}) => {
  const isLoading = useAppSelector((state) => state.admin.isLoadingUsers);

  return (
      <div>
        <Grid container className="users__container-grid" columns={1}>
            {(!isLoading ? users : Array(20).fill(0))?.map((user: UserType, index) => (
              <Grid item xs={1} className="users__container__grid-item" key={index}>
                <User
                  user={user}
                />
              </Grid>
            ))}
          </Grid>
      </div>
    )
}

export default UsersGrid;