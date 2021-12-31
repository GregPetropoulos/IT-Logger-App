import React from 'react';
//!moment deprecated
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteLog, setCurrent } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';


const today = new Date();


const LogItem = ({ log, deleteLog, setCurrent, auth}) => {

  // const onDelete =() => {
  //   deleteLog(log._id);
  //   M.toast({html:'Log Deleted'});
  // }
  return (
    <li className="collection-item">

      {log.message}
      {log.tech.firstName}
      {log._id}
      {log.attention}
    </li>
    // <li className='collection item'>
    //   <div>
    //     <a
    //       href='#edit-log-modal'
    //       className={`modal-trigger ${
    //         log.attention ? 'red-text' : 'blue-text'
    //       }`}
    //       onClick={()=> setCurrent(log)}
    //       >
    //       {log.message}
    //     </a>
    //     <br />
    //     <span className='grey-text'>
    //       <span className='black-text'>ID #{log._id}</span> Last update by{' '}
    //       <span className='black-text'>{log.tech.firstName}</span> on{' '}
    //       {today.toLocaleString()}
    //     </span>
    //     <a href='#!' onClick ={onDelete}className='secondary-content'>
    //       <i className='material-icons grey-text'>delete</i>
    //     </a>
    //   </div>
    // </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog:PropTypes.func.isRequired,
  setCurrent:PropTypes.func.isRequired,
};
const mapStateToProps =(state)=> ({
  auth:state.auth
})
export default connect(mapStateToProps, {deleteLog, setCurrent})(LogItem);
