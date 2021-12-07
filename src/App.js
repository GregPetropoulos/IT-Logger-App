import React, {useEffect} from 'react';
// Bring in CSS
import 'materialize-css/dist/css/materialize.min.css';
// Bring in js for modals etc
import M from 'materialize-css/dist/js/materialize.min.js'
import './App.css';

const App = ()=> {
  useEffect(()=> {
    //* Initialize Materialize JS
    M.AutoInit();
  })
  return (
    <div className="App">
      My App
    </div>
  );
}

export default App;
