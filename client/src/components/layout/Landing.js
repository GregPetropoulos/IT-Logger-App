import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const Landing = ({ isAuthenticated, login }) => {
  // *HARD CODED DEMO LOGIN
  const email = 'demo@yahoo.com';
  const password = 'password';
  const onDemo = () => {
    login(email, password);
  };
  //* If login successful return home page
  if (isAuthenticated) return <Navigate to='/home' />;

  return (
    <section className='landing  center-align'>
      <button
          className='  demoBtn btn-floating btn-large bottom hoverable blue waves-effect waves-red  btn cyan pulse'
          onClick={onDemo}>
          Demo
        </button>
    </section>
  );
};

// export default Landing;
Landing.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Landing);
