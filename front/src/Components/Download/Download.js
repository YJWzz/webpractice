import React, { useState } from 'react';
import loginstyle from "./Download.module.css";
import patrick from "./patrick.jpg"
import Squidward from "./Squidward.jpg"
import Spongebob2 from "./spongebob2.jpg"

function Download() {
  const [imageURLs, setImageURLs] = useState([]);
  const imageNames = [patrick, Squidward, Spongebob2];
  const [selectedImages, setSelectedImages] = useState([]);

  const handleCheckboxChange = (imageName) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(imageName)) {
        return prevSelectedImages.filter((name) => name !== imageName);
      } else {
        return [...prevSelectedImages, imageName];
      }
    });
  };

  const handleDownload = async () => {
    const downloadPromises = selectedImages.map(async (imageName) => {
      try {
        const response = await fetch(`${imageName}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return { name: imageName, url: url };
        } else {
          console.error('Error fetching image:', imageName);
          return null;
        }
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    });

    const downloadedImages = await Promise.all(downloadPromises);
    const filteredImages = downloadedImages.filter((image) => image !== null);
    setImageURLs(filteredImages);
  };

  const handleSaveImages = () => {
    imageURLs.forEach((image) => {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = image.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <div className={loginstyle.login}>
      <h2>Select Images to Download</h2>
      {imageNames.map((imageName, index) => (
    <div key={index}>
        <label>
        <input
            type="checkbox"
            checked={selectedImages.includes(imageName)}
            onChange={() => handleCheckboxChange(imageName)}
        />
        <img src={imageName} alt={`Image ${index}`} style={{ height: 80, width: 80 }} />
        </label>
    </div>
    ))}
      <button onClick={handleDownload}>Download Selected Images</button>
      <button onClick={handleSaveImages}>Save Downloaded Images</button>
      <div>
        {imageURLs.map((image, index) => (
          <img key={index} src={image.url} alt={`Downloaded Image ${index}`} style={{ maxWidth: '200px' }} />
        ))}
      </div>
    </div>
  );
}

export default Download;
