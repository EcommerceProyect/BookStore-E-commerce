import auth0 from 'auth0-js';
import { DOMAIN, CLIENT_ID, REDIRECT_URI, SCOPE, AUDIENCE, RESPONSE_TYPE } from '../../vars';

const Auth0Login = async () => {
  try {
    let webAuth = new auth0.WebAuth({
      domain: `${DOMAIN}`,
      clientID: `${CLIENT_ID}`,
    });

    // Calculate URL to redirect to
    let url = webAuth.client.buildAuthorizeUrl({
      connection: null,
      clientID: `${CLIENT_ID}`,
      responseType: `${RESPONSE_TYPE}`,
      redirectUri: `${REDIRECT_URI}`,
      scope: `${SCOPE}`,
      audience: `${AUDIENCE}`,
    });

    window.location.replace(url);
  } catch (error) {
    console.error("Error during Auth0 login:", error);
  }
}

export default Auth0Login;
