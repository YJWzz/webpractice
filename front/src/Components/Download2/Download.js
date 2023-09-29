import React, { useState } from 'react';
import loginstyle from "./Download.module.css";

function Download2() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

// 处理文件选择
const handleFileSelect = async (event) => {
  const files = event.target.files;
  const fileArray = Array.from(files);

  // 过滤不符合要求的文件类型
  const allowedFileTypes = ['image/jpeg', 'image/png'];
  const filteredFiles = fileArray.filter((file) =>
    allowedFileTypes.includes(file.type)
  );

  // 使用FormData对象来准备上传
  const formData = new FormData();
  filteredFiles.forEach((file, index) => {
    formData.append(`images`, file); // 使用相同的字段名来上传多个文件
  });

  try {
    // 使用fetch将文件上传到后端
    console.log('发送请求到URL:', 'http://localhost:8081/upload');
    const response = await fetch('http://localhost:8081/upload', {
      method: 'POST',
      body: formData,
    });
    console.log('收到后端响应:', response);
    if (response.ok) {
      // 文件成功上传到后端
      console.log('文件上传成功');
    } else {
      // 处理上传失败的情况
      console.error('文件上传失败');
    }
  } catch (error) {
    console.error('发生错误:', error);
  }

  // 预览图像
  const previews = filteredFiles.map((file) => URL.createObjectURL(file));
  setImagePreviews([...imagePreviews, ...previews]);
};

  // 处理文件下载
  const handleDownload = (file) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 处理删除单个图像
  const handleDeleteImage = (index) => {
    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    updatedFiles.splice(index, 1); // 从已选择的文件中删除
    updatedPreviews.splice(index, 1); // 从预览中删除

    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  // 一键删除所有预览图像
  const handleDeleteAllPreviews = () => {
    setImagePreviews([]);
    setSelectedFiles([]);
  };

  // 一键下载所有图像
  const handleDownloadAll = () => {
    selectedFiles.forEach((file) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className={loginstyle.background}>
      <h1>UPLOAD/DOWNLOAD</h1>
      <input type="file" accept="image/*" multiple name="images" onChange={handleFileSelect} />
      <div className="previews">
        {imagePreviews.map((preview, index) => (
          <span key={index} className="preview">
            <img
              src={preview}
              alt={`圖片 ${index}`}
              style={{ width: '150px', height: '150px' }}
            />
            <button onClick={() => handleDeleteImage(index, selectedFiles[index]?.name)}>删除</button>
            <button onClick={() => handleDownload(selectedFiles[index])}>Download</button>
          </span>
        ))}
      </div>
      <button onClick={handleDeleteAllPreviews}>Remove all</button>
      <button onClick={handleDownloadAll}>Download All</button>
    </div>
  );
}

export default Download2;
