import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

export default function Protect({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (token === "" && location.pathname !== "/") {
      navigate("/");
    } else if (token !== "" && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [token, location, navigate]);

  return <>{children}</>;
}
