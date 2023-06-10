import './imageUploader.css';

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

import RectCoordinate from '../../types/RectCoordinate';
import Canvas from '../imageUploder/canvas/Canvas';

interface CoordinateInfoProps {
  coordinate: RectCoordinate;
  onCoordinatesUpdated: (coordinate: RectCoordinate) => void;
}

const CoordinateInfo: React.FC<CoordinateInfoProps> = ({
  coordinate,
  onCoordinatesUpdated,
}) => {
  const handleClick = () => {
    onCoordinatesUpdated(coordinate);
  };

  return (
    <div className="coordinate-info">
      <span>Left: {coordinate.x}</span>
      <span>Top: {coordinate.y}</span>
      <span>Width: {coordinate.width}</span>
      <span>Height: {coordinate.height}</span>
      <button onClick={handleClick}>Copy Coordinates</button>
    </div>
  );
};

interface ImageUploaderProps {
  onCoordinatesUpdated: (coordinate: RectCoordinate) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onCoordinatesUpdated,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coordinate, setCoordinate] = useState<RectCoordinate | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const isSelectingRef = useRef(false);

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

  const handleImageMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    const image = imageRef.current;
    if (image) {
      isSelectingRef.current = true;
      const rect = image.getBoundingClientRect();
      startPositionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  const handleImageMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isSelectingRef.current) {
      const image = imageRef.current;
      if (image) {
        const rect = image.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;
        const width = currentX - startPositionRef.current.x;
        const height = currentY - startPositionRef.current.y;
        setCoordinate({
          x: startPositionRef.current.x,
          y: startPositionRef.current.y,
          width,
          height,
        });
      }
    }
  };

  const handleImageMouseUp = () => {
    isSelectingRef.current = false;
  };

  const handleCoordinatesUpdated = (coordinate: RectCoordinate) => {
    onCoordinatesUpdated(coordinate);
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
        <div className="image-container">
          <img
            ref={imageRef}
            src={previewUrl}
            alt="Preview"
            onMouseDown={handleImageMouseDown}
            onMouseMove={handleImageMouseMove}
            onMouseUp={handleImageMouseUp}
          />
          {coordinate && <Canvas coordinate={coordinate} />}
          {coordinate && (
            <CoordinateInfo
              coordinate={coordinate}
              onCoordinatesUpdated={handleCoordinatesUpdated}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
