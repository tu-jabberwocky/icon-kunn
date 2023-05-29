import React from 'react';
import { useEffect, useState } from 'react';
import logo from './img/image_FILL0_wght400_GRAD0_opsz48.svg';

function App() {

  // const path = 'https://weather.tsukumijima.net/api/forecast/city/400040';
  const path = 'https://localhost:8080/get';

  const [state, setState] = useState("");

  useEffect(() => {
    const get = async () => {
        await fetch(path, 
          {mode: 'no-cors', method: 'GET'})
          .then(r => r.json())
          .then(data => {
            console.log('then');
            console.log(data);
            setState(data);
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
      <header className="App-header">
        <img src={logo} alt="logo" />
        <p>
          {state.toString()}
        </p>
      </header>
    </div>
  );
}

export default App;
