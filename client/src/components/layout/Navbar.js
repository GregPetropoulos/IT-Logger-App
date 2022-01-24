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
      </ul>
    </Fragment>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link
          to='/login'
          target='_parent'
          className='indigo darken-3 waves-effect waves-red btn-large'>
          Login
        </Link>
      </li>
      <li>
        <Link
          to='/register'
          className='blue waves-effect waves-red btn-large'
          target='_parent'>
          Register
        </Link>
      </li>
      <li>
        <Link
          to='/about'
          target='_parent'
          className='blue waves-effect waves-red btn-large'>
          About
        </Link>
      </li>
      <li>
        <Link
          to='/'
          target='_parent'
          className='blue waves-effect waves-red btn-large'>
          IT Logger
        </Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <div className='navbar-fixed'>
        <nav>
          <div className='blue nav-wrapper valign-wrapper'>
            <h1 className='center-align valign-wrapper'>
              <Link to='/' className='brand-logo center'>
                <i className='medium material-icons'>computer</i>
                {''} {title}
              </Link>
            </h1>

            <Link to='#' data-target='slide-out' className='sidenav-trigger'>
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
