import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { BsPerson } from "react-icons/bs";
import { CgPassword } from "react-icons/cg";
import api from "../../api";
import "./Login-up.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [password2Valid, setPassword2Valid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    api
      .post("token/", {
        email: email,
        password: password,
      })
      .then((response) => {
        const storage = localStorage;
        const expiredTime = Date.parse(response.headers.date) + 60000;
        // Set localStorage
        storage.setItem("access.doubleshy0n", response.data.access);
        storage.setItem("refresh.doubleshy0n", response.data.refresh);
        storage.setItem("expiredTime.doubleshy0n", expiredTime);
        storage.setItem("email.doubleshy0n", email);
        // Jump to the home page
        navigate("/", { state: { email } });

        console.log("login success");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (!passwordValid) {
      alert(
        "密码至少包含 8 个字符，并且必须包含至少一个小写字母、一个大写字母、一个数字和一个特殊字符"
      );
    } else if (password !== password2) {
      alert("两次输入的密码不一致！");
    } else {
      api
        .post("users/", {
          email: email,
          name: username,
          password: password,
        })
        .then((response) => {
          setIsLoggedIn(true);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let id = event.target.id;

    validate(id, value);
  };

  const validate = (id, value) => {
    switch (id) {
      case "email":
        setEmail(value);

        if (value === "") {
          setEmailValid(false);
        } else {
          setEmailValid(re.test(String(value).toLowerCase()));
        }
        break;
      case "username":
        setUsername(value);

        if (value === "") {
          setUsernameValid(false);
        } else {
          setUsernameValid(true);
        }
        break;
      case "password":
        setPassword(value);

        if (value === "") {
          setPasswordValid(false);
        } else {
          setPasswordValid(passwordRegex.test(value));
        }
        break;
      case "password2":
        setPassword2(value);

        if (value === "") {
          setPassword2Valid(false);
        } else {
          setPassword2Valid(passwordRegex.test(value));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="login__page">
      <form
        className="login__login-item"
        onSubmit={isLoggedIn ? handleLoginSubmit : handleSignupSubmit}
      >
        {/* title */}
        <p
          className={isLoggedIn ? "login__title" : "login__title signup__title"}
        >
          {isLoggedIn ? "Login" : "Sign up"}
        </p>

        {/* email */}
        <div className="login__input-box">
          <input
            id="email"
            type="text"
            className="login__input"
            value={email}
            onChange={handleChange}
            style={{
              border: emailValid
                ? "1px solid #7396ff"
                : !email
                ? "1px solid rgba(0, 0, 0, 0.05)"
                : "1px solid #ff0000",
            }}
          />
          <label
            htmlFor="email"
            className="login__text"
            style={{
              opacity: email || emailValid ? "0" : "1",
            }}
          >
            <HiOutlineMail className="icon" /> Email
          </label>
        </div>

        {/* username */}
        {isLoggedIn ? (
          ""
        ) : (
          <div className="login__input-box">
            <input
              id="username"
              type="text"
              className="login__input"
              value={username}
              onChange={handleChange}
              style={{
                border: usernameValid
                  ? "1px solid #7396ff"
                  : "1px solid rgba(0, 0, 0, 0.05)",
              }}
            />
            <label
              htmlFor="username"
              className="login__text"
              style={{ opacity: usernameValid ? "0" : "1" }}
            >
              <BsPerson className="icon" /> Username
            </label>
          </div>
        )}

        {/* password */}
        <div className="login__input-box">
          <input
            id="password"
            type="password"
            className="login__input"
            value={password}
            onChange={handleChange}
            style={{
              border: passwordValid
                ? "1px solid #7396ff"
                : !password
                ? "1px solid rgba(0, 0, 0, 0.05)"
                : "1px solid #ff0000",
            }}
          />
          <label
            htmlFor="password"
            className="login__text"
            style={{ opacity: password || passwordValid ? "0" : "1" }}
          >
            <CgPassword className="icon" /> Password
          </label>
        </div>

        {/* password2 */}
        {isLoggedIn ? (
          ""
        ) : (
          <div className="login__input-box">
            <input
              id="password2"
              type="password"
              className="login__input"
              value={password2}
              onChange={handleChange}
              style={{
                border: password2Valid
                  ? "1px solid #7396ff"
                  : !password2
                  ? "1px solid rgba(0, 0, 0, 0.05)"
                  : "1px solid #ff0000",
              }}
            />
            <label
              htmlFor="password2"
              className="login__text"
              style={{ opacity: password2 || password2Valid ? "0" : "1" }}
            >
              <CgPassword className="icon" /> Confirm Password
            </label>
          </div>
        )}

        {/* button */}
        <button
          type="submit"
          className={
            isLoggedIn ? "login__button" : "login__button signup__button"
          }
        >
          <span className="login__button-text">
            {isLoggedIn ? "Login" : "Sign up"}
          </span>
        </button>

        {/* bottom text */}
        <div
          className={
            isLoggedIn
              ? "login__bottom-text"
              : "login__bottom-text signup__bottom-text"
          }
        >
          <span className="login-bottom-left">
            {isLoggedIn
              ? "Don't have an account ?"
              : "Already have an account ?"}
          </span>
          <span
            className="login-bottom-right"
            onClick={() => {
              setIsLoggedIn(!isLoggedIn);
            }}
          >
            {isLoggedIn ? "Sign up" : "Sign in"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
