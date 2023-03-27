import { Select, MenuItem } from '@mui/material';
import React from 'react';
import './QuantitySelect.scss';

interface QuantitySelectProps {
  quantity: number;
  selectRef?: any;
  defaultValue?: number;
  setValue?: (value: number) => any;
  controlledValue?: number;
}
export const QuantitySelect: React.FC<QuantitySelectProps> = ({
  quantity,
  selectRef,
  defaultValue = 1,
  controlledValue,
  setValue,
}) => {
  return setValue && controlledValue ? (
    <Select
      labelId={`select-${defaultValue}`}
      className="product-details__details__select"
      value={controlledValue}
      defaultValue={defaultValue}
      onChange={(event) => setValue(Number(event.target.value) || 1)}
      size="small"
      style={{ backgroundColor: '#e0e0e0' }}
    >
      {Array.from(Array(quantity).keys()).map((x: number, index) => (
        <MenuItem value={`${x + 1}`} key={index}>
          {x + 1}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Select
      className="product-details__details__select"
      defaultValue={defaultValue}
      inputRef={selectRef}
      size="small"
      style={{ backgroundColor: '#e0e0e0' }}
    >
      {Array.from(Array(quantity).keys()).map((x: number, index) => (
        <MenuItem value={`${x + 1}`} key={index}>
          {x + 1}
        </MenuItem>
      ))}
    </Select>
  );
};
