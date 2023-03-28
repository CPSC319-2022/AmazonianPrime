import { Grid, Pagination } from "@mui/material";
import './UsersGrid.scss';
import { setIsLoadingListings, setListings } from '../../redux/reducers/listingsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';


function User() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
    <>
      <Grid item xs={10.1} marginTop={5}>
          <div className="user__username">John Smith</div>
          <div className="user__user-information">Sellor Name sold to Buyer Name</div>
      </Grid>
    </>
    )
}

export default User;