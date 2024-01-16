import React, { useState } from "react";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { data } from "../data";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { user } = data;

  const checkUser = () => {
    const usercheck = user.find(
      (user) => user.username === username && user.password === password
    );
    if (usercheck) {
      console.log("Login successful");
      return usercheck;
    } else {
      console.log("Wrong password or username");
    }
    console.log(usercheck);
  };

  const handleUsername = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = checkUser();
    const hashedPassword = bcrypt.hash(password);

    try {
      // Hash the user's password and compare it to the stored hash
      const isMatch = bcrypt.compare(password, hashedPassword);
      if (!isMatch) {
        throw new Error("Incorrect password");
      }
      // Password is correct, generate a new JWT
      const token = jwt.sign({ username }, "secretKey", { expiresIn: "24h" });
      // Store the JWT in local storage
      localStorage.setItem("token", token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={username}
        onChange={handleUsername}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePassword}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
