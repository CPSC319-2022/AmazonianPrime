import { Grid } from "@mui/material";
import { useAppSelector } from "../../redux/store";
import './Ordered.scss';

    function Ordered() {
    // Todo: const orders = useAppSelector((state) => state.orders...);
    // if (!orders) {
    //   return null;
    // }

    //dummy data
    const dummyOrders: { src: string, name: string, sellor: string, buyer: string, deliveryMethod: string, delivered: boolean}[] = [
    {src: "", name: "Item 1", sellor: "Sellor1 Name", buyer: "Buyer Name", deliveryMethod: "Pickup", delivered: false},
    {src: "", name: "Item 2", sellor: "Sellor2 Name", buyer: "Buyer Name", deliveryMethod: "Delivery", delivered: false},
    {src: "", name: "Item 3", sellor: "Sellor3 Name", buyer: "Buyer Name", deliveryMethod: "Pickup", delivered: true},
    {src: "", name: "Item 4", sellor: "Sellor4 Name", buyer: "Buyer Name", deliveryMethod: "Delivery", delivered: true}];

    var filteredOrder = dummyOrders.reduce(function(filtered: { src: string, name: string, sellor: string, buyer: string, deliveryMethod: string, delivered: boolean}[], order) {
      if (!order.delivered) {
         filtered.push(order);
      }
      return filtered;
    }, []);

    return (
    <>
        {(filteredOrder).map(({src, name, sellor, buyer, deliveryMethod, delivered}) => (
          <Contents src={src} name={name} sellor={sellor} buyer={buyer} deliveryMethod={deliveryMethod} delivered={delivered}/>
        ))}
    </>
    );
  };

  function Contents(order: {src:string, name:string, sellor:string, buyer:string, deliveryMethod:string, delivered:boolean}) {
    return (
      <>
           <Grid item xs={1.9} marginTop={5}>
          <img
            src={order.src}
            height={200}
            width={200}
          />
        </Grid>
        <Grid item xs={10.1} marginTop={5}>
            <div className="orders-page__ordered__header-text">{order.name}</div>
            <div className="orders-page__ordered__text">{order.sellor} sold to {order.buyer}</div>
            <div className="orders-page__ordered__grey-text">{order.deliveryMethod}</div>
        </Grid>
      </>
      );
  };

export default Ordered;