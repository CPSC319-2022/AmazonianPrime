import { Accordion, AccordionDetails, AccordionSummary, Grid, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import './Orders.scss';
import { Order } from '../../types/order';
import { useAppSelector } from '../../redux/store';
import { costToString } from '../../utils/costToString';

interface OrderedProps {
  orders: Order[] | undefined;
}
export const Ordered: React.FC<OrderedProps> = ({ orders }) => {
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const ordersSkeleton = (
    <div className="order-listings">
      {
        Array(8).fill(null).map(() => (
          <div className="orders-page__container">
          <div className="orders-page__order-image">
            <Skeleton variant="rectangular" width={150} height={170} />
          </div>
          <div className="orders-page__details">
            <Skeleton variant="text" width={300} height={30} />
            <Skeleton variant="text" width={350} height={30} />
            <Skeleton variant="text" width={250} height={30} />
            </div>
          <div className="orders-page__orders__skeleton-end">
            <Skeleton variant="text" width={70} height={50} style={{
              marginRight: "0.5em"
            }}/>
            <Skeleton variant="text" width={100} height={50} />
          </div>
      </div>
        ) )
      }
   
    </div>

  );
  if (isLoading || orders === null || !orders) {
    return ordersSkeleton;
  }

  if (orders?.length === 0) {
    return (
      <>
        <div className="no-content-fixed">
          <img
            className="no-content-image"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACGklEQVR4nO2XQUojURRF3yIEB07F1ShYAxvdR3rS8x7U16GkPr0DFcE96AayDGkFXYBcKVGQkAhRq+43/xy4wxSpe9+7L4kAAAAAAAAAAAAAgBU53o9fsz+hdVZq4qDIwTjZjY12P27dBs0GVtvE/797sRmlkZo4T43foNnwG9CHcBWlVU//xWoJIDUFVdFb9dQWQFtKFb1VT20BpBKq6H311BhAclbRfPXUGkDrqqL56qk1gOSookXVU3MAacwqWlY9tQfQjlVFy6qn9gDSWFWkHEKx1AMCyN4BIYBMAFVXVHADggDcUyg2wG+EqCC/GTJobW7AUxe6noSmhx//+flI/Wf7Z/TPIoAVA7iefN74ed1MCGDlCZx+YfIXbQIbYAygOyIAbwX9JoBPHeGbbzjCvfkc4QJ+Hmokrc3PUP1QEUAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+G1vQGPLpfUqWqi4fhA+ji0v6iuVhdDB/Av9hRjrsCXlZFqYt7ncb24AG8hNDFlnKcUUeh10q+GM18AAAAAAAAAAAAgPiJPAPM6yK//8YO8QAAAABJRU5ErkJggg=="
          />
          We couldn't find any orders. Please create a new order or modify your search!
        </div>
      </>
    );
  }

  const validOrders = orders.filter((order) => order.Listings && order.Listings.length > 0);

  return (
    <div className="order-listings">
      {validOrders.map((order) => (
        <Contents order={order} />
      ))}
    </div>
  );
};

function JoinListings(name: string, price: number, quantity: number, addComma: boolean) {
  const comma = addComma ? ', ' : '';
  return (
    <>
      {name}{' '}
      <span style={{ color: 'grey' }}>
        (x{quantity} ${price})
      </span>
      {comma}
    </>
  );
}

const Contents: React.FC<{ order: Order }> = ({ order }) => {
  const firstListing = order.Listings[0];
  const totalCost = order.Listings.reduce((acc, item) => acc + item.Cost * item.OrderQuantity, 0);
  const listings = order.Listings.slice(1);

  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const cc = order.Payment.CreditCardNum.toString();

  return (
    <div className="orders-page__container">
        <img className="orders-page__order-image" src={firstListing.S3ImagePath} height="170px" width="150px" />
        <div className="orders-page__details">
        <div className="orders-page__ordered__header-text">
          <span>Order ID #{order.OrderID}&nbsp;</span>
          {firstListing.ListingName}
          <span style={{ color: 'grey' }}>
            {' '}
            (x{firstListing.OrderQuantity} ${firstListing.Cost}){' '}
          </span>
        </div>
        <div>
          {
            listings.length > 0 && <Accordion expanded={expanded} square elevation={0} style={{ marginTop: -5 }}>
            <AccordionSummary
              style={{ width: 150, minHeight: 0, height: 30, padding: 0, border: 0, color: 'grey' }}
              expandIcon={<ExpandMoreIcon />}
              onClick={handleToggle}
            >
              {listings.length} other item{listings.length === 1 ? "" : "s"}
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0, marginTop: 0 }}>
              <p className="orders-page__ordered__header-text">
                {listings.map((item) =>
                  JoinListings(
                    item.ListingName,
                    item.Cost,
                    item.OrderQuantity,
                    listings.indexOf(item) !== listings.length - 1,
                  ),
                )}
              </p>
            </AccordionDetails>
          </Accordion>
          }
        </div>
        <div className="orders-page__ordered__grey-text">
          Ordered on{' '}
          {new Date(order.OrderTimestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <div className="orders-page__ordered__grey-text">
          Shipping to{' '}
          {order.Shipping.StreetAddress} {order.Shipping.CityName}, {order.Shipping.Province}
        </div>
        <div className="orders-page__ordered__grey-text">
          Credit card ending in&nbsp;
          {cc.substring(cc.length - 5, cc.length)}
        </div>
        </div>
      <div className="orders-page__end-text">
        <span className="orders-page__total-cost">${costToString(totalCost)}</span>
        <span className="orders-page__status">{order.ShippingStatus}</span>
      </div>
    </div>
  );
};
