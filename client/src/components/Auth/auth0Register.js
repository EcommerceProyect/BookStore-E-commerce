import {
  DOMAIN,
  AUDIENCE,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  REDIRECT_URI,
} from '../../vars';
import auth0 from 'auth0-js';

const auth0Register = async () => {
  try {
    let webAuth = new auth0.WebAuth({
      domain: `${DOMAIN}`,
      clientID: `${CLIENT_ID}`,
    });

    // Calculate URL to redirect to
    let url = webAuth.client.buildAuthorizeUrl({
      connection: null,
      clientID: `${CLIENT_ID}`,
      responseType: 'code',
      redirectUri: `${REDIRECT_URI}/redirect`,
      scope: `${SCOPE}`,
      audience: `${AUDIENCE}`,
    });

    window.location.replace(url);
  } catch (error) {
    console.error("Error during Auth0 login:", error);
  }
};

export default auth0Register;
