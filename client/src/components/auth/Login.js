import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

const Login = ({ isAuthenticated, login }) => {
  //*local state for login from
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // *destructure for easier use
  const { email, password } = formData;

  //* onChange when input entered update the local state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // * onSubmit send input values from local state to login prop to it's mapped function in actions>reducers
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //* If login successful return home page
  if (isAuthenticated) return <Navigate to='/home' />;

  return (
    <section className='container'>
      <h1 className='sign-in-title center-align'>Sign In</h1>
      <i className='medium material-icons'>login</i>
      <p> Sign Into Your Account</p>
      <form className='form signInForm white-text' onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              className='validate center'
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
              className='validate center'
              required
            />
            <label htmlFor='password' className='active'>
              Password
            </label>
          </div>
          <div className='btnSignInGroup center'>
            <button
              className=' col s12 indigo darken-3 waves-effect waves-red btn-large center'
              type='submit'
              name='action'
              value='Login'>
              Submit
              <i className='material-icons right '>send</i>
            </button>
            <div className='regAcc'>
              <p>Don't have an account?</p>
              <Link
                to='/register'
                className='white-text indigo  btn darken-3 waves-effect waves-red'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
