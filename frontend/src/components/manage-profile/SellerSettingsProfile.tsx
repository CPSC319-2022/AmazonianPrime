import { Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useGetBankingQuery } from '../../redux/api/user';
import { useAppSelector } from '../../redux/store';
import RegisterSeller from '../common/RegisterSeller';
import './SellerSettingsProfile.scss';

export const SellerSettingsProfile = () => {
  const [searchParams] = useSearchParams();
  const user = useAppSelector((state) => state.user.value);
  const { data, isLoading } = useGetBankingQuery(user?.UserID || '');
  if (Number(searchParams.get('page')) !== 2) {
    return null;
  }
  const skeleton = (
    <div className="seller__banking-detail">
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'40%'} />
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'20%'} />
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={'20%'} />
    </div>
  );
  return (
    <div className="seller__container">
      <span className="setting__title">Seller Settings</span>
      <div className="seller__banking-detail-container">
        <span>Your Banking Details</span>
        {isLoading ? (
          skeleton
        ) : data ? (
          <div className="seller__banking-detail">
            <span>
              {data?.NameOnCard},&nbsp;{data?.StreetAddress}&nbsp;{data?.CityName},&nbsp;{data?.Province}
            </span>
            <span>Account No.&nbsp;{data?.AccountNum}</span>
            <span>Instituion No.&nbsp;{data?.InstitutionNum}</span>
          </div>
        ) : (
          <div className="seller__banking-detail">
            We couldn't find your banking details. Please fill out the details below!
          </div>
        )}
      </div>
      <RegisterSeller isUpdatingExisting={true} />
    </div>
  );
};
