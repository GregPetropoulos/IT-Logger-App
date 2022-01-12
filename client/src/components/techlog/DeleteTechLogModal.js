import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteLog } from '../../actions/logActions';
import formatDate from '../../utils/formatDate';

const DeleteTechLogModal = ({
  log: { logs },
  loading,
  deleteLog,
  auth: { tech }
}) => {
  const [toasted, setToast] = useState(false);
  const toastAlert = () => {
    setToast(!toasted);
    M.toast({ html: 'Log Deleted' });
  };

  return (
    <div id='delete-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Delete a Log</h4>
        <div className='collection row'>
          <label htmlFor='logs' className='center collection with-header'>
            <h5>Logs</h5>
            <small>**Red means the log is still in attention status</small>
            <br />
            <small>Order of logs are most recent posted</small>
          </label>
          <ul className='center collection-item'>
            {loading || !logs.length ? (
              <p>No Logs to Show</p>
            ) : (
              logs.map((log) => (
                <li key={log._id} className='collection-item'>
                  <strong>Log ID # {log._id}</strong>
                  <br />
                  <span>
                    {tech !== null && log.tech.firstName && tech.firstName}
                  </span>
                  <br />
                  <span
                    className={` ${log.attention ? 'red-text' : 'blue-text'}`}>
                    {log.message}
                  </span>
                  <br />
                  {formatDate(log.date)}
                  <a
                    href='#!'
                    onClick={() => {
                      toastAlert();
                      deleteLog(log._id);
                    }}
                    // value={toast}
                    // onChange={(() => setToast(!toast))}
                    className='secondary-content hoverable'>
                    <i className='material-icons grey-text'>delete</i>
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
DeleteTechLogModal.propTypes = {
  deleteLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const modalStyle = {
  width: '75%',
  height: '75%',
  backgroundColor: '#e3f2fd'
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  log: state.log
});
export default connect(mapStateToProps, { deleteLog })(DeleteTechLogModal);
