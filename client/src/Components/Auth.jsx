import React, { useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import "./auth.css";
function Auth({ isLoggedIn, setisLoggedIn, user, setUser }) {
  const [wantToLogin, setwantToLogin] = useState();
  return (
    <>
      {wantToLogin ? (
        <Login
          stateChanger={setwantToLogin}
          wantToLogin={wantToLogin}
          isLoggedIn={isLoggedIn}
          stateChanger1={setisLoggedIn}
        />
      ) : (
        <SignUp stateChanger={setwantToLogin} wantToLogin={wantToLogin} />
      )}
    </>
  );
}
function Login({ wantToLogin, stateChanger, isLoggedIn, stateChanger1 }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function changeHandler(e) {
    e.preventDefault();
    stateChanger(!wantToLogin);
  }
  async function LoginHandler(e) {
    e.preventDefault();
    try {
      const res = await BackendCaller.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      stateChanger1(!isLoggedIn);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div class="login">
        <div class="form">
          <form class="login-form">
            <input
              className="text-[#fff]"
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="text-[#fff]"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="loginBtn button blue hollow"
              onClick={LoginHandler}
            >
              Login
            </button>
          </form>
          <button
            className="loginBtn button blue hollow"
            onClick={changeHandler}
          >
            SignUp
          </button>
        </div>
      </div>
    </>
  );
}
function SignUp({ wantToLogin, stateChanger }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function changeHandler(e) {
    e.preventDefault();
    stateChanger(!wantToLogin);
  }
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const res = await BackendCaller.post("/auth/register", {
        email,
        username,
        password,
      });
      console.log(res.data);
      changeHandler(e);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div class="login">
        <div class="form">
          <form class="login-form" action="index.html">
            <input
              className="text-[#fff]"
              type="text"
              placeholder="choose an username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="text-[#fff]"
              type="email"
              placeholder="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-[#fff]"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="loginBtn button blue hollow"
              onClick={handleSignUp}
            >
              SignUp
            </button>
          </form>
          <button
            className="loginBtn button blue hollow"
            onClick={changeHandler}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
export default Auth;
