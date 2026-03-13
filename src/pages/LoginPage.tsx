import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../services/AuthService";

export default function LoginPage() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    const result = AuthService.login(username,password);

    if(result){

      alert("Login successful");

      const routes = {
        PATIENT: "/patient/dashboard",
        DOCTOR: "/doctor/dashboard",
        RECEPTIONIST: "/receptionist/dashboard"
      };

      navigate(routes[result.user.role]);

    }else{

      alert("Invalid username or password");

    }

  };

  return (

    <div className="container">

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>

    </div>

  );

}