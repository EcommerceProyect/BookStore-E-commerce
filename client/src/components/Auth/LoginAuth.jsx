import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/slices/userData';
import { APIDOMAIN } from '../../vars';
import { fetchUserData } from '../../redux/services/userData';

const LoginAuth = ({ setToast }) => {
  const location = useLocation();
  const { search } = location;
  const { code } = queryString.parse(search);
  const [challengesData, setChallengesData] = useState('none');
  let bandera = true;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);

  useEffect(() => {
    const getUser = async () => {
      if (challengesData === 'none' && location.pathname !== '/redirect') {
        try {
          const token = localStorage.getItem('actualT');

          const queryToken = token ? `token=${token}` : `code=${code}`;

          const response = await fetch(
            `${APIDOMAIN}/authorized?${queryToken}&route=profile`,
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
          console.log(data)
          setChallengesData(data.response.name);
          if (data !== null || data !== "none") {
            setToast("success", "La sesión fue iniciada correctamente")
          }
          console.log('Data user: ', data);
          localStorage.setItem('actualT', data.token);
        } catch (error) {
          console.error(
            'Error in the request:',
            error.response ? error.response.data : error.message,
          );
          setToast("error", "Hubo un error iniciando la sesión, porfavor intente nuevamente.")
        }
      }
    };

    if (code && challengesData === 'none' && bandera) {
      bandera = false;
      getUser();
    }

    // Hago la comprobación cada vez que se recarga la página
    const token = localStorage.getItem('actualT');
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [code, challengesData, location.pathname, dispatch]);

  return (
    <div className="Challenges-body">
      {challengesData !== 'none' && challengesData !== null ? (
        <h5 className="Content text-textLight">Bienvenido {challengesData}</h5>
      ) : null}
    </div>
  );
};

export default LoginAuth;
