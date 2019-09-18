import React from "react";


const Card = props => {
  return (
    <div className="card">
        <div className="img-container">
        <h2>{props.card}</h2>
        </div>
        <button type= "button" onClick= { refreshPage }>New Joke!</button>
    </div>
  );
};

function refreshPage(){ 
  window.location.reload(); 
}

export default Card;