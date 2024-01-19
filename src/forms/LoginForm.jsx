import React, { useState } from "react";
import { data } from "../data";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { users } = data;

  const checkUser = () => {
    const usercheck = users.find(
      (user) => user.email === email && user.password === password
    );
    if (usercheck) {
      localStorage.setItem("user", JSON.stringify(usercheck));
      localStorage.setItem("taskCreatedAt", new Date());

      navigate("/home");
    } else {
      setError("اسم المستخدم او  كلمة المرور خطأ");
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    checkUser();
  };

  return (
    <div>
      <div className="bg-form"> </div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />
        </div>
        <div className="form-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        {error ? <p className="error">{error}</p> : ""}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
