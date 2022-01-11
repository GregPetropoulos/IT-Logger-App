/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import LogSelectOptions from '../techlog/LogSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';
import { setCurrent } from '../../actions/logActions';
import Preloader from '../layout/Preloader';
import { handle } from 'express/lib/router';

const EditTechLogModal = ({
  setCurrent,
  log: { logs, loading, current },
  updateLog,
  auth: { tech }
}) => {

  const [logged, setLogged] = useState('');
  const [message, setMessage] = useState();
  const [attention, setAttention] = useState(false);

  console.log('current redux state', current);
  if (logged) {
    console.log('logged local state if logged TRUE', logged);
  }

  // console.log('logging stale value of logs',logs)

  // When click on the log it renders the current info via local state set to backend server info because of connect and mapStateTopProps

  // useEffect(() => {
  //   if (current) {
  //     setLogged(current._id);
  //     setMessage(current.message);
  //     setAttention(current.attention);
  //   }
  // }, [current]);
  
  

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === '') {
      M.toast({ html: 'Please enter a message' });
    } else {
      // * SET UP AN OBJECT
      // const updLog = {
      //   _id: current._id,
      //   message,
      //   attention,
      //   tech: current.tech._id,
      //   date: new Date()
      // };
      // * CALL THE updateLog ACTION/PROP AND PASS IN updLog
      // updateLog(updLog);
      M.toast({ html: `Log updated by ${tech.firstName}` });
    }

    // Clear fields
    // setMessage('');
    // setLogged('');
    // setAttention(false);
  };
//* SET STATE TO DEFAULT LOG ID IN LOGGED
  // console.log('value',logs[2]._id)
  

  const onChange = (e) => {
    // *THIS IS VERY IMPORTANT IT SETS CURRENT TO THE CLICKED OPTION
    setLogged(e.target.value)
    // logged? (handleCurrent()):(console.log('could not handleclick in onChange'))
    console.log('the logged',logged)
  };
  
  const handleCurrent = () => {
    if(logged  !== ''){
    //* MATCHING THE LOG IDS
      const isMatch = () => logs.filter((log) => log._id === logged);
      console.log('isMatch', isMatch());
      // * PASS IN THE ARRAY OF OBJECTS THAT PASSED THE TEST AND SET TO CURRENT
      // * IF THERE IS NOT A MATCH SET CURRENT TO 1ST LOG
  setCurrent(isMatch());
    }
  console.log("id's didn't match",` ${logged} and ${current}` )
  // handleCurrent();
}





  if (loading || logs === null) {
    return <Preloader />;
  }
  

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Edit System Logs</h4>
        {tech !== null ? (
          <div className='browser-default'>
            {tech.firstName} {tech.lastName}
          </div>
        ) : (
          <p>Tech not Loaded to use edit</p>
        )}
        <div className='row'>
          <div className='input-field'></div>
          <p className='title'>Choose an existing Log</p>
          <select
            className='browser-default hoverable'
            onChange={onChange}
              // {/* onBlur={handleCurrent} */}
               value={logged}
            // multiple={true}
            >
            <option value='' disabled>
              Select Log
            </option>
            {logs !== null &&
              logs.map((optionLog) => (
                <option
                onSelect={handleCurrent}
                  key={optionLog._id}
                  // defaultValue={logged}
                  multiple={true}
                  value={optionLog._id}>
                  Log ID#: {optionLog._id}
                </option>
              ))}
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
              {/* <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}></input>

                <span>Needs Attention</span>
              </label> */}
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
  // setCurrent: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  log: state.log,
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrent, updateLog })(
  EditTechLogModal
);
