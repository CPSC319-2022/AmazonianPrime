import './AddressChange.scss';

export const AddressChange = () => {
  const changeButton = <span className="address-change__button">Change</span>;
  return (
    <div className="address-change__container">
      <div className="address-change__sections">
        <span>1&nbsp;&nbsp;Shipping Address</span>
        {changeButton}
      </div>
      <div>Doris Luong 2608-4485 Skyline Drive Burnaby, British Columbia V5C 0J2</div>
      <div className="address-change__sections">
        <span>2&nbsp;&nbsp;Payment Method</span>
        {changeButton}
      </div>
      <div>Credit Card ending in 5239</div>
      <div>
        <span className="address-change__button-billing">Billing Address:</span> Doris Luong 2608-4485 Skyline Drive
        Burnaby, British Columbia V5C 0J2
      </div>
    </div>
  );
};
