import React from 'react';
//!moment deprecated
import PropTypes from 'prop-types';
const today = new Date();

const LogItems = ({ log }) => {
  return (
    <li className='collection item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}>
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log.id}</span> Last update by{' '}
          <span className='black-text'>{log.tech}</span> on{' '}
          {today.toLocaleString()}
        </span>
        <a href='#!' className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItems.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItems;
