import { Dialog, DialogTitle, DialogContent, FormControlLabel, Radio, RadioGroup, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddressChange.scss';

interface AddressChangeProps {
  selectedAddress: number;
  setSelectedAddress: (value: number) => any;
  selectedPayment: number;
  setSelectedPayment: (value: number) => any;
  payments: any[];
  addresses: string[];
}
export const AddressChange: React.FC<AddressChangeProps> = ({
  selectedAddress,
  setSelectedAddress,
  addresses,
  selectedPayment,
  setSelectedPayment,
  payments,
}) => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  const changeButton = (onClick: any) => (
    <span className="address-change__button" onClick={onClick}>
      Change
    </span>
  );

  const radioListItem = (handleSelect: (value: any) => any, value: any, content: any[]) => {
    return (
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={(radioValue) => {
          handleSelect(radioValue.target.value);
          setShowAddressModal(false);
          setShowPaymentModal(false);
        }}
      >
        {content.map((contentValue, index) => (
          <FormControlLabel value={index} control={<Radio />} label={contentValue} />
        ))}
      </RadioGroup>
    );
  };
  const addressModal = (
    <Dialog open={showAddressModal} onClose={() => setShowAddressModal(false)}>
      <DialogTitle>Choose a Shipping Address</DialogTitle>
      <DialogContent>{radioListItem(setSelectedAddress, selectedAddress, addresses)}</DialogContent>
    </Dialog>
  );

  const paymentModal = (
    <Dialog open={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
      <DialogTitle>Choose a Payment Method</DialogTitle>
      <DialogContent>
        {radioListItem(
          setSelectedPayment,
          selectedPayment,
          payments.map((payment) => <div className="address-change__radio">{payment}</div>),
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="address-change__container">
      {addressModal}
      {paymentModal}
      <div className="address-change__sections">
        <span>1&nbsp;&nbsp;Shipping Address</span>
        {changeButton(() => setShowAddressModal(true))}
        <span className="address-change__button-redirect" onClick={() => navigate('/manage-profile?page=4')}>
          Add Addresses
        </span>
      </div>
      <div>{addresses[selectedAddress] ?? <Skeleton variant="text" sx={{ fontSize: '1.5em' }} width={300} />}</div>
      <div className="address-change__sections">
        <span>2&nbsp;&nbsp;Payment Method</span>
        {changeButton(() => setShowPaymentModal(true))}
        <span className="address-change__button-redirect" onClick={() => navigate('/manage-profile?page=3')}>
          Add Payment Methods
        </span>
      </div>
      {payments[selectedPayment] ?? <Skeleton variant="text" sx={{ fontSize: '1.5em' }} width={300} />}
    </div>
  );
};
