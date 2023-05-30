import React from 'react';
import { useEffect, useState } from 'react';

import ImageUploder from './components/modules/ImageUploder';

function App() {

  // const path = 'https://weather.tsukumijima.net/api/forecast/city/400040';
  const path = 'https://localhost:7265/get';

  const [state, setState] = useState("");

  useEffect(() => {
    const get = async () => {
        await fetch(path)
          .then(r => r.json())
          .then(data => {
            setState(data.value);
        })
        .catch(e => {
          console.log('catch');
          console.log(e);
        });
    };
    get();
  }, []);


  return (
    <div className="App">
      {state.toString()}
      <ImageUploder />
    </div>
  );
}

export default App;
