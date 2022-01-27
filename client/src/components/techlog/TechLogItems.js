import React, { Fragment } from 'react';
//!moment deprecated
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';

const TechLogItems = ({
  logItem,
  auth: {
    isAuthenticated,
    tech: { _id }
  }
}) => {
  return (
    <Fragment>
      {isAuthenticated && _id === logItem.tech._id && (
        <div>
          <div className='center collection with-header grey darken-2 z-depth-3'>
            <p>Posted on {formatDate(logItem.date)} </p>
          </div>
          {logItem.attention}
          <a
            href='#!'
            className=' right-align valign-wrapper red secondary-content '>
            <i className='material-icons md-dark'>priority_high</i>
            <span className='black-text '>Attention</span>
          </a>

          <div className='collection-item active grey darken-3'>
            <p className=' '>
              <strong>Message: </strong>
              {logItem.message}
            </p>
            <span>
              <strong>Log ID #</strong> {logItem._id.slice(18, 24)}
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

TechLogItems.propTypes = {
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(TechLogItems);
