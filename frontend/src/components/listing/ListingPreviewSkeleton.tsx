import './ListingPreviewSkeleton.scss';
import { Skeleton } from '@mui/material';

interface ListingPreviewSkeletonProps {
  imageHeight: string;
  imageWidth: string;
}

export const ListingPreviewSkeleton: React.FC<ListingPreviewSkeletonProps> = ({ imageHeight, imageWidth }) => {
  return (
    <div className="listing-preview-skeleton">
      <Skeleton
        className="listing-preview-skeleton__picture"
        variant="rectangular"
        height={imageHeight}
        width={imageWidth}
      />
      <Skeleton variant="text" sx={{ fontSize: '1.2em' }} width={60} />
      <Skeleton variant="text" sx={{ fontSize: '1em' }} />
      <Skeleton variant="text" sx={{ fontSize: '1em' }} width={100} />
    </div>
  );
};
