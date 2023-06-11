import './imageUploader.css';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import RectCoordinate from '../../types/RectCoordinate';
import Canvas from '../imageUploader/canvas/Canvas';

interface ImageUploaderProps {
  onCoordinatesUpdated: (coordinate: RectCoordinate) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onCoordinatesUpdated,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
          onCoordinatesUpdated={onCoordinatesUpdated}
        />
      )}
    </div>
  );
};

export default ImageUploader;
