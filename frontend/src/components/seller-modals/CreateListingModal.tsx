import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
  MenuItem,
  Select,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import './CreateListingModal.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/index';
import { modifyCreateListingModalVisibility } from '../../redux/reducers/sellerModalSlice';
import { useRef, useState } from 'react';
// @ts-ignore
import { FileUploader } from 'react-drag-drop-files';
import { categories } from '../common/Categories';

const fileTypes = ['JPG', 'PNG', 'JPEG'];
const conditions = ['New', 'Used- Like New', 'Used- Good', 'Used Fair', 'Fair'];

function CreateListingModal() {
  const isCreateListingModalOpen = useSelector((state: RootState) => state.sellerModal.isCreateListingModalOpen);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(categories[1]);
  const [condition, setCondition] = useState(conditions[0]);
  const [images, setImages] = useState<any>([]);
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const titleRef = useRef<any>(null);
  const descriptionRef = useRef<any>(null);
  const costRef = useRef<any>(null);

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorToast(false);
  };
  const dispatch = useDispatch();

  function handleSubmit() {
    // TODO: handle redirect to newly created listing page with submitted info
    console.log(titleRef.current?.value);
    console.log(descriptionRef.current?.value);
    console.log(costRef.current?.value);
    dispatch(modifyCreateListingModalVisibility(false));
  }

  function handleListingClose() {
    setImages([]);
    dispatch(modifyCreateListingModalVisibility(false));
  }
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    if (file.length > 5) {
      setOpenErrorToast(true);
      return;
    }
    setImages([...file]);
    setFile(file);
  };

  return (
    <div>
      <Dialog open={isCreateListingModalOpen} onClose={() => handleListingClose()} fullWidth maxWidth="lg">
        <DialogTitle>Create A New Listing</DialogTitle>
        <Snackbar open={openErrorToast} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="error" sx={{ width: '100%' }}>
            Please provide less than 5 images!
          </Alert>
        </Snackbar>
        <DialogContent>
          <div className="create-listing__content">
            <div className="create-listing__content-left" style={{ width: images.length > 0 ? '50%' : '80%' }}>
              <div className="create-listing__content-row">
                <TextField size="small" required id="outlined-required" label="Listing Title" inputRef={titleRef} />
                <div className="create-listing__category">
                  <span className="create-listing__quantity">Category</span>
                  <Select size="small" value={category} onChange={(event) => setCategory(event.target.value)}>
                    {categories.slice(1, categories.length).map((category: string) => {
                      return <MenuItem value={category}>{category}</MenuItem>;
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
                  {conditions.map((condition: string) => {
                    return <MenuItem value={condition}>{condition}</MenuItem>;
                  })}
                </Select>
                <div>
                  <span className="create-listing__quantity">Quantity</span>
                  <Select size="small" value={quantity} onChange={(event) => setQuantity(event.target.value as number)}>
                    {Array(5)
                      .fill(1)
                      .map((_: number, index: number) => {
                        return <MenuItem value={index + 1}>{index + 1}</MenuItem>;
                      })}
                  </Select>
                </div>
              </div>
              <TextField
                required
                defaultValue={1}
                inputRef={costRef}
                label="$"
                className="create-listing__cost"
                size="small"
                type="number"
              />
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
                        <span>{image.name}</span>
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
            <Button onClick={() => handleListingClose()}>Cancel</Button>
            <Button
              className="seller-modal__save-button"
              color="secondary"
              variant="contained"
              onClick={() => handleSubmit()}
            >
              List This Item
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateListingModal;
