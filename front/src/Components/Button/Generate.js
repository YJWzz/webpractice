import React from 'react';
import "../style/Button.css";

function Generate({ onClick }) {
  return (
    <button className="custom-button" onClick={onClick} style={{width:300,height:140}}>
      Generate
    </button>
  );
}

export default Generate;
