import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

const Navbar = ({ title, auth: { isAuthenticated, tech }, logout }) => {
  const linkArray = [
    { link: '/login', icon: 'logout' },
    { link: '/home', icon: 'home' },
    { link: '/techs', icon: 'people' },
    { link: '/about', icon: 'info' },
    { link: '/register', icon: 'create' },
    { link: '/', icon: 'computer' }
  ];
  const renderLinks = (hide) => {
    return linkArray.map((item) =>
      isAuthenticated ? (
        <ul key={item.link} className={hide}>
          {item.link !== '/register' && item.link !== '/' && (
            <li
              style={
                hide === 'hide-on-med'
                  ? { marginBottom: 8 }
                  : { marginRight: 6 }
              }>
              <Link
                onClick={item.link === '/login' ? logout : undefined}
                to={item.link}
                target='_parent'
                className=' white-text indigo darken-3 waves-effect waves-black btn-medium btn hoverable'>
                {item.link === '/login'
                  ? 'Logout'
                  : item.link.slice(1, 2).toUpperCase() + item.link.slice(2)}
                {hide === 'hide-on-med' && (
                  <i className={`${hide} white-text small material-icons`}>
                    {item.icon}
                  </i>
                )}
              </Link>
            </li>
          )}
        </ul>
      ) : (
        <ul key={item.link} className={hide}>
          <li className=''>
            <Link
              to={item.link}
              target='_parent'
              className='  white-text indigo darken-3 waves-effect waves-black  btn btn-medium hoverable'>
              {item.link === '/'
                ? 'IT Logger'
                : item.link.slice(1, 2).toUpperCase() + item.link.slice(2)}
                  {hide === 'hide-on-med' && (
                  <i className={`${hide} white-text small material-icons`}>
                    {item.icon}
                  </i>
                )}
            </Link>
          </li>
        </ul>
      )
    );
  };

  return (
    <>
      <div className='navbar-fixed'>
        <nav className='row'>
          <div className='blue nav-wrapper valign-wrapper'>
            <Link to='#' data-target='slide-out' className='sidenav-trigger '>
              <i className='large material-icons'>menu</i>
            </Link>
            {renderLinks('left hide-on-med-and-down')}
            <Link to='/' className='brand-logo right '>
              <div className=' valign-wrapper center-align'>
                <i className='medium material-icons'>computer</i>
                <h4 className='navbar-title'>IT Logger</h4>
              </div>
            </Link>
          </div>
        </nav>
      </div>
      <div id='slide-out' className='sidenav grey'>
        {renderLinks('hide-on-med')}
      </div>
    </>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

Navbar.defaultProps = {
  title: 'IT Logger App',
  // icon: 'fas fa-id-card-alt'
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
