import { Select, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import './QuantitySelect.scss';

interface QuantitySelectProps {
  quantity: number;
  selectRef?: any;
  disabled?: boolean;
  tooltipContent?: string;
  defaultValue?: number;
  setValue?: (value: number) => any;
  controlledValue?: number;
}
export const QuantitySelect: React.FC<QuantitySelectProps> = ({
  quantity,
  selectRef,
  tooltipContent,
  disabled,
  defaultValue = 1,
  controlledValue,
  setValue,
}) => {
  return setValue && controlledValue ? (
    <Tooltip title={tooltipContent}>
    <Select
      labelId={`select-${defaultValue}`}
      disabled={disabled}
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
    </Tooltip>
  ) : (
    <Tooltip title={tooltipContent}>
    <Select
      className="product-details__details__select"
      defaultValue={defaultValue}
      disabled={disabled}
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
    </Tooltip>
  );
      }
