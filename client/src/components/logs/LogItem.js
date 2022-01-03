import React from 'react';
//!moment deprecated
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { deleteLog, setCurrent } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const LogItem = ({
  log: {
    tech: { firstName, lastName }
  },
  log
}) => {
  return (
    <li className='collection-item avatar'>
      <i className='medium material-icons'>account_circle</i>
      <h5>
        {firstName} {lastName}
      </h5>
      Posted on {formatDate(log.date)}
      <p className='collection-item'>
        <span>Message:{log.message}</span> <br/>
        <span>Log ID # {log._id.slice(18, 24)}</span>
      </p>
        <span>Attention {log.attention ? (<a href='#!' className='secondary-content'><i className='material-icons'>grade</i></a>) : 'blue'}</span>
      <p>Todays Date{formatDate(new Date())}</p>
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
  log: PropTypes.object.isRequired
};
// export default connect(mapStateToProps, { deleteLog, setCurrent })(LogItem);
export default LogItem;
