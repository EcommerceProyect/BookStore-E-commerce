import React from "react";

const LogginButton = () => {
    const loggin = async () => {

        const domain = "dev-sxyz47kmh4sumndv.us.auth0.com";

        const audience= "http://localhost:5432";

        const scope = "admin:admin";
        const clientId= "ihbSNJFDpF9CgJC47ykNSKevrzVkb2OR";

        const response_type = "code";
        const redirectUri = "http://localhost:5173/challenges";

        const response = await fetch(
            `https://${domain}/authorize?` +
            `audience=${audience}&` +
            `scope=${scope}&` +
            `response_type=${response_type}&` +
            `client_id=${clientId}&` +
            `redirect_uri=${redirectUri}`, {
            redirect: "manual"
        });
        
        window.location.replace(response.url);
    };

    return(
        <button onClick={() => loggin()}>
            Loggin
        </button>
    )
}

export default LogginButton;