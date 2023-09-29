import React, { useState, useEffect, Fragment } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";


const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });
  
// 使用useState管理組件 表單錯誤,遞交,使用者
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]:value,
    }));
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required for login";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required for login";
    }
    return error;
  };

  const loginHandler = (e) => {
    e.preventDefault();
    //const errors = validateForm(user);
    //setFormErrors(errors);
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (Object.keys(formErrors).length === 0) {
    //  setIsSubmit(true);
    //}
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:8081/login", user).then((res) => {
        alert(res.data);
        if(res.data == 'Success'){
          setUserState(res.data.user);
        navigate("/MainPage", { replace: true });}
        
      });
    }
  }, [formErrors]);
  return (
    <Fragment>
      <div className = {loginstyle.container}>
        <header>
          <h1>InstAi</h1> 
        </header>
        <div className={loginstyle.login}>
          <form>
            <legend>Sign In</legend>
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={changeHandler}
              value={user.email}
            />
            <p className={basestyle.error}>{formErrors.email}</p>
            <label>Password</label>
            <input 
              type="password"
              name="password"
              id="password"
              onChange={changeHandler}
              value={user.password}
            />
            <p className={basestyle.error}>{formErrors.password}</p>
            <button className={basestyle.button_common} onClick={loginHandler}>
                SIGN IN
            </button>
            <NavLink className={loginstyle.NavLink} to="/">Create a new account</NavLink>
          </form>

        </div>
        <div className = {loginstyle.email}>Have questions? Send email to <b>support@instai.co</b></div>
      </div>
    </Fragment>
  );
};
export default Login;
