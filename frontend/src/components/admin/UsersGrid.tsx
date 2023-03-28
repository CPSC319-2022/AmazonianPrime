import { Grid } from '@mui/material';
import './UsersGrid.scss';
import User from './User';
import { useAppSelector } from '../../redux/store';
import { User as UserType } from '../../types/user';
interface UsersGridProps {
  users: UserType[] | undefined;
  changeTriggered: () => void;
}

const UsersGrid: React.FC<UsersGridProps> = ({ users, changeTriggered }) => {
  const isLoading = useAppSelector((state) => state.admin.isLoadingUsers);

  return (
    <div>
      <Grid container className="users__container-grid" columns={1}>
        {(!isLoading ? users : Array(8).fill(0))?.map((user: UserType, index) => (
          <Grid item xs={1} className="users__container__grid-item" key={index}>
            <User user={user} changeTriggered={changeTriggered} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UsersGrid;
