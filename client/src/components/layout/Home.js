import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Logs from '../logs/Logs';
import SearchBar from './SearchBar';
import Hero from '../hero/Hero';

// import Dashboard from './Dashboard';

const Home = () => {
  return (
    <div className='container'>
      <section className='home-section'>
        <Hero />
        <SearchBar />
        <Logs />
      </section>
      <section className='dashboard-section'>
        {/* <Dashboard /> */}    
      </section>
    </div>
  );
};

Home.propTypes = {
}

export default Home;
