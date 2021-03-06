//* Author: Greg Petropoulos
//* IT Logger App w/ React/Redux
//* Date:12/30/2021

import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
// import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import About from './components/layout/About';
import PrivateRoute from './components/routing/PrivateRoute';
import Landing from './components/layout/Landing';
import NotFound from './components/layout/NotFound';
import Faq from './components/FAQ/Faq';

import Techs from './components/tech/Techs';
// Bring in CSS
import 'materialize-css/dist/css/materialize.min.css';
//*Bring in js for Navbar function
import M from 'materialize-css/dist/js/materialize.min.js';

import './App.css';

//***REDUX STORE WRAPPER****
import { Provider } from 'react-redux';
import store from './store';
// * Token management
import { loadTech } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

const App = () => {
  //* Initialize Materialize JS for the nav menu button
  useEffect(() => {
    M.AutoInit();
  });
  //* Token checking
  useEffect(() => {
    //* check for token in LS when app first runs
    if (localStorage.token) {
      //* if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    //* try to fetch a user, if no token or invalid token we
    //* will get a 401 response from our API
    store.dispatch(loadTech());

    //* log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Alerts /> */}
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/techs' element={<Techs />} />
            <Route path='/about' element={<About />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/home' element={<PrivateRoute component={Home} />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
