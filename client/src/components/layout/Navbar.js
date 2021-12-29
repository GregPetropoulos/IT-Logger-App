
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {logout} from '../../actions/authActions'

const Navbar = ({title, auth: {isAuthenticated}, logout }) => {
  const authLinks = (
    <Fragment>
      {/* <h2>
        <li>Hello {tech && tech.firstName}</li>
      </h2> */}
      <li>
        <Link onClick={logout} to='/login'>
          <i className='small material-icons'>Logout</i>
        </Link>
      </li>
      <li>
        <Link to='/home'>
<i className='material-icons'>Home</i>
        </Link>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
     </Fragment>
  );
  return (
    <div className='nav-wrapper'>
      <h1>
        <Link to='/' className='brand-logo'>
          <i className='material-icons'>bug_report</i> 
        {title}
        </Link>
      </h1>
      <ul id="nav-mobile" className="right hide-on-med-and-down">{isAuthenticated ? authLinks : guestLinks}</ul>
      {/* Add more page links here if needed */}
    </div>
  );
};
Navbar.propTypes ={
  logout:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
}

Navbar.defaultProps = {
  title: 'IT Logger App',
  // icon: 'fas fa-id-card-alt'
};
const mapStateToProps = (state) => ({
auth:state.auth
});
export default connect(mapStateToProps, {logout})(Navbar);
