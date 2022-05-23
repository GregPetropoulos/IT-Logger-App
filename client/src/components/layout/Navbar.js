import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Navbar = ({ title, auth: { isAuthenticated, tech }, logout }) => {
  const authLinks = (
    <Fragment>
      <ul>
        <li>
          <Link
            onClick={logout}
            to='/login'
            target='_parent'
            className=' red accent-2 waves-effect waves-black btn-large'>
            <i className='large material-icons'>logout</i>Logout
          </Link>
        </li>
        <li>
          <Link
            to='/home'
            target='_parent'
            className='deep-purple darken-1 waves-effect waves-black btn-large'>
            <i className='Large material-icons'>home</i>Home
          </Link>
        </li>
        <li>
          <Link
            to='/techs'
            target='_parent'
            className='deep-purple darken-1 waves-effect waves-black btn-large'>
            <i className='large material-icons'>people</i>Techs
          </Link>
        </li>
        <li>
          <Link
            to='/about'
            target='_parent'
            className='deep-purple darken-1 waves-effect waves-black btn-large'>
            <i className='Large material-icons'>info</i>
            About
          </Link>
        </li>
        <li>
          <Link
            to='/faq'
            target='_parent'
            className='deep-purple darken-1 waves-effect waves-black btn-large'>
            <i className='Large material-icons'>help</i>
            FAQ
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <ul className='guest-links'>
      <li>
        <Link
          to='/login'
          target='_parent'
          className='guest-link indigo darken-3 waves-effect waves-red btn-large'>
          Login
        </Link>
      </li>
      <li>
        <Link
          to='/register'
          className='guest-link blue waves-effect waves-red btn-large'
          target='_parent'>
          <i className='Large material-icons'>how_to_reg</i>
          Register
        </Link>
      </li>
      <li>
        <Link
          to='/about'
          target='_parent'
          className='guest-link blue waves-effect waves-red btn-large'>
          About
        </Link>
      </li>
      <li>
        <Link
          to='/'
          target='_parent'
          className=' guest-link blue waves-effect waves-red btn-small'>
          IT Logger
        </Link>
      </li>

      <li>
        <Link
          to='/faq'
          target='_parent'
          className='blue waves-effect waves-black btn-large'>
          <i className='Large material-icons'>help</i>
          FAQ
        </Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <div className='navbar-fixed'>
        <nav className='row'>
          <div className='blue nav-wrapper valign-wrapper col s12'>
            <Link to='/' className='brand-logo center'>
              <div className=' valign-wrapper center-align'>
                <i className='medium material-icons'>computer</i>
                <p className='navbar-title flow-text'>
                  IT Logger
                  </p> 
              </div>
            </Link>
            <Link
              to='#'
              data-target='slide-out'
              className='sidenav-trigger show-on-large'>
              <i className='large material-icons'>menu</i>
            </Link>
          </div>
        </nav>
      </div>
      <div id='slide-out' className='sidenav grey '>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </Fragment>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

Navbar.defaultProps = {
  title: 'IT Logger App'
  // icon: 'fas fa-id-card-alt'
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
