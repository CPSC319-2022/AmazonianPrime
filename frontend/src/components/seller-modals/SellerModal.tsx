import CreateListingModal from '../seller-modals/CreateListingModal';
import RegisterSellerModal from '../seller-modals/RegisterSellerModal';

function SellerModal() {
  return (
    <div>
      <RegisterSellerModal />
      <CreateListingModal />
    </div>
  );
}

export default SellerModal;
