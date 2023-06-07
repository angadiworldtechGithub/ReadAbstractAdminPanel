import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

export default function Protect({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "" && location !== "/") {
      navigate("/");
    } else if (token !== "" && location === "/") {
      navigate("/dashboard");
    }
  }, [token, location]);

  return <>{children}</>;
}
