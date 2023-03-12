import emptyBox from '../../images/empty-box.png'; // with import
import './NoContent.scss';

function NoContent() {
  return (
    <div className="no-content">
      <img className="no-content-image" src={emptyBox}></img>
      Looks like there's nothing to display! Please try again later, or modify any search queries.
    </div>
  );
}

export default NoContent;
