import React from 'react';
import { isExpiredDate } from '../../utils/escapeDateFromSQL';
import './ExpiryDate.scss';

export const ExpiryDate: React.FC<{ date: string }> = ({ date }) => {
  const isExpired = isExpiredDate(date);
  return (
    <span className="expiry-date">
      {`Expire${isExpired ? 'd' : 's'} on`}&nbsp;{date}
    </span>
  );
};
