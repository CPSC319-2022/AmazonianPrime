import { Accordion, AccordionDetails, AccordionSummary, Grid, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import './Orders.scss';
import { Order } from '../../types/order';
import { useAppSelector } from '../../redux/store';



interface OrderedProps {
  orders: Order[] | undefined;
}
export const Ordered: React.FC<OrderedProps> = ({ orders }) => {
  const isLoading = useAppSelector((state) => state.cart.isLoading);
  const ordersSkeleton = (
    <div className="orders-page__orders__skeleton">
      <Grid container>
        <Grid item xs={4} marginTop={5}>
          <Skeleton variant="rectangular" width={200} height={200} />
        </Grid>
        <Grid item xs={1} marginTop={5}>
          <Skeleton variant="text" width={500} height={30} />
          <Skeleton variant="text" width={500} height={30} />
          <Skeleton variant="text" width={500} height={30} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4} marginTop={5}>
          <Skeleton variant="rectangular" width={200} height={200} />
        </Grid>
        <Grid item xs={1} marginTop={5}>
          <Skeleton variant="text" width={500} height={30} />
          <Skeleton variant="text" width={500} height={30} />
          <Skeleton variant="text" width={500} height={30} />
        </Grid>
      </Grid>
    </div>
  );
  if (isLoading) {
    return ordersSkeleton;
  }

  if (!orders) {
      return (
        <>
          <div className="no-content-fixed">
            <img
              className="no-content-image"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACGklEQVR4nO2XQUojURRF3yIEB07F1ShYAxvdR3rS8x7U16GkPr0DFcE96AayDGkFXYBcKVGQkAhRq+43/xy4wxSpe9+7L4kAAAAAAAAAAAAAgBU53o9fsz+hdVZq4qDIwTjZjY12P27dBs0GVtvE/797sRmlkZo4T43foNnwG9CHcBWlVU//xWoJIDUFVdFb9dQWQFtKFb1VT20BpBKq6H311BhAclbRfPXUGkDrqqL56qk1gOSookXVU3MAacwqWlY9tQfQjlVFy6qn9gDSWFWkHEKx1AMCyN4BIYBMAFVXVHADggDcUyg2wG+EqCC/GTJobW7AUxe6noSmhx//+flI/Wf7Z/TPIoAVA7iefN74ed1MCGDlCZx+YfIXbQIbYAygOyIAbwX9JoBPHeGbbzjCvfkc4QJ+Hmokrc3PUP1QEUAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+G1vQGPLpfUqWqi4fhA+ji0v6iuVhdDB/Av9hRjrsCXlZFqYt7ncb24AG8hNDFlnKcUUeh10q+GM18AAAAAAAAAAAAgPiJPAPM6yK//8YO8QAAAABJRU5ErkJggg=="
            />
            Looks like you have not made any orders yet!
          </div>
        </>
      );
    }

    return (
      <>
        {orders.map(({ ShippingStatus, OrderTimestamp }) => (
          <Contents status={ShippingStatus} date={OrderTimestamp} />
        ))}
      </>
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

function Contents(order: { status: string; date: string }) {
  const listingDummy: { name: string; price: number; quantity: number }[] = [
    { name: 'Blanket', price: 10, quantity: 1 },
    { name: 'Plant', price: 10, quantity: 3 },
    { name: 'Book', price: 12, quantity: 1 },
  ];

  const srcDummy =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACGklEQVR4nO2XQUojURRF3yIEB07F1ShYAxvdR3rS8x7U16GkPr0DFcE96AayDGkFXYBcKVGQkAhRq+43/xy4wxSpe9+7L4kAAAAAAAAAAAAAgBU53o9fsz+hdVZq4qDIwTjZjY12P27dBs0GVtvE/797sRmlkZo4T43foNnwG9CHcBWlVU//xWoJIDUFVdFb9dQWQFtKFb1VT20BpBKq6H311BhAclbRfPXUGkDrqqL56qk1gOSookXVU3MAacwqWlY9tQfQjlVFy6qn9gDSWFWkHEKx1AMCyN4BIYBMAFVXVHADggDcUyg2wG+EqCC/GTJobW7AUxe6noSmhx//+flI/Wf7Z/TPIoAVA7iefN74ed1MCGDlCZx+YfIXbQIbYAygOyIAbwX9JoBPHeGbbzjCvfkc4QJ+Hmokrc3PUP1QEUAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+GDOIGZAKwT6HYAL8RooL8ZsggbkAmAPsUig3wGyEqyG+G1vQGPLpfUqWqi4fhA+ji0v6iuVhdDB/Av9hRjrsCXlZFqYt7ncb24AG8hNDFlnKcUUeh10q+GM18AAAAAAAAAAAAgPiJPAPM6yK//8YO8QAAAABJRU5ErkJggg==';

  const dateOnly = order.date.split('T')[0];
  const firstListing = listingDummy[0];
  const totalCost = listingDummy.reduce((acc, item) => acc + item.price * item.quantity, 0);
  listingDummy.shift();

  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid item xs={1.9} marginTop={5}>
        <img src={srcDummy} height={200} width={200} />
      </Grid>
      <Grid item xs={5.1} marginTop={5}>
        <div className="orders-page__ordered__header-text">
          {firstListing.name}
          <span style={{ color: 'grey' }}>
            {' '}
            (x{firstListing.quantity} ${firstListing.price}){' '}
          </span>
        </div>
        <div>
          <Accordion expanded={expanded} square elevation={0} style={{ width: 600, marginTop: -5 }}>
            <AccordionSummary
              style={{ width: 150, minHeight: 0, height: 30, padding: 0, border: 0, color: 'grey' }}
              expandIcon={<ExpandMoreIcon />}
              onClick={handleToggle}
            >
              {listingDummy.length} other items
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0, marginTop: -20 }}>
              <p className="orders-page__ordered__header-text">
                {listingDummy.map((item) =>
                  JoinListings(
                    item.name,
                    item.price,
                    item.quantity,
                    listingDummy.indexOf(item) !== listingDummy.length - 1,
                  ),
                )}
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="orders-page__ordered__grey-text">Ordered date: {dateOnly}</div>
      </Grid>
      <Grid item xs={0.5} marginTop={7}>
        <p className="orders-page__ordered__header-text">${totalCost}</p>
      </Grid>
      <Grid item xs={4.5} marginTop={7}>
        <p className="orders-page__ordered__header-text">{order.status}</p>
      </Grid>
    </>
  );
}
