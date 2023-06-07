import axios from "axios";
import { useContext, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = async () => {
    try {
      const {
        data: { token },
      } = await axios.post(`${process.env.REACT_APP_API_URL}/adminsignin`, {
        email,
        password,
      });
      setToken(token);
      navigate("/dashboard");
    } catch (error) {
      alert("Cannot Sign In");
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <Button onClick={onLogin}>Login</Button>
    </>
  );
}
