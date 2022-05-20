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
    <div
      id='delete-log-modal'
      className='modal grey darken-1 white-text'
      style={modalStyle}>
      <div className='modal-content'>
        <h4>Delete a Log</h4>
        <div className='collection row'>
          <label htmlFor='logs' className='center collection with-header'>
            <h5 className='white-text'>Logs</h5>
            <p>
              <small className='white-text'>
                **Red means the log is still in attention status
              </small>
              <br />
              <small className='white-text'>
                Order of logs are most recent posted
              </small>
            </p>
          </label>
          <ul className='center collection-item grey black-text'>
            {loading || !logs.length ? (
              <p>No Logs to Show</p>
            ) : (
              logs.map((log) => (
                <li key={log._id} className='collection-item grey'>
                  <strong>Log ID # {log._id}</strong>
                  <br />
                  <span>
                    {tech !== null && log.tech.firstName && tech.firstName}
                  </span>
                  <br />
                  <span
                    className={` ${log.attention ? 'white-text' : 'white-text'}`}>
                    {log.message}
                  </span>
                  <br />
                  {formatDate(log.date)}
                  <a
                    href='#!'
                    onClick={() =>
                      tech._id === log.tech._id
                        ? deleteLog(log._id) && toastAlert()
                        : 'Not Authorized to Delete'
                    }
                    className='secondary-content hoverable'>
                    <i className='material-icons z-depth-3 white red-text'>
                      delete
                    </i>
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
