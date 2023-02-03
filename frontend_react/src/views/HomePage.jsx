import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const username = location.state ? location.state.email : "";

  return (
    <div>
      <h1>Welcome {username}!</h1>
      <p>You are now logged in.</p>
    </div>
  );
};

export default HomePage;
