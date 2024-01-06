import {
  DOMAIN,
  AUDIENCE,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  REDIRECT_URI,
} from '../../vars';

const auth0Register = async () => {
  const response = await fetch(
    `https://${DOMAIN}/authorize?` +
      `audience=${AUDIENCE}&` +
      `scope=${SCOPE}&` +
      `response_type=${RESPONSE_TYPE}&` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}redirect`,
    {
      redirect: 'manual',
    },
  );

  window.location.href = response.url;
};

export default auth0Register;
