import React, { useEffect, Fragment } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import Addbtn from './components/layout/Addbtn';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/tech/AddTechModal';
import TechWithModal from './components/tech/TechWithModal';
// Bring in CSS
import 'materialize-css/dist/css/materialize.min.css';
// Bring in js for modals etc
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    //* Initialize Materialize JS
    M.AutoInit();
  });
  return (
    <Fragment>
      <SearchBar />
      <div className='container'>
        <Addbtn />
        <AddLogModal />
        <EditLogModal />
        <AddTechModal />
        <TechWithModal />
        <Logs />
      </div>
    </Fragment>
  );
};

export default App;
