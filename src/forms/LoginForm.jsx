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
      console.log("Login successful");
      localStorage.setItem("user", JSON.stringify(usercheck));
      console.log("woooooooooooooooooooooooooooooow");
      navigate("/home");
    } else {
      setError("Wrong password or username");
    }
    console.log(usercheck);
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
    // const hashedPassword = bcrypt.hash(password);

    // try {
    //   // Hash the user's password and compare it to the stored hash
    //   const isMatch = bcrypt.compare(password, hashedPassword);
    //   if (!isMatch) {
    //     throw new Error("Incorrect password");
    //   }
    //   // Password is correct, generate a new JWT
    //   const token = jwt.sign({ username }, "secretKey", { expiresIn: "24h" });
    //   // Store the JWT in local storage
    //   localStorage.setItem("token", token);
    // } catch (error) {
    //   console.error(error);
    // }
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
        {error ? error : ""}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
