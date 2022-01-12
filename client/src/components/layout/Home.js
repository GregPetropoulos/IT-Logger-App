import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logs from '../logs/Logs';
import SearchBar from './SearchBar';
import Hero from '../hero/Hero';
import { Footer } from './Footer';
import AddTechLogModal from '../techlog/AddTechLogModal';
import EditTechLogModal from '../techlog/EditTechLogModal';
import DeleteTechLogModal from '../techlog/DeleteTechLogModal'
import AddBtn from './AddBtn';

//*Bring in js for modals etc
import M from 'materialize-css/dist/js/materialize.min.js';
// import Dashboard from './Dashboard';

const Home = () => {

  // //* Initialize Materialize JS for the action button
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Fragment>
      <Hero />
      <section className='row'>
        <div className='no-border col s5'>
          {/* <Dashboard /> */}
          <div className=''>
        <AddBtn />
        <AddTechLogModal />
        {/* <EditTechLogModal /> */}
        <DeleteTechLogModal/>
      </div>
        </div>
        <div className='no-border  col s7'>
          <SearchBar />
          <Logs />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

Home.propTypes = {};

export default Home;
