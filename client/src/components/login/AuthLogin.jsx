import React from 'react';

const AuthLogin = async () => {
  const domain = 'dev-wf8xlazxrpkoi322.us.auth0.com';

  const audience = 'https://api-test-auth0.com';

  const scope = 'admin:edit';
  const clientId = 'd3JFxEtEZ8M2k4yGciCYv0KBdIylNBB2';

  const response_type = 'code';
  const redirectUri = 'http://localhost:5173';
  const response = await fetch(
    `https://${domain}/authorize?` +
      `audience=${audience}&` +
      `scope=${scope}&` +
      `response_type=${response_type}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`,
    {
      redirect: 'manual',
    },
  );

  window.location.replace(response.url);
};

export default AuthLogin;
