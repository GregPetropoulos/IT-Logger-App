/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
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
  const [message, setMessage] = useState();
  const [attention, setAttention] = useState(false);

  // When click on the log it renders the current info via local state set to backend server info because of connect and mapStateTopProps

  useEffect(() => {
    if (logged) {
      const isMatch = () => logs.filter((log) => log._id === logged);
      console.log('isMatch', isMatch());
      setCurrent(isMatch());
    }
  }, [logged]);

  useEffect(() => {
    if (current !== null) {
      setMessage(current[0].message);
      setAttention(current[0].attention);
    }
  }, [current]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (message === ''|| logged==="") {
      M.toast({ html: 'Please enter a message' });
    } else {
      // * SET UP AN OBJECT
      const updLog = {
        id: current[0]._id,
        message,
        attention,
        tech: current[0].tech._id,
        date: new Date()
      };
      // * CALL THE updateLog ACTION/PROP AND PASS IN updLog
      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech.firstName}` });
    }

    // Clear fields
    setMessage('');
    setLogged('');
    setAttention(false);
  };

  // if (loading || logs === null || tech=== null) {
  //  ;
  // }
  if(logs=== null){
    console.log('preload')
    // return <Preloader />
  }
  console.log('whwhwhhwhwhwhhahhahaaaaaaa');
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Edit System Logs</h4>
        {tech !== null ? (
          <div className='browser-default'>
            {tech.firstName} {tech.lastName}
            <p>Tech ID# {tech._id}</p>
          </div>
        ) : (
          <p>Tech not Loaded to use edit</p>
        )}
        <div className='row'>
          <div className='input-field'></div>
          <p className='title'>Choose an existing Log</p>
          <select
            className='browser-default hoverable'
            onChange={(e) => setLogged(e.target.value)}
            value={logged}>
            <option value='' disabled>
              Select Log
            </option>
            {
              // logs !== null && tech !== null
                // ? 
                logs.map(
                    (optionLog) =>
                      optionLog.tech._id === tech._id && (
                        <option
                          key={optionLog._id}
                          multiple={true}
                          value={`${optionLog._id}`}>
                          Log ID#: {optionLog._id}
                          Logged Date: {formatDate(optionLog.date)}
                        </option>
                      )
                  )
                // : null
              // <p>Not Authorized</p>
            }
          </select>
        </div>
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
  current: PropTypes.object,
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
