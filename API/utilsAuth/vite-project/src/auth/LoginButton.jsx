const LoginButton = () => {
  const login = async () => {
    const domain = "dev-s3pcs1ovog464bay.us.auth0.com";

    const audience= "https://www.protectAPI.com";

    const scope = "admin:edit";
    const clientId= "V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY";

    const response_type = "code";
    
    const redirectUri = "http://localhost:5173/redirect";
    
    const response = await fetch(
      `https://${domain}/authorize?` + 
      `audience=${audience}&` + 
      `scope=${scope}&` +
      `response_type=${response_type}&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}`, {
        redirect: "manual"
      }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => login()}>
      Log In
    </button>
  );
};

export default LoginButton;
