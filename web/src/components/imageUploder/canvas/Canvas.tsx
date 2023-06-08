import './canvas.css';

import React, { useEffect,useRef, useState } from 'react';

import RectCoordinate from '../../../types/RectCoordinate';

interface CanvasProps {
  coordinate: RectCoordinate;
}

const Canvas: React.FC<CanvasProps> = ({ coordinate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       
      }
    }
  }, [coordinate]);

  return (
    <canvas
      ref={canvasRef}
      className="selection-overlay"
      style={{
        top: coordinate.y,
        left: coordinate.x,
        width: coordinate.width,
        height: coordinate.height,
      }}
    />
  );
};

export default Canvas;