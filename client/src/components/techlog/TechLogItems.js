import React, { Fragment } from 'react';
//!moment deprecated
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';

const TechLogItems = ({
  auth: {isAuthenticated, tech},
  log
}) => {
  return (
    <li className='collection-item'>
        {isAuthenticated && (<Fragment>
            <h5>{tech.firstName} {tech.lastName}
      </h5>
      Posted on {formatDate(log.date)}
      <p className='collection-item'>
        <span>
          <strong>Message:</strong>
          {log.message}
        </span>{' '}
        <br />
        <span>Log ID # {log._id.slice(18, 24)}</span>
      </p>
      {log.attention && (
          <p className='collection-item'>
          <a href='#!' className=' valign-wrapper red secondary-content '>
          <i className='material-icons md-dark'>priority_high</i>
         <span className='black-text '>Attention</span> 
          </a>
          </p>
          )}
      <p>Todays Date{formatDate(new Date())}</p>
          </Fragment>)}
    </li>
  );
};

TechLogItems.propTypes = {
  log: PropTypes.object.isRequired,
  isAuthenticated:PropTypes.bool,
};
const mapStateToProps = (state) => ({
    auth: state.auth
  });

export default connect(mapStateToProps)(TechLogItems);
