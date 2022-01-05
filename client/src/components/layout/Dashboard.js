import React, {useEffect}from 'react';
import PropTypes from 'prop-types';
import TechLog from '../techlog/TechLog';
import AddBtn from './AddBtn';
import EditTechLogModal from '../techlog/EditTechLogModal';
import AddTechLogModal from '../techlog/AddTechLogModal';

//*Bring in js for modals etc
import M from 'materialize-css/dist/js/materialize.min.js';

const Dashboard = () => {

  //* Initialize Materialize JS for the action button
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <div className='no border'>
      <h4 className='no-border center card-panel blue'>User Dashboard</h4>
      <TechLog />
      <div className='container'>
        <AddBtn />
        <AddTechLogModal />
        <EditTechLogModal />
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
