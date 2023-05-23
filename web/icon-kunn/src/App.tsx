import React from 'react';
import { useEffect, useState } from 'react';
import logo from './img/image_FILL0_wght400_GRAD0_opsz48.svg';

function App() {

  const path = 'http://localhost:8080';

  const [state, setState] = useState("");

  useEffect(() => {
    const get = async () => {
        const response = await fetch(path + '/get', {method: 'GET', mode: 'no-cors'})
        .then(r => r.json())
        .then(data => {
          setState(data.Body)
        })
        .catch(e => {
          alert(e);
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
