import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//For render deployment,disables devtools in prod mode
import {disableReactDevTools}from '@fvilers/disable-react-devtools'
if (process.env.NODE_ENV==='production') disableReactDevTools()

ReactDOM.render(<App />, document.getElementById('root'));
