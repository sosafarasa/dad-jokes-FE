import React from 'react';
import Card from './Card';


const CardList = props => {
  return (
    <div className="cards-container">
          <Card card={props.card} />
    </div>
  )
}

export default CardList;