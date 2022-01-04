import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Navbar = ({ title, auth: { isAuthenticated, tech }, logout }) => {
  const authLinks = (
    <Fragment>
      <h3> Hello {tech && tech.firstName}</h3>
      <ul>
        <li>
          <Link
            onClick={logout}
            to='/login'
            className=' red accent-2 waves-effect waves-black btn-large'>
            <i className='large material-icons'>logout</i>Logout
          </Link>
        </li>
        <li>
          <Link
            to='/home'
            className='deep-purple darken-1 waves-effect waves-black btn-large'>
            <i className='Large material-icons'>home</i>Home
          </Link>
        </li>
        <li>
          <Link
            to='/techs'
            className='deep-purple darken-1 waves-effect waves-black btn-large'>
            <i className='large material-icons'>people</i>Techs
          </Link>
        </li>
        <li>
          <Link
            to='/about'
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
          className='indigo darken-3 waves-effect waves-red btn-large'>
          Login
        </Link>
      </li>
      <li>
        <Link to='/register' className='blue waves-effect waves-red btn-large'>
          Register
        </Link>
      </li>
      <li>
        <Link to='/about' className='blue waves-effect waves-red btn-large'>
          About
        </Link>
      </li>
      <li>
        <Link to='/' className='blue waves-effect waves-red btn-large'>
          IT Logger
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='blue nav-wrapper'>
      <h1 className='center-align'>
        <Link to='/' className='brand-logo center'>
          <i className='medium material-icons'>computer</i>
          {''} {title}
        </Link>
      </h1>

      <Link
        to='#'
        data-target='slide-out'
        className='sidenav-trigger show-on-large'>
        <i className='large material-icons'>menu</i>
      </Link>
      <div id='slide-out' className='sidenav'>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
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
