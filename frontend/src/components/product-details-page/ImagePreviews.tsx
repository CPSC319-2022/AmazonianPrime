import './ImagePreviews.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useGetListingByIdQuery } from '../../redux/api/listings';
import { setListingDetails } from '../../redux/reducers/listingsSlice';
import { useParams } from 'react-router';
import { Skeleton } from '@mui/material';

interface ImagePreviewsProps {
  isLoading: boolean;
}

export const ImagePreviews: React.FC<ImagePreviewsProps> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const { listingId } = useParams();
  const { data } = useGetListingByIdQuery(listingId || '');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  useEffect(() => {
    if (data) {
      dispatch(setListingDetails(data));
    }
  }, [data]);

  const listing = useAppSelector((state) => state.listings.listingDetails);

  return (
    <div className="image-preview">
      {isLoading ? (
        <>
          <div className="image-preview__previews">
            <Skeleton variant="rectangular" height={350} width={90} />
          </div>
          <Skeleton
            className="image-preview__active-item-container"
            variant="rectangular"
            height={'550px'}
            width={'100%'}
          />
        </>
      ) : (
        <>
          <div className="image-preview__previews">
            {listing?.images.map((image, index) => (
              <div
                onClick={() => {
                  setActiveImageIndex(index);
                }}
                onMouseOver={() => {
                  setHoverIndex(index);
                }}
                onMouseOut={() => {
                  setHoverIndex(null);
                }}
                key={index}
                className={
                  activeImageIndex === index
                    ? `image-preview__preview-item-active`
                    : `image-preview__preview-item-inactive`
                }
              >
                <img src={`data:image/jpeg;base64,${image}`} height="95px" width="75px" />
              </div>
            ))}
          </div>
          <div className="image-preview__active-item-container">
            <img
              className="image-preview__active-item"
              src={`data:image/jpeg;base64,${listing?.images[hoverIndex ?? activeImageIndex]}`}
              height="550px"
              width="100%"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImagePreviews;
