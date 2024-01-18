import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img from "../assets/img/exam.png";
import logo from "../assets/img/logo.jpeg";
import Footer from "../component/Footer";
export default function HomePage() {
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
            <img src={logo} alt="logo" />
          </div>
          <div>
            <p className="user">{user.username}</p>
          </div>
          <div className="sectionSearch">
            <div className="searchBox">
              <p>Home Page</p>
            </div>
          </div>
        </div>
        <div className="firstSectinImage">
          <img src={img} alt="" />
        </div>
        <div className="firstSectionHeading">
          <h1>
            <span>مرحبا بك في امتحان </span> المدقق الداخلي
          </h1>
          <h1 className="letterSpacing">
            الجزء <span>الثاني</span>
          </h1>
          <button className="btnBuyNow">
            <NavLink to="/home/quiz">ابدأ الامتحان</NavLink>
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}
