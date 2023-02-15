import CreateListingModal from './seller-modals/CreateListingModal';
import RegisterSellerModal from './seller-modals/RegisterSellerModal';
import './SellerModal.scss';

function SellerModal() {

  return (
    <div>
      <RegisterSellerModal/>
      <CreateListingModal/>
    </div>
  );
}

export default SellerModal;
