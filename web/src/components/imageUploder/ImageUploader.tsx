import './imageUploader.css';

import React, { useRef,useState } from 'react';

interface Coordinate {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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

  return (
    <div>
      <label htmlFor="image-upload">Select Image:</label>
      <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
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
          {coordinate && (
            <>
              <div
                className="selection-overlay"
                style={{
                  top: coordinate.y,
                  left: coordinate.x,
                  width: coordinate.width,
                  height: coordinate.height,
                }}
              />
              <div
                className="overlay"
                ref={overlayRef}
                style={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader
