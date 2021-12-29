import React from 'react';
import PropTypes from 'prop-types';
import Logs from '../logs/Logs';
import SearchBar from './SearchBar';
import Hero from '../hero/Hero';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <div className='container'>
      <div>
        <Dashboard />
      </div>
      <Hero />
      <SearchBar />
      <Logs />
      {/* <AddTechModal /> */}
      {/* <TechWithModal /> */}
    </div>
  );
};

Home.propTypes = {};

export default Home;
