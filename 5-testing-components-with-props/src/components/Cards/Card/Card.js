import { useState } from 'react';
import heartFilled from '../../../svgs/heartFilled.svg';
import heartOutlined from '../../../svgs/heartOutlined.svg';

import './Card.css'

const Card = (props) => {
  const { name, phone, email, image, isFavoured } = props;
  const [isFavouredState, setIsFavouredState] = useState(isFavoured);

  const handleHeartClick = () => {
    setIsFavouredState(prevState => !prevState);
  }

  return (
    <div className="card">
      <div className="card_header">
        <img alt={image.alt} className="card-img" src={image.url} />
        <button
          className="heart"
          onClick={handleHeartClick}
        >
          {
            isFavouredState ?
              <img src={heartFilled} alt="filled heart" /> :
              <img src={heartOutlined} alt="outlined heart" />
          }
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  )
};

export default Card;