import { Skeleton } from '@mui/material';
import './ProductDetailsSkeleton.scss';

export default function ProductDetailsSkeleton() {
  return (
    <>
      <Skeleton variant="text" sx={{ fontSize: '4em' }} width={'80%'} />
      <div className="product-details-skeleton__user">
        <Skeleton className="product-details-skeleton__user-icon" variant="circular" width={40} height={40} />
        <Skeleton variant="text" sx={{ fontSize: '2em' }} width={100} />
      </div>
      <Skeleton variant="text" sx={{ fontSize: '1em' }} width={200} />
      <Skeleton variant="text" sx={{ fontSize: '1em' }} width={200} />
      <Skeleton className="product-details-skeleton__details" variant="rectangular" height={300} width={'100%'} />
    </>
  );
}
