import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { APIDOMAIN } from "../../vars";
const LoginAuth = () => {
  const location = useLocation();
  const { search } = location;
  const { code } = queryString.parse(search);
  const [challengesData, setChallengesData] = useState("none");
  let bandera = true;
  
  

  useEffect(() => {
    const getUser = async () => {
      console.log("Authorization code");
      if (challengesData === "none" && code && location.pathname !== "/redirect") {
        try {
          const response = await fetch(
            // `https://api-books-auth0.onrender.com?code=${code}&route=profile`,
            //`http://localhost:3001/authorized?code=${code}&route=profile`,
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
          localStorage.setItem("actualT",data.token);
        } catch (error) {
          console.error(
            'Error in the request:',
            error.response ? error.response.data : error.message
          );
        }
      }
    };

    if (code && challengesData === "none" && bandera) {
        bandera=false;
        getUser();
    }

  }, [code, challengesData]);

  return (
    <div className="Challenges-body">
        {challengesData !== "none" ?
        <h5 className="Content">Bienvenido {challengesData}</h5>:
        null    
        }
    </div>
  );
}

export default LoginAuth;
