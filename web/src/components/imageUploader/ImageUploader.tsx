import './imageUploader.css';

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import RectCoordinate from '../../types/RectCoordinate';
import Canvas from '../imageUploader/canvas/Canvas';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editPos, setEditPos] = useState<RectCoordinate | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoordinatesUpdated = (coordinate: RectCoordinate) => {
    setEditPos(coordinate);
  };

  const handleButtonClick = () => {
    console.log('editPos:', editPos);
  };

  return (
    <div>
      <div className="file is-info">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
          />
          <span className="file-cta">
            <span className="file-icon">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            <span className="file-label">Select File...</span>
          </span>
        </label>
      </div>
      {previewUrl && (
        <Canvas
          imageUrl={previewUrl}
          onCoordinatesUpdated={handleCoordinatesUpdated}
        />
      )}
      <button onClick={handleButtonClick}>Get editPos</button>
    </div>
  );
}

export default ImageUploader;
