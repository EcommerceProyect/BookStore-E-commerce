import React from "react";

const LogoutButton = () => {
    const logout = async () => {
        const domain = "dev-sxyz47kmh4sumndv.us.auth0.com";
        const clientId= "ihbSNJFDpF9CgJC47ykNSKevrzVkb2OR";
        const returnTo = "http://localhost:5173/";

        const response = await fetch(
            `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
            {redirect:"manual"}
            );

        window.location.replace(response.url);
    };

    return(
        <button onClick={() => logout()}>
            Logout
        </button>
    )
}

export default LogoutButton;