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
      <section className='row '>
        <Hero />
        <LogFilter />
        {/* <StatusCards /> */}
        <div className='no-border col  m5 s12 dashboard'>
          <Dashboard />
        </div>
        <div className='no-border col  m7 s12 '>
          <Logs />
        </div>
        <AddBtn />
        <AddTechLogModal />
        <EditTechLogModal />
        <DeleteTechLogModal />
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
