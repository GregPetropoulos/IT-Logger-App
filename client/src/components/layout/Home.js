import React, { Fragment } from 'react';
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
import Dashboard from './Dashboard';

const Home = ({ log: { logs } }) => {
  if (logs === null) {
    return <Preloader />;
  }

  return (
    <Fragment>
      <section className='row '>
        <Hero />
        <LogFilter />
        <StatusCards />
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
