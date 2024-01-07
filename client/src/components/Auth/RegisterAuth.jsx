import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import {
  APIDOMAIN,
} from '../../vars';
  

const RegisterAuth = () => {
  const location = useLocation();
  const { search } = location;
  const { code } = queryString.parse(search);
  const [challengesData, setChallengesData] = useState('none');
  let bandera = true;

  useEffect(() => {
    const getUser = async () => {
      console.log('Authorization code');
      if (challengesData === 'none' && code) {
        try {
          console.log(code);
          const response = await fetch(
            `${APIDOMAIN}/authorized?code=${code}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                credentials: 'include',
              },
            },
          );

          const data = await response.json();
          setChallengesData(JSON.stringify(data.id_user));
        } catch (error) {
          console.error(
            'Error in the request:',
            error.response ? error.response.data : error.message,
          );
        }
      }
    };

    if (code && challengesData === 'none' && bandera) {
      bandera = false;
      getUser();
    }
  }, [code, challengesData]);

  return (
    <div>
      {challengesData !== 'none' ? <h5>Bienvenido {challengesData}</h5> : null}
    </div>
  );
};

export default RegisterAuth;
