import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import LogSelectOptions from '../techlog/LogSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';

const EditTechLogModal = ({ current, updateLog, auth: { tech } }) => {
  const [message, setMessage] = useState('');
  const [log, setLog] = useState('');
  const [attention, setAttention] = useState(false);

  // When click on the log it renders the current info via local state set to backend server info because of connect and mapStateTopProps
  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      // setTech(current.tech);
    }
  }, [current]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      // * SET UP AN OBJECT
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      };
      // * CALL THE updateLog ACTION/PROP AND PASS IN updLog
      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}` });
    }

    // Clear fields
    setMessage('');
    setLog('');
    setAttention(false);
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Logs</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        {/* <div className='row'>
          <div name='tech' value={tech} className='browser-default'>
            {tech}
          </div>
          </div> */}
          <div className='row'>
            <div className='input-field'></div>
            <select
              name='log'
              value={log}
              className='browser-default'
              onChange={(e) => setLog(e.target.value)}>
              <option value='' disabled>
                Select Log
              </option>
              <LogSelectOptions />
            </select>
          </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}></input>
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue btn'>
          Enter
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: '75%',
  height: '75%'
};
EditTechLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  current: state.log.current,
  auth: state.auth
});

export default connect(mapStateToProps, { updateLog })(EditTechLogModal);
