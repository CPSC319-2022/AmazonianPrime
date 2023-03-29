import { Navigate } from 'react-router-dom';
import useAdminPrivelege from './utils/useAdminPrivelege';

function PrivateAdminRoute({ children }: any) {
  const { isAdminPrivelegeRequested } = useAdminPrivelege();
  return isAdminPrivelegeRequested ? <>{children}</> : <Navigate to="/" />;
}

export default PrivateAdminRoute;
