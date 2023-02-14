import { Button, Grid, IconButton } from '@mui/material';
import SearchBar from './SearchBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from './logo.svg';
import './ToolBar.scss';
import useSticky from './useSticky';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SellerModal from './SellerModal'

function ToolBar() {
  const { sticky, stickyRef } = useSticky();
  const [ sellerModalActive, setSellerModalActive ] = useState<boolean>(false);
  const navigate = useNavigate();
  const classes = sticky ? 'landing-page__sticky-toolbar toolbar' : 'toolbar';

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
                <Button className="toolbar__button">Categories</Button>
                <Button color="secondary" className="toolbar__button" onClick= {() => setSellerModalActive(!sellerModalActive)}>
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
      {<SellerModal open = {sellerModalActive} handleClose = {setSellerModalActive}/>}
    </>
  );
}

export default ToolBar;
