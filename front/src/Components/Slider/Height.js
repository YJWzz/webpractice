import React, { useState } from 'react';
import "../style/slider.css";

function Height({ value, onChange }) {
  const [sliderValue, setSliderValue] = useState(value);
  const [inputValue, setInputValue] = useState(value);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    setInputValue(newValue);
    onChange(newValue); 
  };

  const handleInputChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    newValue = Math.min(100, Math.max(0, newValue));
    setSliderValue(newValue);
    setInputValue(newValue);
    onChange(newValue); 
  };

  return (
    <div className="slider-container">
      <h4>Height</h4>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        className="slider"
        onChange={handleSliderChange}
      />
      <input
        type="number"
        min="0"
        max="100"
        value={inputValue}
        className="input"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Height;
