import React from 'react';

import RectCoordinate from '../../../types/RectCoordinate';

interface SelectionOverlayProps {
  coordinate: RectCoordinate;
}

const SelectionOverlay: React.FC<SelectionOverlayProps> = ({ coordinate }) => {
  return (
    <div
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

export default SelectionOverlay;
