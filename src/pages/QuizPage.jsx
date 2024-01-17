import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../component/Quiz";
import logo from "../assets/img/logo.jpeg";

export default function QuizPage() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="logo">
            <img src={logo} alt="logo" className="" />
          </div>
          <div>
            <p className="user">{user.username}</p>
          </div>
          <div className="sectionSearch">
            <div className="searchBox">
              <p>Quiz Page</p>
            </div>
          </div>
        </div>
        <Quiz />
      </div>
    </main>
  );
}
