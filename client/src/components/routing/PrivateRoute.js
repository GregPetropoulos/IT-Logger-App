import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth: {isAuthenticated, loading} }) => {
  if(loading) return <Preloader/>
  if(isAuthenticated) return <Component/>
  return <Navigate to='/login' />;
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
