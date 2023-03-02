import { Button, Grid, IconButton } from '@mui/material';
import SearchBar from './SearchBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../common/logo.svg';
import './ToolBar.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modifyCreateListingModalVisibility } from '../../redux/reducers/sellerModalSlice';
import { useAppSelector } from '../../redux/store';
import SellerModal from '../seller-modals/SellerModal';
import useSticky from '../common/useSticky';
import CategoriesButton from './CategoriesButton';

function ToolBar() {
  const { sticky, stickyRef } = useSticky();
  const dispatch = useDispatch();

  function handleOpenSellerModal() {
    dispatch(modifyCreateListingModalVisibility(true));
  }
  const navigate = useNavigate();
  const classes = sticky ? 'landing-page__sticky-toolbar toolbar' : 'toolbar';

  const user = useAppSelector((state) => state.user.value);
  if (!user) return null;
  return (
    <>
      <div ref={stickyRef} className={classes}>
        <div className="toolbar__content">
          <Grid container>
            <Grid item xs={2}>
              <span className="toolbar__logo">
                <img src={logo} height="50" alt="Instagram Icon" onClick={() => navigate(`/`)} />
              </span>
            </Grid>
            <Grid item xs={3} container direction="row" justifyContent="center" alignItems="center">
              <div className="toolbar__buttons">
                <CategoriesButton />
                <Button color="secondary" className="toolbar__button" onClick={() => handleOpenSellerModal()}>
                  Sell
                </Button>
                <Button className="toolbar__button">Orders</Button>
              </div>
            </Grid>
            <Grid item xs={5} container direction="row" justifyContent="center" alignItems="center">
              <SearchBar />
            </Grid>
            <Grid item xs={2} container direction="row" justifyContent="flex-end" alignItems="center">
              <IconButton color="primary" component="label">
                <ShoppingCartIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton color="primary" component="label">
                <AccountCircleIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
      {sticky && (
        <div
          style={{
            height: `${stickyRef.current?.clientHeight}px`,
          }}
        />
      )}
      <SellerModal />
    </>
  );
}

export default ToolBar;