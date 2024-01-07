import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/slices/userData";
import { APIDOMAIN } from '../../vars';

const LoginAuth = () => {
  const location = useLocation();
  const { search } = location;
  const { code } = queryString.parse(search);
  const [challengesData, setChallengesData] = useState("none");
  let bandera = true;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);

  useEffect(() => {
    const getUser = async () => {
      if (challengesData === "none" && code && location.pathname !== "/redirect") {
        try {
          const response = await fetch(
            `${APIDOMAIN}/authorized?code=${code}&route=profile`,
            {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                credentials: 'include',
              },
            }
          );

          const data = await response.json();
          setChallengesData(data.response.name);
          console.log(data);
          localStorage.setItem("actualT",data.token);
          localStorage.setItem("actualT", data.token);
          const decodedToken = jwtDecode(data.token); //decodifico el token de local storage
          dispatch(setUserData(decodedToken)); //lo guardo en el estado global userData
        } catch (error) {
          console.error(
            'Error in the request:',
            error.response ? error.response.data : error.message
          );
        }
      }
    };

    if (code && challengesData === "none" && bandera) {
      bandera = false;
      getUser();
    }

    // Hago la comprobación cada vez que se recarga la página
    const storedToken = localStorage.getItem("actualT");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      dispatch(setUserData(decodedToken));
    }
  }, [code, challengesData, location.pathname, dispatch]);

  return (
    <div className="Challenges-body">
      {challengesData !== "none" ?
        <h5 className="Content">Bienvenido {challengesData}</h5> :
        null
      }
    </div>
  );
};

export default LoginAuth;
