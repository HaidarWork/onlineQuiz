import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import Exam from "../component/Exam";
import { data } from "../data";

export default function QuizPage() {
  const thirty_MS = 2 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const timer = NOW_IN_MS + thirty_MS;
  const { questions } = data;
  const [timePassed, setTimePassed] = useState();

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const taskCreatedAt = localStorage.getItem("taskCreatedAt");
    setTimePassed(Date.now() - Number(taskCreatedAt));
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      navigate("/login");
    }

    if (timePassed > 3 * 60 * 60 * 1000) {
      localStorage.removeItem("user");
    }
  }, [navigate, timePassed, timer]);
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
              <p>CIA part 2 test</p>
            </div>
          </div>
        </div>
        <Exam targetDate={timer} questions={questions} />
      </div>
    </main>
  );
}
