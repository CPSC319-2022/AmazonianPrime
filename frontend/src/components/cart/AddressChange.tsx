import './AddressChange.scss';

export const AddressChange = () => {
  const changeButton = (
    <span className="address-change__button" onClick={() => alert('TODO')}>
      Change
    </span>
  );
  return (
    <div className="address-change__container">
      <div className="address-change__sections">
        <span>1&nbsp;&nbsp;Shipping Address</span>
        {changeButton}
      </div>
      <div>1234 Test Drive Vancouver, British Columbia V5C 1J3</div>
      <div className="address-change__sections">
        <span>2&nbsp;&nbsp;Payment Method</span>
        {changeButton}
      </div>
      <div>
        Credit Card ending in <span className="address__grey">5432</span>
      </div>
      <div>
        <span className="address-change__button-billing" onClick={() => alert('TODO')}>
          Billing Address:
        </span>{' '}
        1234 Test Drive Vancouver, British Columbia V5C 1J3
      </div>
    </div>
  );
};
