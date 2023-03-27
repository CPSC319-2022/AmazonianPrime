import { Address } from './address';

export interface Payment extends Address {
  UserID: string;
  AddressID: string;
  CreditCardNum: number;
  ExpiryDate: string;
  CVV: string;
  CardHolderName: string;

  FirstName: string;
  LastName: string;
}
