/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
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
  console.log('text', text);
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);

  useEffect(() => {
    M.AutoInit();

    //! Need help to keep modal open while an option is selected
    //! Selected option is closing the whole modal

    //  if an option is selected keep modal open
    // if(logged.length>0){
    //   SetOpenModal(true)
    // }

    // Once local logged state is changed in from the select, then the current in redux state is updated
    // setCurrent(...logged);
    // copy state
    // const logIdInput = text;
    // const isValueMatch = () => {
    //   const logMatchObj = logs.filter((item) => item._id === logIdInput);
    //   console.log('logmatchobj', logMatchObj);
    //   setCurrent(logMatchObj);
    // };

    // console.log('isValueMatch', isValueMatch());
    //Once the current is changed and true we up date the local message and attention state
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
    }
  }, []);

  // console.log(openModal);

  const inputRef = useRef();

  // Updates the the logged and current object

  
  const onChange = (e) => {
    // e.preventDefault()
     setText(e.target.value)
//      const copyText = text
//  const match = logs.filter(item=> item._id === copyText)
// setCurrent("hello")
// console.log('match',match)
  // const isValueMatch =
  //    return logs.filter((item) => item._id === idValue);
  // console.log('isValueMatch', isValueMatch);
  // setText(isValueMatch[0]._id);
  // setCurrent(...isValueMatch)
   };

  const onSubmit = (e) => {
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

    // Clear fields
    setMessage('');
    setText('');
    setAttention(false);
  };

  if (logs === null) {
    console.log('preload');
    return <Preloader />;
  }

  return (
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
        {logs !== null ? (
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
                  placeholder='Must be 24 characters example: 21f2b...'
                  ref={inputRef}
                  value={text}
                  onChange={onChange}
                />
              </div>
            <ul>
              {logs.map((log) => log._id=== inputRef.current.value? setIsMatch(true) &&(
                <li key={log._id}>{`Log ID Match ${log._id}`}</li>
              ):null)}
            </ul>
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

</>
) : null}
        
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
