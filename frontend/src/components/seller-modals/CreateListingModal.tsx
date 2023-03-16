import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  Grid,
  Alert,
  Snackbar,
  IconButton,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ClearIcon from '@mui/icons-material/Clear';
import SellIcon from '@mui/icons-material/Sell';
import './CreateListingModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/index';
import { modifyCreateListingModalVisibility } from '../../redux/reducers/sellerModalSlice';
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { FileUploader } from 'react-drag-drop-files';
import { categories } from '../common/Categories';
import { convertBase64 } from '../common/imageToBase64';
import { useCreateListingMutation } from '../../redux/api/listings';
import { useNavigate } from 'react-router';
import useBreadcrumbHistory from '../common/useBreadcrumbHistory';
// @ts-ignore
import LoadingButton from '@mui/lab/LoadingButton';

const fileTypes = ['JPG', 'PNG', 'JPEG'];
const conditions = ['New', 'Used- Like New', 'Used- Good', 'Used Fair', 'Fair'];
const metrics = ['None', 'Meter(s)', 'Centimeter(s)', 'Foot/Feet'];

function CreateListingModal() {
  const isCreateListingModalOpen = useSelector((state: RootState) => state.sellerModal.isCreateListingModalOpen);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(categories[1]);
  const [condition, setCondition] = useState(conditions[0]);
  const [images, setImages] = useState<any>([]);
  const [showMore, setShowMore] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState('');
  const [metric, setMetric] = useState(metrics[0]);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const costRef = useRef<any>(null);
  const colourRef = useRef<any>(null);
  const brandRef = useRef<any>(null);
  const sizeRef = useRef<any>(null);
  const [createListing] = useCreateListingMutation();
  const history = useBreadcrumbHistory();
  const navigate = useNavigate();

  useEffect(() => {
    // reset
    setQuantity(1);
    setCategory(categories[1]);
    setCondition(conditions[0]);
    setImages([]);
    setShowMore(false);
    setMetric(metric[0]);
  }, [isCreateListingModalOpen]);

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorToast('');
  };
  const dispatch = useDispatch();

  async function handleSubmit() {
    const missingTitle = !titleRef.current?.value && 'Listing Title';
    const missingDescription = !descriptionRef.current?.value && 'Description';
    const missingImage = images.length < 1 && 'Image (at least 1)';
    const errorMessage = [missingTitle, missingDescription, missingImage].filter((msg) => msg).join(', ');
    if (errorMessage) {
      setOpenErrorToast(`Missing Field(s): ${errorMessage}`);
      return;
    }
    if (!descriptionRef.current?.value) {
      setOpenErrorToast('Please provide a brief description!');
      return;
    }
    setIsLoading(true);
    // TODO: handle redirect to newly created listing page with submitted info
    const base64Array = await Promise.all(images.map(async (image: any) => await convertBase64(image)));
    // console.log(base64Array);
    const listingResult = await createListing({
      UserID: 1,
      ListingName: titleRef.current?.value,
      Description: descriptionRef.current?.value,
      Cost: Number(costRef.current?.value),
      Quantity: quantity,
      Category: category.replace('&', 'And'),
      ItemCondition: condition,
      Brand: brandRef.current?.value,
      Colour: colourRef.current?.value,
      Size: sizeRef.current?.value ? `${sizeRef.current?.value} ${metric === metric[0] ? '' : metric}` : undefined,
    }).unwrap();
    setIsLoading(false);
    handleModalClose();
    navigate(`/listing/${listingResult.ListingID}`, { state: { ...history } });
  }

  function handleModalClose() {
    if (isLoading) {
      return;
    }
    dispatch(modifyCreateListingModalVisibility(false));
  }

  const handleChange = (files: any) => {
    const filtered = [...files].filter((file: any) => images.find((image: any) => image.name === file.name) == null);
    const newImagesArr = [...images, ...filtered];
    if (filtered.length < files.length) {
      setOpenErrorToast("Please don't add duplicate images!");
    }
    if (images.length > 5 || newImagesArr.length > 5) {
      setOpenErrorToast('Please provide less than 5 images!');
      return;
    }
    setImages(newImagesArr);
  };

  const renderOptional = () => {
    if (!showMore) {
      return null;
    }
    return (
      <div>
        <div className="create-listing__optional-container">
          <TextField inputRef={brandRef} label="Brand" className="create-listing__optional" size="small" />
          <TextField inputRef={colourRef} label="Colour" className="create-listing__optional" size="small" />
        </div>
        <TextField className="create-listing__optional-container" inputRef={sizeRef} label="Size" size="small" />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Metric</InputLabel>
          <Select
            value={metric}
            size="small"
            onChange={(event: SelectChangeEvent) => setMetric(event.target.value)}
            label="Age"
          >
            {metrics.map((value: string) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const moreDetailsButton = (
    <div className="listing-modal__more-details-container" onClick={() => setShowMore(true)}>
      <ExpandMoreIcon />
      <div className="listing-modal__more-details">
        <span className="listing-modal__more-details-main">More Details</span>
        <span className="listing-modal__more-details-sub">Additional information about your listing.</span>
      </div>
    </div>
  );

  const lessDetailsButton = (
    <div className="listing-modal__more-details-container" onClick={() => setShowMore(false)}>
      <ExpandLessIcon />
      <div className="listing-modal__more-details">
        <span className="listing-modal__more-details-main">Less Details</span>
      </div>
    </div>
  );

  return (
    <div>
      <Dialog open={isCreateListingModalOpen} onClose={() => handleModalClose()} fullWidth maxWidth="lg">
        <DialogTitle>Create A New Listing</DialogTitle>
        <Snackbar open={!!openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
            {openErrorToast}
          </Alert>
        </Snackbar>
        <DialogContent>
          <div className="create-listing__content">
            <div className="create-listing__content-left" style={{ width: images.length > 0 ? '50%' : '80%' }}>
              <div className="create-listing__content-row">
                <TextField
                  autoComplete="off"
                  size="small"
                  required
                  id="outlined-required"
                  label="Listing Title"
                  inputRef={titleRef}
                />
                <div className="create-listing__category">
                  <span className="create-listing__quantity">Category</span>
                  <Select size="small" value={category} onChange={(event) => setCategory(event.target.value)}>
                    {categories.slice(1, categories.length).map((value: string) => {
                      return <MenuItem value={value}>{value}</MenuItem>;
                    })}
                  </Select>
                </div>
              </div>
              <div className="create-listing__image-drop">
                <span>Provide a maximum of 5 images</span>
                <FileUploader multiple handleChange={handleChange} name="file" types={fileTypes} />
                <TextField
                  inputRef={descriptionRef}
                  label="Description"
                  required
                  className="create-listing__description"
                  multiline
                  rows={4}
                />
              </div>
              <div className="create-listing__content-row">
                <span className="create-listing__condition">Condition</span>
                <Select
                  size="small"
                  className="create-listing__condition"
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                >
                  {conditions.map((value: string) => {
                    return <MenuItem value={value}>{value}</MenuItem>;
                  })}
                </Select>
                <div>
                  <span className="create-listing__quantity">Quantity</span>
                  <Select size="small" value={quantity} onChange={(event) => setQuantity(event.target.value as number)}>
                    {Array(10)
                      .fill(1)
                      .map((_: number, index: number) => {
                        return <MenuItem value={index + 1}>{index + 1}</MenuItem>;
                      })}
                  </Select>
                </div>
              </div>
              <TextField
                required
                inputRef={costRef}
                label="$"
                className="create-listing__cost"
                size="small"
                type="number"
              />
              <div>{!showMore ? moreDetailsButton : lessDetailsButton}</div>
              {renderOptional()}
            </div>
            <div className="create-listing__content-right">
              <Grid container>
                {images.map((image: any) => {
                  return (
                    <Grid item xs={4}>
                      <div className="seller-modal__image-preview-container">
                        <img
                          className="seller-modal__image-preview"
                          src={URL.createObjectURL(image)}
                          width="150px"
                          height="170px"
                        ></img>
                        <div className="seller-modal__image-text-container">
                          <span>{image.name}</span>
                          <IconButton
                            size="small"
                            onClick={() => {
                              setImages(images.filter((oldImage: any) => oldImage.name !== image.name));
                            }}
                            color="primary"
                            component="label"
                            className="seller-modal__image-remove-button"
                          >
                            <ClearIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <div className="seller-modal__button-container">
            <Button disabled={isLoading} onClick={() => handleModalClose()}>
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              className="seller-modal__save-button"
              color="secondary"
              loadingPosition="start"
              variant="contained"
              startIcon={<SellIcon />}
              onClick={() => handleSubmit()}
            >
              List This Item
            </LoadingButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateListingModal;
