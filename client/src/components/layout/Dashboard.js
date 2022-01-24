import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import TechLogItems from '../techlog/TechLogItems';
//*Bring in js for modals etc
import M from 'materialize-css/dist/js/materialize.min.js';
import Preloader from './Preloader';

const Dashboard = ({
  log: { logs, loading },
  auth: { isAuthenticated, tech }
}) => {
  // //* Initialize Materialize JS for the action button
  // useEffect(() => {
  //   M.AutoInit();
  // });
  if (isAuthenticated === false || tech === null || logs === null) {
    return <Preloader />;
  }

  //*DESTRUCTURE TECH FOR USE IN RETURN
  const { _id, firstName, lastName } = tech;

  //* FOR DASHBOARD DATE
  const todayDate = new Date();

  //* FOR ATTENTION COUNTER
  const numberOfAttentions = logs.map(
    (log) => log.tech._id === _id && log.attention === true
  );
  return (
    <Fragment>
      {isAuthenticated && _id && (
        <div className='card-panel blue z-depth-2'>
          <span className='new badge red' data-badge-caption='Attentions'>
            {numberOfAttentions.filter(Boolean).length}
          </span>
          <p>Date {formatDate(todayDate)}</p>
          <h5 className='center'>
            Hi {firstName} {lastName}
          </h5>

          <ul className='collapsible'>
            <li>
              <div className='collapsible-header no-border grey darken-3'>
                <i className='material-icons'>message</i>
                Your Logs
              </div>
              <div className=' collapsible-body grey darken-3 collection '>
                {logs !== null &&
                  logs.map((logItem) => (
                    <TechLogItems key={logItem._id} logItem={logItem} />
                  ))}
              </div>
            </li>
          </ul>
          
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  log: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  log: state.log
});

export default connect(mapStateToProps, {})(Dashboard);
