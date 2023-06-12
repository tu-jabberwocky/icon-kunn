import './canvas.css';

import React, { useEffect, useRef, useState } from 'react';

import RectCoordinate from '../../../types/RectCoordinate';

interface CanvasProps {
  imageUrl: string;
  onCoordinatesUpdated: (coordinate: RectCoordinate) => void;
}

const Canvas: React.FC<CanvasProps> = ({ imageUrl, onCoordinatesUpdated }) => {
  const [coordinate, setCoordinate] = useState<RectCoordinate | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const isSelectingRef = useRef(false);

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
        const newCoordinate: RectCoordinate = {
          x: startPositionRef.current.x,
          y: startPositionRef.current.y,
          width,
          height,
        };
        setCoordinate(newCoordinate);
        onCoordinatesUpdated(newCoordinate);
      }
    }
  };

  const handleImageMouseUp = () => {
    isSelectingRef.current = false;
  };

  const rectStyle = coordinate
    ? {
        top: coordinate.y,
        left: coordinate.x,
        width: coordinate.width,
        height: coordinate.height,
      }
    : {};

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      if (canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [coordinate]);

  const getCoordinate = () => coordinate;

  return (
    <div className="image-container">
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Preview"
        onMouseDown={handleImageMouseDown}
        onMouseMove={handleImageMouseMove}
        onMouseUp={handleImageMouseUp}
      />
      {coordinate && (
        <canvas ref={canvasRef} style={rectStyle} className="canvas" />
      )}
    </div>
  );
};

export default Canvas;
