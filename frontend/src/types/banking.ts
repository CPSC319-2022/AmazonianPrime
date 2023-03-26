import { Address } from './address';

export interface Banking extends Address {
  BankingID: string;
  UserID: string;
  AddressID: string;
  InstitutionNum: number;
  AccountNum: number;
  TransitNum: number;
  NameOnCard: string;
}
