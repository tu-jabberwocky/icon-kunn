import './imageUploader.css';

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import RectCoordinate from '../../types/RectCoordinate';
import Canvas from '../imageUploader/canvas/Canvas';

function ImageUploader() {
  const [base64fromImage, setBase64fromImage] = useState<string | null>(null);
  const [editPos, setEditPos] = useState<RectCoordinate | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64string = reader.result as string;
        setBase64fromImage(base64string);
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

  const buttonEnabled = editPos ? false : true;

  return (
    <div>
      <div className="columns">
        <div className="column is-2 file is-info">
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
        <div className="column is-2 post-boutton">
          <button
            className="button is-primary"
            onClick={handleButtonClick}
            disabled={buttonEnabled}
          >
            Get Image
          </button>
        </div>
      </div>
      {base64fromImage && (
        <Canvas
          imageUrl={base64fromImage}
          onCoordinatesUpdated={handleCoordinatesUpdated}
        />
      )}
    </div>
  );
}

export default ImageUploader;
