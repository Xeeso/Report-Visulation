import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "features/auth/authState";
import "../assets/css/auth.css";

export default function Authentication() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authData, setAuthData] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await axios.get("http://localhost:4000/auth");
      if (response.status === 200) {
        setAuthData(response.data);
      }
    };

    fetchAuth();
  }, []);

  const onHandleSignUp = async (e) => {
    e.preventDefault();

    const nameExist = authData.find(
      (val) => val.name.toLowerCase() === name.toLowerCase()
    );
    const emailExist = authData.find(
      (val) => val.email.toLowerCase() === email.toLowerCase()
    );
    if (nameExist || emailExist) {
      setMessage(`Failed registration`);
      return;
    }

    const response = await axios.post("http://localhost:4000/auth", {
      id: data.auth.length + 1,
      name,
      email,
      password,
      role: "user",
      isAdmin: false,
    });
    dispatch(authentication(response.data));
    setMessage("");
  };

  const onHandleSignIn = async (e) => {
    e.preventDefault();

    const checkEmail =
      email !== "" &&
      authData.find((val) => val?.email.toLowerCase() === email.toLowerCase());
    const checkPassword =
      checkEmail &&
      password !== "" &&
      authData.find((val) => val?.password === password);

    if (!checkEmail || !checkPassword) {
      return setErrMsg("Login Failed");
    }

    const response = await axios.get(
      `http://localhost:4000/auth/${checkEmail.id}`
    );
    dispatch(authentication(response.data));
    setErrMsg("");
  };
  return (
    <div className="A">
      <div className={`container ${isRegister && "active"}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={onHandleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </Link>
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </div>
            <span>or use your email for registeration</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
            <button>Sign Up</button>
            <div className="box-message">{message}</div>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={onHandleSignIn}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </Link>
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </Link>
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link to={"/"} className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </Link>
            </div>
            <span>or use your email password</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <Link to={"/"}>Forget Your Password?</Link>
            <button>Sign In</button>

            <div className="box-message">{errMsg}</div>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button
                className="hidden"
                id="login"
                onClick={() => {
                  setIsRegister(false);
                }}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                className="hidden"
                id="register"
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
