import React, { useState } from 'react';
import "../style/Dropdown.css";

function Styles() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value); 
    toggleDropdown();
  };

  return (
    <div className="dropdown-container">
      <span style={{ color: "black" }}>Styles</span>
      <button onClick={toggleDropdown} className="dropdown-button" style={{width:200,top:50 ,left:-15}}>
        {selectedValue || '选择一个值'}
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'active' : ''}`}>
        <li onClick={() => handleOptionClick(1)}>选项1</li>
        <li onClick={() => handleOptionClick(2)}>选项2</li>
        <li onClick={() => handleOptionClick(3)}>选项3</li>
      </ul>
    </div>
  );
}

export default Styles;