import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
// import Addbtn from './Addbtn';
// import AddTechLogModal from '../techlog/AddTechLogModal';
// import EditTechLogModal from '../techlog/EditTechLogModal';
import TechLog  from '../techlog/TechLog';
import Addbtn from '../techlog/Addbtn';


const Dashboard = () => {
  return (
    <div className='container'>
      <h3>User Dashboard</h3>
      <div>Name</div>
      <SearchBar/>
      <TechLog/>
      <Addbtn /> 
      {/* <AddTechLogModal /> */}
       {/* <EditTechLogModal /> */}
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
