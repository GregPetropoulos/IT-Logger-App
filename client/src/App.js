//* Author: Greg Petropoulos
//* IT Logger App w/ React/Redux
//* Date:12/30/2021
//* Refactored Date:9/28/23

import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../src/components/layout/Navbar';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import 'materialize-css/dist/css/materialize.min.css';
// //*Bring in js for Navbar function
import M from 'materialize-css/dist/js/materialize.min.js';

// * Token management
import { loadTech } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import store from './store';
import { connect } from 'react-redux';
import { getLogs } from './actions/logActions';

const App = ({ log }) => {

  //* Initialize Materialize JS for the nav menu button
  useEffect(() => {
    M.AutoInit();
  });

 //* Token checking
 //TODO Refactor
  useEffect(() => {
    let unmount = true;
    //* check for token in LS when app first runs
    if (localStorage.token && unmount) {
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

    return () => (unmount = false);
  }, []);

  useEffect(() => {
    let unmount = true;
    if (unmount) {
      const loadLogs = async () => {
        await store.dispatch(getLogs());
      };
      loadLogs();
    }
    return () => (unmount = false);
  }, [log.logs.length]);

  return (
    <>
      {/* <Alerts /> */}
      <Suspense fallback={<Preloader />}>
        <Navbar />
        <main className='main-container'>
          <Outlet />
          <Footer />
        </main>
      </Suspense>
    </>
  );
};
const mapStateToProps = (state) => ({
  log: state.log
});
export default connect(mapStateToProps, {})(App);
