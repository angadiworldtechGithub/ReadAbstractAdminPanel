import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();
  const [isStart, setStart] = useState(true);
  useEffect(() => {
    setStart(false);
    navigate("/dashboard");
  }, []);

  return <>{isStart ? <Spinner /> : "Login Page"}</>;
}
