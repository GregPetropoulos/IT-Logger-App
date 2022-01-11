import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';

const AddTechLogModal = ({ addLog, auth: { tech } }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);


  const onSubmit = (e) => {
    e.preventDefault();
    if (message === '') {
      M.toast({ html: 'Please enter a message' });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date()
      };
      addLog(newLog);

      M.toast({ html: `log added by ${tech.firstName}` });
    }
    // Clear fields
    setMessage('');
    setAttention(false);
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Logs</h4>
        <div className='row'>
          <label htmlFor='tech' className=''>
            Tech Name
          </label>
          {tech !== null ? (
            <div>
              {tech.firstName} {tech.lastName}
            </div>
          ) : (
            <p>Tech was unable to load</p>
          )}
          <div className='input-field'></div>
        </div>
        <div className='row'>
          <label htmlFor='message' className='active'>
            Log Message
          </label>
          <div className='white input-field'>
            <textarea
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label htmlFor='attention'>
                <input
                  id='attention'
                  type='checkbox'
                  className='filled-in red'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}></input>
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='blue lighten-5 modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='  hoverable modal-close waves-effect blue btn'>
          Enter
        </a>
      </div>
    </div>
  );
};
AddTechLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const modalStyle = {
  width: '75%',
  height: '75%',
  backgroundColor: '#e3f2fd'
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLog })(AddTechLogModal);
