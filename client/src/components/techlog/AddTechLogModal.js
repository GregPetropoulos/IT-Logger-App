import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';

const AddTechLogModal = ({ addLog, auth: { tech } }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  // const [tech, setTech] = useState('');

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
      M.toast({ html: `log added by ${tech}` });
    }
    // Clear fields
    setMessage('');
    // setTech('');
    setAttention(false);
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Logs</h4>
        <div className='row'>
          <div className='input-field'>
            {/* <input>{tech}</input> */}
            <label htmlFor='tech' className='active'>
              Tech Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
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
AddTechLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const modalStyle = {
  width: '75%',
  height: '75%'
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLog })(AddTechLogModal);
