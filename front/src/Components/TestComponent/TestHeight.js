import React, { useState } from 'react';
import "../style/slider.css";
import axios from 'axios';

function Height({ currentPage }) {
  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
  };

  // 定義數據提交
  const handleSubmit = async () => {
    try {
      // 創建用戶輸入的數值對象
      const requestData = {
        height: sliderValue, // 使用前端的 Slider 值
      };

      let endpoint;
      if (currentPage === 'txt2img') {
        endpoint = '/api/txt2img'; // 根據不同頁面做判斷 因為是共用元件
      } else if (currentPage === 'img2img') {
        endpoint = '/api/img2img'; 
      }

      // 發送post請求到後端 
      const response = await axios.post(endpoint, requestData);

      // 後端響應以監控台顯示
      console.log('后端响应数据:', response.data);
    } catch (error) {
      console.error('发送请求时发生错误:', error);
    }
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

      {/*添加一個可觸發的按鍵*/}
      <button onClick={handleSubmit}>提交数据</button>
    </div>
  );
}

export default Height;
