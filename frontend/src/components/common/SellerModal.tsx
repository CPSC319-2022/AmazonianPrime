import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Stack,
} from '@mui/material';

interface ChildProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function SellerModal({ open, handleClose }: ChildProps) {
  return (
    <div>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Seller Registration</DialogTitle>
        <DialogContent>
          <DialogContentText paddingBottom={4}>
            Before You Start Selling, We Have A Few Questions For You!
          </DialogContentText>
          <Stack spacing={4}>
            <TextField required id="filled-required" label="Payment Details" defaultValue="" variant="filled" />
            <TextField
              required
              id="filled-multiline-static"
              label="Billing Address"
              multiline
              rows={4}
              defaultValue=""
              variant="filled"
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ paddingRight: 25, paddingBottom: 20 }}>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button color="secondary" variant="contained" onClick={() => handleClose(false)}>
            {' '}
            Save{' '}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SellerModal;
