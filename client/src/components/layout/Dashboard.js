import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import Addbtn from './Addbtn';
import AddTechLogModal from '../techlog/AddTechLogModal';
import EditTechLogModal from '../techlog/EditTechLogModal';


const Dashboard = () => {
  return (
    <div className='container'>
      <SearchBar />
      {/* <TechLog/> */}
      <Addbtn />
      <AddTechLogModal />
      <EditTechLogModal />
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
