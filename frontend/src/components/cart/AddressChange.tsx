import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Radio,
  RadioGroup,
  DialogActions,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddressChange.scss';
import SettingsIcon from '@mui/icons-material/Settings';

interface AddressChangeProps {
  selectedAddress: number;
  setSelectedAddress: (value: number) => any;
  selectedPayment: number;
  setSelectedPayment: (value: number) => any;
  payments: any[]
  addresses: string[];
}
export const AddressChange: React.FC<AddressChangeProps> = ({ selectedAddress, setSelectedAddress, addresses, selectedPayment, setSelectedPayment, payments }) => {
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
        onChange={(value) => {
          handleSelect(value.target.value)
          setShowAddressModal(false)
          setShowPaymentModal(false)
        }}
      >
        {content.map((value, index) => (
          <FormControlLabel value={index} control={<Radio />} label={value} />
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
      <DialogContent>{radioListItem(setSelectedPayment, selectedPayment, payments)}</DialogContent>
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
      <div>{addresses[selectedAddress]}</div>
      <div className="address-change__sections">
        <span>2&nbsp;&nbsp;Payment Method</span>
        {changeButton(() => setShowPaymentModal(true))}
        <span className="address-change__button-redirect" onClick={() => navigate('/manage-profile?page=3')}>
          Add Payment Methods
        </span>
      </div>
      {payments[selectedPayment]}
    </div>
  );
};
