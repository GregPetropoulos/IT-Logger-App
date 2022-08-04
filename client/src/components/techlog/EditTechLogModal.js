/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';
import { setCurrent } from '../../actions/logActions';
import Preloader from '../layout/Preloader';
import formatDate from '../../utils/formatDate';

const EditTechLogModal = ({
  setCurrent,
  log: { logs, loading, current },
  updateLog,
  auth: { tech }
}) => {
  // LOCAL STATE UPDATES CURRENT
  const [text, setText] = useState('');
  const [isMatch, setIsMatch] = useState(false);
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);

  // *useEffect handling the edit modal remaining open due to double renders
  // *useEffect handling the the state of current as it's being watched for changes to rerender
  useEffect(() => {
    M.AutoInit();

    const elem = document.getElementById('edit-log-modal');
    const instance = M.Modal.init(elem);
    // console.log('M.Modal.isOpen', M.Modal);
    instance.open();

    //*Once the current is changed and true we up date the local message and attention state
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
    }
  }, [current]);

  // *MATCH LOG ID SET STATE FOR ISMATCH,CURRENT,AND TEXT
  const onChange = (e) => {
    const textInput = e.target.value;
    setText(textInput);

    const textInputMatchId = logs.filter(
      (logItem) => logItem._id.slice(18) === textInput
    );

    if (textInputMatchId.length > 0) {
      setIsMatch(true);
      setCurrent(...textInputMatchId);
    } else {
      setIsMatch(false);
    }
  };

  const onSubmit = (e) => {
    console.log('onsubmit');
    e.preventDefault();
    if (message === '') {
      M.toast({ html: 'Please enter a message' });
    } else {
      // * SET UP AN OBJECT
      const updLog = {
        id: current._id,
        message,
        attention,
        tech: current.tech._id,
        date: new Date()
      };
      // * CALL THE updateLog ACTION/PROP AND PASS IN updLog
      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech.firstName}` });
    }

    //* Clear fields
    setMessage('');
    setText('');
    setAttention(false);
  };

  if (logs === null) {
    console.log('preload');
    return <Preloader />;
  }

  return (
    <div>
      <div
        id='edit-log-modal'
        className='modal grey darken-1 white-text'
        style={modalStyle}>
        <div className='modal-content'>
          <h4>Edit System Logs</h4>
          {tech !== null && (
            <div className=''>
              {tech.firstName} {tech.lastName}
              <p>Tech ID# {tech._id}</p>
            </div>
          )}
          {logs !== null && (
            <>
              <div className='row'>
                <div className='input-field'>
                  <label htmlFor='search' />
                  Enter the Log ID
                  <input
                    id='text'
                    name='text'
                    type='search'
                    required
                    placeholder='Last 6 digits ex: 644bd3'
                    // ref={inputRef}
                    value={text}
                    onChange={onChange}
                  />
                </div>
                {isMatch === true &&
                  logs.map((log) =>
                    log._id.slice(18) === text ? (
                      <div key={log._id}>{`Log ID Match ${log._id}`}</div>
                    ) : (
                      ''
                    )
                  )}
              </div>
              <div className='row'>
                <div className='input-field '>
                  Message:
                  <textarea
                    className='grey input-field'
                    type='textarea'
                    name='msg'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
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
                      <span className='white-text'>Needs Attention</span>
                    </label>
                  </p>
                </div>
              </div>

              <div className='modal-footer grey darken-2 modal-footer'>
                <a
                  href='#!'
                  onClick={onSubmit}
                  className=' modal-close z-depth-3 hoverable modal-close  waves-effect blue btn '>
                  Submit
                </a>
                {/* <a
          href='edit-log-modal'
          onClick={onSubmit}
          className=' modal-close z-depth-3 hoverable modal-close  waves-effect blue btn '>
          Submit
        </a> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

EditTechLogModal.propTypes = {
  // current: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log,
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrent, updateLog })(
  EditTechLogModal
);
