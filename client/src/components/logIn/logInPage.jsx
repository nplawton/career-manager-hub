import React, { useState } from "react";
import './loginPage.css'
import galvanizeLogo from './galvanizeLogo.webp'

const LogInPage = ({ handleLogin }) => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorRelay, setErrorRelay] = useState("");

  async function loginUser(email, password) {
    try {
      const response = await fetch("http://localhost:8000/managers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response) {
        throw new Error("Invalid email or password");
      }

      const responseData = await response.json();

      if (responseData.success) {
        console.log("Login successful:", responseData);
        handleLogin(responseData); // Call the handleLogin function passed as a prop
      } else {
        setErrorRelay(responseData.message);
      }
    }
    catch (error) {
      console.error(error)
      setErrorRelay("get out of here imposter 😠");
    }
  }

  const handleUserLogin = (e) => {
    e.preventDefault();
    loginUser(email, pass);
  };

  return (
    <div className="login-background">
      <form className="login-Container" onSubmit={handleUserLogin}>
      <img src={galvanizeLogo} ></img>
        <input
          className="login-value"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="YourEmail@galvanize.com"
          id="email">
        </input>
        <input
          className="login-value"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
        ></input>
        <button className="login-button">log in</button>
        {errorRelay && <p className="error-message">{errorRelay}</p>}
      </form>
    </div>
  );
}
export default LogInPage;