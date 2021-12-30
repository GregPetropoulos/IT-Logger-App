import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Navbar = ({ title, auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <Fragment>
      {/* <h2>
        <li>Hello {tech && tech.firstName}</li>
      </h2> */}
      <li>
        <Link onClick={logout} to='/login' className='waves-effect waves-green btn-large'>
          <i className='large material-icons'>Logout</i>
        </Link>
      </li>
      <li>
        <Link to='/home' className='waves-effect waves-purple btn-large'>
          <i className='Large material-icons'>Home</i>
        </Link>
        <li>
        <Link to='/about' className='waves-effect waves-purple btn-large'>
          About
        </Link>
      </li>
      <li>
        <Link to='/' className='waves-effect waves-purple btn-large'>
          IT Logger
        </Link>
      </li>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login' className='waves-effect waves-purple btn-large'>
          Login
        </Link>
      </li>
      <li>
        <Link to='/register' className='waves-effect waves-purple btn-large'>Register</Link>
      </li>
      <li>
        <Link to='/about' className='waves-effect waves-purple btn-large'>
          About
        </Link>
      </li>
      <li>
        <Link to='/' className='waves-effect waves-purple btn-large'>
          IT Logger
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className='nav-wrapper'>
      <h1>
        <Link to='/' className='brand-logo'>
          <i className='large material-icons'>bug_report</i>
          {title}
        </Link>
      </h1>

      <ul id='slide-out' className='sidenav'>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
      <Link to='/' data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></Link>
    </div>
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
