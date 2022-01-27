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
  const [logged, setLogged] = useState('');
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);

  // When click on the log it renders the current info via local state set to backend server info because of connect and mapStateTopProps
  console.log('logged', logged);
  console.log('logged true', logged === true);
  console.log('logged null', logged === null);
  console.log('logged ""', logged === '');
  console.log('logged typeof', typeof logged);
  // console.log('log loading', loading);
  // console.log('tech', tech);
  console.log('logs', logs);
  console.log('current', current);
  console.log('current type of', typeof current);
  console.log('message', message);
  console.log('setCurrent', setCurrent);

  console.log(' attention', attention);
  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    setCurrent(...logged);
    // if (current===Object) {setMessage(current.message);
    // setAttention(current.attention);
    // }
  }, [logged]);

  const onChange = (e) => {
    const idValue = e.target.value;
    console.log('idvalue', idValue);
    if (onChange) {
      let isMatch = logs.filter((log) => log._id === idValue);
      console.log('ismATCH type', typeof isMatch);
      console.log('ismATCH', isMatch);
      setLogged(isMatch);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // logged===null
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
      console.log('updloG', updLog);
    }

    // Clear fields
    setMessage('');
    setLogged('');
    setAttention(false);
  };

  // if (logs === null) {
  //   console.log('preload');
  //   return <Preloader />;
  // }
  console.log('EDIT-LOG-CHECK');
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Edit System Logs</h4>
        {tech !== null && (
          <div className=''>
            {tech.firstName} {tech.lastName}
            <p>Tech ID# {tech._id}</p>
          </div>
        )}
        {logs !== null && (
          <div className='row'>
            <p className='title'>Choose an existing Log</p>
            <div className='input-field'>
              <select
                name='select'
                className='browser-default wrapper'
                onChange={onChange}
                value={logged}>
                options={}
                <option value='' disabled>
                  Select Log
                </option>
                {logs.map(
                  (optionLog) =>
                    optionLog.tech._id === tech._id && (
                      <option
                        key={optionLog._id}
                        multiple={true}
                        value={optionLog._id}>
                        Log ID#: {optionLog._id}
                        Logged Date: {formatDate(optionLog.date)}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        )}
        <div className='row'>
          <div className='input-field'>
            Message:
            <textarea
              type='textarea'
              name='message'
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
