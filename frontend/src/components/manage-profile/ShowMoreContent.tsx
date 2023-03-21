import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './ShowMoreContent.scss';

interface ShowMoreContentProps {
  title: string;
  contents: any[];
}
export const ShowMoreContent: React.FC<ShowMoreContentProps> = ({ title, contents }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="more-content__existing">
      <span className="more-content__existing-title">
        {title}
        <div className="more-content__show-button">
          {isShowing ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          <div>
            <span onClick={() => setIsShowing(!isShowing)}>{isShowing ? 'Hide' : 'Show'}</span>
          </div>
        </div>
      </span>
      {isShowing && (
        <>
          {contents.map((content: any, index: number) => (
            <div className="more-content__details-containers">
              <span className="more-content__details-number">{index + 1}</span>
              {content}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
