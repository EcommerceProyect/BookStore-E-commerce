import React from 'react';
import {
  DOMAIN,
  AUDIENCE,
  SCOPE,
  CLIENT_ID,
  RESPONSE_TYPE,
  REDIRECT_URI,
} from '../../vars';

const auth0Login = async () => {
  const response = await fetch(
    `https://${DOMAIN}/authorize?` +
      `audience=${AUDIENCE}&` +
      `scope=${SCOPE}&` +
      `response_type=${RESPONSE_TYPE}&` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}`,
    {
      redirect: 'manual',
    },
  );

  window.location.replace(response.url);
};

export default auth0Login;
