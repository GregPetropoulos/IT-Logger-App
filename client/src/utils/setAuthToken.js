//*Check to see if token is passed then set to global header if not then delete from global header
import api from './api'

// store our JWT in LS and set axios headers if we do have a token
const setAuthToken = token => {
  if(token){
      api.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
  }  else{
      delete api.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token')
  }
};
export default setAuthToken;