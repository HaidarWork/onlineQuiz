import { useEffect, useState } from "react";
import DateTimeDisplay from "../helper/DateTimeDisplay";
import { useCountdown } from "../helper/useCountdown";
import emailjs from "@emailjs/browser";

const Result = ({ quizResult, questions }) => {
  return (
    <div className="result">
      <h3>النتيجة النهائية: </h3>
      <p>
        عدد الاسئلة الكلي: <span>{questions.length}</span>
      </p>
      <p>
        النتجية:<span> {quizResult.score}</span>
        <span>من اصل 1000</span>
      </p>
      <p>
        الإجابات الصحيحة:<span> {quizResult.correctAnswers}</span>
      </p>
      <p>
        الإجابات الخاطئة:<span> {quizResult.wrongAnswers}</span>
      </p>
    </div>
  );
};

const ShowTimer = ({ hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <DateTimeDisplay
        value={seconds}
        type={"Seconds"}
        isDanger={minutes <= 30}
      />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} isDanger={minutes <= 30} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"hours"} isDanger={minutes <= 30} />
    </div>
  );
};

const Exam = ({ targetDate, questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [user, setUser] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [hours, minutes, seconds] = useCountdown(targetDate);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [answers, setAnswers] = useState([{ id: 0, state: false }]);

  const { question, choices, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    // const taskCreatedAt = localStorage.getItem("taskCreatedAt");
    // setTimePassed(Date.now() - Number(taskCreatedAt));
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const sendResult = (res) => {
    emailjs
      .send(
        "service_1sczfpn",
        "template_f35qcjl",
        {
          email: user.email,
          name: user.username,
          score: result.score,
          correctAnswer: result.correctAnswers,
          wrongAnswers: result.wrongAnswers,
          numOfquestions: questions.length,
        },
        "7KPTX0AshuZ9DJs4m"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const onClickNext = (e) => {
    e.preventDefault();
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    setAnswers((prev) =>
      selectedAnswer
        ? [
            ...prev,
            {
              id: answers[activeQuestion].id + 1,
              state: true,
            },
          ]
        : [...prev, { id: answers[activeQuestion].id + 1, state: false }]
    );
    console.log(answers);
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      const res = {
        score: result.score,
        correctAnswer: result.correctAnswers,
        wrongAnswers: result.wrongAnswers,
        numOfquestions: questions.length,
      };
      sendResult(res);
    }
  };

  const onClickPrev = () => {
    setSelectedAnswerIndex(null);
    setActiveQuestion((prev) => prev - 1);
    setResult((prev) =>
      answers[activeQuestion].state
        ? {
            ...prev,
            score: prev.score - 10,
            correctAnswers: prev.correctAnswers - 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers - 1 }
    );
    const updateAnswers = answers.filter(
      (answer) => answer.id !== activeQuestion
    );
    setAnswers(updateAnswers);
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  if (hours + minutes + seconds <= 0 || showResult) {
    return <Result quizResult={result} questions={questions} />;
  } else {
    return (
      <div className="quiz-container">
        <div className="row">
          <div className="row">
            <ShowTimer hours={hours} minutes={minutes} seconds={seconds} />
          </div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
        </div>
        <h2>
          {question.split("\n").map((line) => (
            <div key={line}>
              {line} <br />
            </div>
          ))}
        </h2>
        <ul>
          {choices.map((answer, index) => (
            <li
              onClick={() => onAnswerSelected(answer, index)}
              key={answer}
              className={
                selectedAnswerIndex === index ? "selected-answer" : null
              }
            >
              {answer}
            </li>
          ))}
        </ul>
        <div className="flex-right">
          <button
            onClick={onClickNext}
            disabled={selectedAnswerIndex === null}
            className="btn"
          >
            {activeQuestion === questions.length - 1 ? "انهاء" : "التالي"}
          </button>
          <button
            onClick={onClickPrev}
            disabled={activeQuestion === 0}
            className="btn"
          >
            السابق
          </button>
        </div>
      </div>
    );
  }
};

export default Exam;
