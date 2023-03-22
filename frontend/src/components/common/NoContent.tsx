import emptyBox from '../../images/empty-box.png'; // with import
import './NoContent.scss';
interface NoContentProps {
  message?: string;
  fixedPosition?: boolean;
}
const NoContent: React.FC<NoContentProps> = ({
  message = "Looks like there's nothing to display! Please try again later, or modify any search queries.",
  fixedPosition = true,
}) => {
  return (
    <div className={fixedPosition ? `no-content-fixed` : `no-content`}>
      <img className="no-content-image" src={emptyBox}></img>
      {message}
    </div>
  );
};

export default NoContent;
