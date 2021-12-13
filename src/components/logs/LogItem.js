import React from 'react';
//!moment deprecated
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';


const today = new Date();


const LogItem = ({ log, deleteLog }) => {
  const onDelete =() => {
    deleteLog(log.id);
    M.toast({html:'Log Deleted'});
  }
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
        <a href='#!' onClick ={onDelete}className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog:PropTypes.func.isRequired,
};

export default connect(null, {deleteLog})(LogItem);
