import auth0 from 'auth0-js';

import {
  DOMAIN,
  CLIENT_ID,
  REDIRECT_URI,
} from '../../vars';

const handleLogout = () => {
  localStorage.clear();
  const webAuth = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENT_ID,
  });

  webAuth.logout({
    returnTo: REDIRECT_URI,
    clientID: CLIENT_ID,
  });
};

export default handleLogout;
