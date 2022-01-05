import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Logs from '../logs/Logs';
import SearchBar from './SearchBar';
import Hero from '../hero/Hero';
import { Footer } from './Footer';
import Dashboard from './Dashboard';

const Home = () => {
  return (
<Fragment>
<Hero/>

      <section className='row' >
        <div className='no-border col s5'> 
        <Dashboard />    
        </div>
        <div className='no-border  col s7'>
        <SearchBar/>
        <Logs/>
        </div>
      </section>
      <Footer/>

</Fragment>
  );
};

Home.propTypes = {
}

export default Home;
