import './ImagePreviews.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useGetListingByIdQuery } from '../../redux/api/listings';
import { setListingDetails } from '../../redux/reducers/listingsSlice';

function ImagePreviews() {
  const dispatch = useAppDispatch();
  const { data } = useGetListingByIdQuery();
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
              activeImageIndex === index ? `image-preview__preview-item-active` : `image-preview__preview-item-inactive`
            }
          >
            <img src={`data:image/jpeg;base64,${image}`} height="95px" width="75px" />
          </div>
        ))}
      </div>

      <img
        className="image-preview__active-item"
        src={`data:image/jpeg;base64,${listing?.images[hoverIndex ?? activeImageIndex]}`}
        height="550px"
        width="400px"
      />
    </div>
  );
}

export default ImagePreviews;
