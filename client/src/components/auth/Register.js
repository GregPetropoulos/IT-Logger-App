import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';

const Register = ({ isAuthenticated, register }) => {
  //*local state for login from
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: ''
  });

  // *destructure for easier use
  const { firstName, lastName, email, password, password2 } = formData;

  //* onChange when input entered update the local state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // * onSubmit send input values from local state to register prop to it's mapped function in actions>reducers
  //* and these values get saved to the database because of the routing in state to the back end.
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (password !== password2) {
          setFormData('')
      } else {
      register({firstName, lastName, email, password});
    }
  };

  //* If register successful return home page
  if (isAuthenticated) return <Navigate to='/home' />;

  return (
    <section className='container'>
      <h1 className='center-align'>Sign Up</h1>
      <i className='medium material-icons'>account_circle</i>
      <p> Sign Into Your Account</p>
      <form className='form' onSubmit={onSubmit}>
        <div className='row'>
        <div className='input-field col s12'>
            <input
              id='first_name'
              type='text'
              name='firstName'
              value={firstName}
              onChange={onChange}
              className='validate'
              required
            />
            <label htmlFor='first_name' className='active'>
              First Name
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              id='last_name'
              type='text'
              name='lastName'
              value={lastName}
              onChange={onChange}
              className='validate'
              required
            />
            <label htmlFor='last_name' className='active'>
              Last Name
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              className='validate'
              required
            />
            <label htmlFor='email' className='active'>
              Email
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              className='validate'
              required
            />
            <label htmlFor='password' className='active'>
              Password
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              id='password2'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              className='validate'
              required
            />
            <label htmlFor='password2' className='active'>
              Password2
            </label>
          </div>
          <button
            className='btn waves-effect waves-blue btn-large'
            type='submit'
            name='action'
            value='Register'>
            Submit
            <i className='material-icons right'>send</i>
          </button>
        </div>
        <p>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </form>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
//* isAuthenticated is a prop referencing the isAuthenticated state
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

//* register is a function in actions being passed in as a prop

export default connect(mapStateToProps, { register })(Register);
