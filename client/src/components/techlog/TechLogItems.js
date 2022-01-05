import React, { Fragment } from 'react';
//!moment deprecated
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
// auth: {isAuthenticated, tech:{_id,firstName, lastName}},
// log

const TechLogItems = ({ log, auth: { isAuthenticated, tech } }) => {
  return (
    <li className='collection-item'>
      {isAuthenticated && tech._id === log.tech._id && (
        <Fragment>
          {/* <h5>{log.tech.firstName} {log.tech.lastName} {log.tech._id}</h5> */}
          <h5>
            {tech.firstName} {tech.lastName}
          </h5>
          {/* <p className='collection-item deep-purple lighten-4'>
          <strong>Message:{' '}</strong>
          {log.message}
        </p> */}
          Posted on {formatDate(log.date)}
          {log.attention && (
            <a
              href='#!'
              className=' right-align valign-wrapper red secondary-content '>
              <i className='material-icons md-dark'>priority_high</i>
              <span className='black-text '>Attention</span>
            </a>
          )}
          <p className='collection-item'>
            <strong>Message: </strong>
            {log.message}
          </p>
          <span>Log ID # {log._id.slice(18, 24)}</span>
          <p>Todays Date{formatDate(new Date())}</p>
        </Fragment>
      )}
    </li>
  );
};

TechLogItems.propTypes = {
  log: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TechLogItems);
