import { Grid } from '@mui/material';
import { Order } from '../../types/order';
import './Delivered.scss';

interface DeliveredProps {
  orders: Order[] | undefined;
}

export const Delivered: React.FC<DeliveredProps> = ({ orders }) => {
  const dummyOrders: {
    src: string;
    name: string;
    sellor: string;
    buyer: string;
    deliveryMethod: string;
    delivered: boolean;
  }[] = [
    {
      src: '',
      name: 'Item 1',
      sellor: 'Sellor1 Name',
      buyer: 'Buyer Name',
      deliveryMethod: 'Pickup',
      delivered: false,
    },
    {
      src: '',
      name: 'Item 2',
      sellor: 'Sellor2 Name',
      buyer: 'Buyer Name',
      deliveryMethod: 'Delivery',
      delivered: false,
    },
    { src: '', name: 'Item 3', sellor: 'Sellor3 Name', buyer: 'Buyer Name', deliveryMethod: 'Pickup', delivered: true },
    {
      src: '',
      name: 'Item 4',
      sellor: 'Sellor4 Name',
      buyer: 'Buyer Name',
      deliveryMethod: 'Delivery',
      delivered: true,
    },
  ];

  var filteredOrder = dummyOrders.reduce(function (
    filtered: {
      src: string;
      name: string;
      sellor: string;
      buyer: string;
      deliveryMethod: string;
      delivered: boolean;
    }[],
    order,
  ) {
    if (order.delivered) {
      filtered.push(order);
    }
    return filtered;
  }, []);

  return (
    <>
      {filteredOrder.map(({ src, name, sellor, buyer, deliveryMethod, delivered }) => (
        <Contents
          src={src}
          name={name}
          sellor={sellor}
          buyer={buyer}
          deliveryMethod={deliveryMethod}
          delivered={delivered}
        />
      ))}
    </>
  );
};

function Contents(order: {
  src: string;
  name: string;
  sellor: string;
  buyer: string;
  deliveryMethod: string;
  delivered: boolean;
}) {
  return (
    <>
      <Grid item xs={2.2} marginTop={5}>
        <img src={order.src} height={100} width={100} />
      </Grid>
      <Grid item xs={6} marginTop={7}>
        <div className="orders-page__delivered__header-text">{order.name}</div>
        <div className="orders-page__delivered__text">
          {order.sellor} sold to {order.buyer}
        </div>
        <div className="orders-page__delivered__grey-text">{order.deliveryMethod}</div>
      </Grid>
      <Grid item xs={3.8} marginTop={9} className="orders-page__delivered__header-text">
        Delivered
      </Grid>
    </>
  );
}
