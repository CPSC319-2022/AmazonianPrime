import { Grid, Pagination } from "@mui/material";
import './UsersGrid.scss';
import { setIsLoadingListings, setListings } from '../../redux/reducers/listingsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import User from "./User";


function UsersGrid() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoading = false; //useAppSelector((state) => state.listings.isLoadingListings);


    return (
    <>
      <Grid container className="users__container-grid" columns={1}>
          {(Array(20).fill(0))?.map((listing: null, index) => (
            <Grid item xs={1} className="users__container__grid-item" key={index}>
              <User/>
            </Grid>
          ))}
        </Grid>
    </>
    )
}

export default UsersGrid;