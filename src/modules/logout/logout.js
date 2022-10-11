import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("auth");
    return null;
  }

  useEffect(() => {
    navigate("/login", { replace: true });
  });

  return <>{handleLogout()}</>;
}

export default Logout;
