import React, { useEffect, useRef, useState } from 'react';

import ImageUploader from './components/imageUploader/ImageUploader';
import RectCoordinate from './types/RectCoordinate';

function App() {
  // const path = 'https://weather.tsukumijima.net/api/forecast/city/400040';
  const path = 'https://localhost:7265/get';

  const [state, setState] = useState('');

  const handleCoordinatesUpdated = (coordinate: RectCoordinate) => {
    // 座標情報を受け取った後の処理を行う
    console.log('Coordinates Updated:', coordinate);
  };

  useEffect(() => {
    const get = async () => {
      await fetch(path)
        .then((r) => r.json())
        .then((data) => {
          setState(data.value);
        })
        .catch((e) => {
          console.log('catch');
          console.log(e);
        });
    };
    get();
  }, []);

  return (
    <div className="App">
      {state.toString()}
      <ImageUploader onCoordinatesUpdated={handleCoordinatesUpdated} />
    </div>
  );
}

export default App;
