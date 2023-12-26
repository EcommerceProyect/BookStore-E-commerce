
const LogoutButton = () => {
  const logout = async () => {
    const domain = "ambient-coder.us.auth0.com";
    const clientId = "V1mOd1KV60WmMBdH9Lgw8vWWCEH7koDY";
    const returnTo = "http://localhost:3000";

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
