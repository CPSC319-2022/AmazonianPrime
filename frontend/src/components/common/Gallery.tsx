import './Gallery.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Grid, Pagination } from '@mui/material';
import { ListingPreview as ListingPreviewType } from '../../types/listingPreview';
import ListingPreview from '../listing/ListingPreview';
import { Listing } from '../../types/listing';
import NoContent from './NoContent';

interface GalleryProps {
  listings: ListingPreviewType[] | undefined;
  totalListingsLength: number;
  isLoading: boolean;
  handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
  showRemoveListingButton?: boolean;
}

const LIMIT = 12;
const Gallery: React.FC<GalleryProps> = ({
  listings,
  totalListingsLength,
  isLoading,
  handlePageChange,
  showRemoveListingButton = false,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get('page');
  if (!page) {
    navigate('/');
    return null;
  }

  if (listings?.length === 0 && !isLoading) return <NoContent />;

  return (
    <div>
      <div className="gallery__container">
        <Grid container className="gallery__container-grid" columns={4}>
          {(!isLoading && listings ? listings : Array(20).fill(0)).map((listing: ListingPreviewType | null, index) => (
            <Grid item xs={1} className="gallery__container__grid-item" key={index}>
              <ListingPreview
                listing={listing}
                key={index}
                imageHeight="80%"
                imageWidth="100%"
                showRemoveListingButton={showRemoveListingButton}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination
        className="gallery__pagination"
        count={Math.ceil(totalListingsLength / LIMIT)}
        page={Number(page)}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default Gallery;
