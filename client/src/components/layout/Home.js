import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logs from '../logs/Logs';
import LogFilter from './LogFilter';
import Hero from '../hero/Hero';
import { Footer } from './Footer';
import AddTechLogModal from '../techlog/AddTechLogModal';
import EditTechLogModal from '../techlog/EditTechLogModal';
import DeleteTechLogModal from '../techlog/DeleteTechLogModal';
import AddBtn from './AddBtn';
import Preloader from './Preloader';
import StatusCards from './StatusCards';
//*Bring in js for modals etc
import M from 'materialize-css/dist/js/materialize.min.js';
import Dashboard from './Dashboard';

const Home = ({ log: { logs } }) => {
  // //* Initialize Materialize JS for the action button
  useEffect(() => {
    M.AutoInit();
  });
  if (logs === null) {
    return <Preloader />;
  }

  return (
    <Fragment>
      <Hero />
      <LogFilter />
      <StatusCards />
      <section className='row'>
        <div className='no-border col s5 dashboard'>
          <Dashboard />
        </div>
        <AddBtn />
        <AddTechLogModal />
        <EditTechLogModal />
        <DeleteTechLogModal />
        <div className='no-border  col s7'>
          <Logs />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

Home.propTypes = {
  log: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log
});

export default connect(mapStateToProps)(Home);
