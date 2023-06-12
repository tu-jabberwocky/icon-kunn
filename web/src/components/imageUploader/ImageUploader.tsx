import './imageUploader.css';

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ChangeEvent, useState } from 'react';

import ApiClient from '../../api/api';
import RectCoordinate from '../../types/RectCoordinate';
import Canvas from '../imageUploader/canvas/Canvas';

function ImageUploader() {
  const [base64fromImage, setBase64fromImage] = useState<string | null>(null);
  const [editPos, setEditPos] = useState<RectCoordinate | null>(null);
  const apiUrl = 'https://localhost:7265';
  const api = new ApiClient(apiUrl);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      convertImageToBase64(file);
    }
  };

  const convertImageToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64string = reader.result as string;
      setBase64fromImage(base64string);
    };
    reader.readAsDataURL(file);
  };

  const handleCoordinatesUpdated = (coordinate: RectCoordinate) => {
    setEditPos(coordinate);
  };

  const handleButtonClick = () => {
    if (editPos && base64fromImage) {
      console.log('Selected Coordinates:', editPos);
      console.log('Image Base64:', base64fromImage);

      api
        .get<string>('/get')
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const buttonEnabled = !editPos;

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
        <div className="column is-2 button-container">
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
