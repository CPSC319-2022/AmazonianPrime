import React from 'react';
import './UserDisplayName.scss';
import { User } from '../../types/user';

interface UserDisplayNameProps {
  user: User;
}
export const UserDisplayName: React.FC<UserDisplayNameProps> = ({ user }) => {
  return (
    <div className="user-display__seller-details">
      <div className="user-display_user-avatar">
        {user?.FirstName?.charAt(0)}
        {user?.LastName?.charAt(0)}
      </div>
      <div className="user-display__user-name">
        {user?.FirstName}&nbsp;{user?.LastName?.charAt(0)}.
        <div className="user-display__user-department">{user?.Department}</div>
      </div>
    </div>
  );
};
