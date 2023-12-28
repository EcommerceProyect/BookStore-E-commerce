
const LogoutButton = () => {
  const logout = async () => {
    const domain = "dev-s3pcs1ovog464bay.us.auth0.com";
    const clientId = "V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY";
    const returnTo = "http://localhost:5173";

    const response = await fetch(
      `https://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
      { redirect: "manual" }
    );

    window.location.replace(response.url);
  };

  return (
    <button className="Login-button" onClick={() => logout()}>
      Log out
    </button>
  );
};

export default LogoutButton;
