import { useSearchParams } from 'react-router-dom';
import RegisterSeller from '../common/RegisterSeller';

export const SellerSettingsProfile = () => {
  const [searchParams] = useSearchParams();
  if (Number(searchParams.get('page')) !== 2) {
    return null;
  }
  return <RegisterSeller />;
};
