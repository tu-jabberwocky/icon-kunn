import './canvas.css';

import React, { useEffect, useRef, useState } from 'react';

import RectCoordinate from '../../../types/RectCoordinate';

interface CanvasProps {
  selectedImage: string | null;
  rectCoordinates: RectCoordinate | null;
  onRectSelection: (x: number, y: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ selectedImage, rectCoordinates, onRectSelection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        onRectSelection(x, y);
      }
    }
  };

  const handleRectDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStartPosition({ x: event.clientX, y: event.clientY });
    setIsDrawing(true);
    redrawGrayOutRegion();
  };

  const handleRectDragEnd = () => {
    setIsDragging(false);
    setIsDrawing(false);
  };

  const handleRectDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && rectCoordinates && isDrawing) {
      const deltaX = event.clientX - dragStartPosition.x;
      const deltaY = event.clientY - dragStartPosition.y;
      onRectSelection(rectCoordinates.x + deltaX, rectCoordinates.y + deltaY);
      redrawGrayOutRegion();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && selectedImage) {
      const context = canvas.getContext('2d');
      if (context) {
        const image = new Image();
        image.src = selectedImage;
        image.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          redrawGrayOutRegion();
        };
      }
    }
  }, [selectedImage]);

  useEffect(() => {
    redrawGrayOutRegion();
  }, [rectCoordinates]);

  const redrawGrayOutRegion = () => {
    const canvas = canvasRef.current;
    if (canvas && rectCoordinates) {
      const context = canvas.getContext('2d');
      if (context) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            if (
              x < rectCoordinates.x ||
              x > rectCoordinates.x + rectCoordinates.width ||
              y < rectCoordinates.y ||
              y > rectCoordinates.y + rectCoordinates.height
            ) {
              const index = (y * canvas.width + x) * 4;
              const red = data[index];
              const green = data[index + 1];
              const blue = data[index + 2];
              const gray = Math.round(0.3 * red + 0.59 * green + 0.11 * blue);

              data[index] = gray;
              data[index + 1] = gray;
              data[index + 2] = gray;
            }
          }
        }

        context.putImageData(imageData, 0, 0);
      }
    }
  };

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} onClick={handleCanvasClick} className="canvas" />
      {rectCoordinates && (
        <div
          className={`rect-container ${isDragging ? 'dragging' : ''}`}
          style={{
            left: rectCoordinates.x,
            top: rectCoordinates.y,
            width: rectCoordinates.width,
            height: rectCoordinates.height,
          }}
          onMouseDown={handleRectDragStart}
          onMouseMove={handleRectDrag}
          onMouseUp={handleRectDragEnd}
          onMouseLeave={handleRectDragEnd}
        />
      )}
    </div>
  );
};

export default Canvas;
