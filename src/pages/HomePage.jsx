import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/img/exam.png";
import logo from "../assets/img/logo.jpeg";
import Footer from "../component/Footer";
import { data } from "../data";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function HomePage() {
  // const history = useHistory();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { questions } = data;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = () => {
    const shuflledQuestions = shuffle(questions);
    navigate("/home/quiz", { state: shuflledQuestions });
  };

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
          <button className="btnBuyNow" onClick={handleClick}>
            {/* <Link
              to={{
                pathname: `/home/quiz`,
                state: shuflledQuestions,
              }}
            > */}
            ابدأ الامتحان
            {/* </Link> */}
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}
