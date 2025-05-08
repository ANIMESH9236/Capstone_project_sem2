import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link
} from "react-router-dom";
import "./App.css";

// Quiz question data
const cricketQuestions = [
  {
    question: "Who was the captain of Chennai Super Kings in their 2010 IPL win?",
    options: ["Michael Hussey", "MS Dhoni", "Suresh Raina", "Ravindra Jadeja"],
    answer: "MS Dhoni"
  },
  {
    question: "Which bowler has taken the most wickets in IPL history?",
    options: ["Lasith Malinga", "Amit Mishra", "Sunil Narine", "Bhuvneshwar Kumar"],
    answer: "Lasith Malinga"
  },
  {
    question: "Who scored the first century in IPL history?",
    options: ["Brendon McCullum", "Adam Gilchrist", "Virender Sehwag", "Chris Gayle"],
    answer: "Brendon McCullum"
  },
  {
    question: "How many overs are there in a One Day International (ODI) cricket match?",
    options: ["20", "40", "50", "60"],
    answer: "50"
  },
  {
    question: "How many runs is a boundary worth when the ball hits the ground before crossing the boundary line?",
    options: ["4", "5", "6", "7"],
    answer: "4"
  },
  {
    question: "What is the term used when a bowler dismisses three batsmen with consecutive deliveries?",
    options: ["Hat-trick", "Triple strike", "Threepeat", "Trifecta"],
    answer: "Hat-trick"
  },
  {
    question: "How many bails are used on a cricket wicket?",
    options: ["2", "4", "6", "8"],
    answer: "2"
  },
  {
    question: "What is the term for a score of zero by a batsman?",
    options: ["Duck", "Goose", "Swan", "Eagle"],
    answer: "Duck"
  },
  {
    question: "What is a “Century” in cricket?",
    options: ["Scoring 50 runs", "Scoring 100 runs", "Scoring 150 runs", "Scoring 200 runs"],
    answer: "Scoring 100 runs"
  },
  {
    question: "What does DRS stand for in cricket?",
    options: ["Decision Review System", "Direct Run Scoring", "Double Run System", "Drawn Result Scenario"],
    answer: "Decision Review System"
  }
];

const pythonQuestions = [
  {
    question: "Who developed Python Programming Language?",
    options: ["Wick van Rossum", "Rasmus Lerdorf", "Guido van Rossum", "Niene Stom"],
    answer: "Guido van Rossum"
  },
  {
    question: "Which type of Programming does Python support?",
    options: ["object-oriented", "structured", "functional", "all of the mentioned"],
    answer: "all of the mentioned"
  },
  {
    question: "Is Python case sensitive when dealing with identifiers?",
    options: ["no", "yes", "machine dependent", "none of the mentioned"],
    answer: "yes"
  },
  {
    question: "What is the output of print(2**3)?",
    options: ["6", "8", "9", "None of the mentioned"],
    answer: "8"
  },
  {
    question: "Which of the following is a built-in function in python?",
    options: ["factorial()", "print()", "seed()", "sqrt()"],
    answer: "print()"
  },
  {
    question: "Which function is used to get the length of a list in Python?",
    options: ["count()", "size()", "len()", "length()"],
    answer: "len()"
  },
  {
    question: "Which keyword is used for function in Python?",
    options: ["function", "def", "fun", "define"],
    answer: "def"
  },
  {
    question: "What does pip stand for python?",
    options: ["Pip Installs Python", "Pip Installs Packages", "Preferred Installer Program", "All of the mentioned"],
    answer: "Preferred Installer Program"
  },
  {
    question: "Which one of the following is not a keyword in Python language?",
    options: ["pass", "eval", "assert", "nonlocal"],
    answer: "eval"
  },
  {
    question: "What is the output of print('Hello {0} and {0}'.format(('foo', 'bin')))?",
    options: [
      "Hello (‘foo’, ‘bin’) and (‘foo’, ‘bin’)",
      "Error",
      "Hello foo and bin",
      "None of the mentioned"
    ],
    answer: "Hello (‘foo’, ‘bin’) and (‘foo’, ‘bin’)"
  }
];

const footballQuestions = [
  {
    question: "Which player scored the fastest hat-trick in the Premier League?",
    options: ["Cristiano Ronaldo", "Sadio Mane", "Alan Shearer", "Sergio Aguero"],
    answer: "Sadio Mane"
  },
  {
    question: "Which player, with 653 games, has made the most Premier League appearances?",
    options: ["Gareth Barry", "Ryan Giggs", "Frank Lampard", "Steven Gerrard"],
    answer: "Gareth Barry"
  },
  {
    question: "With 260 goals, who is the Premier League's all-time top scorer?",
    options: ["Wayne Rooney", "Thierry Henry", "Alan Shearer", "Harry Kane"],
    answer: "Alan Shearer"
  },
  {
    question: "Which team won the first Premier League title?",
    options: ["Chelsea", "Arsenal", "Manchester United", "Liverpool"],
    answer: "Manchester United"
  },
  {
    question: "Who won the 2018 FIFA World Cup?",
    options: ["Brazil", "France", "Germany", "Argentina"],
    answer: "France"
  },
  {
    question: "Who is the all-time leading goalscorer in FIFA World Cup history?",
    options: ["Miroslav Klose", "Pele", "Ronaldo", "Gerd Muller"],
    answer: "Miroslav Klose"
  },
  {
    question: "Which club has won the most UEFA Champions League titles?",
    options: ["Barcelona", "Bayern Munich", "AC Milan", "Real Madrid"],
    answer: "Real Madrid"
  },
  {
    question: "What is the maximum number of players allowed on the field in a football game?",
    options: ["9", "10", "11", "12"],
    answer: "11"
  },
  {
    question: "Who is known as 'CR7'?",
    options: ["Cristiano Ronaldo", "Carlos Rodriguez", "Cristian Romero", "Cristian Riveros"],
    answer: "Cristiano Ronaldo"
  },
  {
    question: "Which country has won the most World Cups?",
    options: ["Germany", "Italy", "Brazil", "Argentina"],
    answer: "Brazil"
  }
];

// Modal component
function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        {children}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </>
  );
}

// Quiz component
function Quiz({ questions, topic }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(score + 1);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
      // Save latest score to localStorage
      const finalScore = option === questions[current].answer ? score + 1 : score;
      localStorage.setItem(
        "latestQuizScore",
        JSON.stringify({
          topic,
          score: finalScore,
          total: questions.length,
          date: new Date().toLocaleString()
        })
      );
      setTimeout(() => {
        navigate("/score");
      }, 1000);
    }
  };

  return (
    <div className="modal">
      {!showResult ? (
        <>
          <h2>Question {current + 1} of {questions.length}</h2>
          <p>{questions[current].question}</p>
          <div>
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                className="quiz-option-btn"
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Quiz Complete!</h2>
          <p>Your score: {score} / {questions.length}</p>
          <p>Redirecting to score page...</p>
        </>
      )}
    </div>
  );
}

// Score Page
function ScorePage() {
  const navigate = useNavigate();
  // Read latest score from localStorage
  const latest = localStorage.getItem("latestQuizScore");
  let latestScore = null;
  if (latest) {
    latestScore = JSON.parse(latest);
  }

  if (!latestScore) {
    // If no quiz taken yet, redirect to home
    setTimeout(() => navigate("/"), 1000);
    return (
      <div className="score-page">
        <div className="modal">
          <h2>No quiz taken yet.</h2>
          <p>Redirecting to Home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="score-page">
      <div className="modal">
        <h2>Quiz Complete!</h2>
        <p>Topic: <b>{latestScore.topic.charAt(0).toUpperCase() + latestScore.topic.slice(1)}</b></p>
        <p>Your Score: <b>{latestScore.score} / {latestScore.total}</b></p>
        <p>Date: <b>{latestScore.date}</b></p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

// Home Page
function HomePage({ setShowLogin, setShowRegister, setQuizTopic }) {
  return (
    <main className="main-content">
      <div className="quiz-row">
        <div className="quiz-box">
          <h2>Cricket Quiz</h2>
          <button onClick={() => setQuizTopic("cricket")}>Start Quiz</button>
        </div>
        <div className="quiz-box">
          <h2>Python Quiz</h2>
          <button onClick={() => setQuizTopic("python")}>Start Quiz</button>
        </div>
        <div className="quiz-box">
          <h2>Football Quiz</h2>
          <button onClick={() => setQuizTopic("football")}>Start Quiz</button>
        </div>
      </div>
    </main>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [quizTopic, setQuizTopic] = useState(null);

  let quizQuestions = null;
  if (quizTopic === "cricket") quizQuestions = cricketQuestions;
  if (quizTopic === "python") quizQuestions = pythonQuestions;
  if (quizTopic === "football") quizQuestions = footballQuestions;

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">QuizMaster</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/score">Score Page</Link>
            <button onClick={() => setShowLogin(true)}>Login</button>
            <button onClick={() => setShowRegister(true)}>Register</button>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setShowLogin={setShowLogin}
                setShowRegister={setShowRegister}
                setQuizTopic={setQuizTopic}
              />
            }
          />
          <Route path="/score" element={<ScorePage />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          &copy; {new Date().getFullYear()} QuizMaster. All Rights Reserved.
        </footer>

        {/* Login Modal */}
        <Modal show={showLogin} onClose={() => setShowLogin(false)}>
          <h2>Login</h2>
          <form
            className="auth-form"
            onSubmit={e => {
              e.preventDefault();
              alert("Logged in!");
              setShowLogin(false);
            }}
          >
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </Modal>

        {/* Register Modal */}
        <Modal show={showRegister} onClose={() => setShowRegister(false)}>
          <h2>Register</h2>
          <form
            className="auth-form"
            onSubmit={e => {
              e.preventDefault();
              alert("Registered!");
              setShowRegister(false);
            }}
          >
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Register</button>
          </form>
        </Modal>

        {/* Quiz Modal */}
        {quizTopic && (
          <Quiz
            questions={quizQuestions}
            topic={quizTopic}
            // onClose is handled by redirecting after quiz
          />
        )}
      </div>
    </Router>
  );
}

export default App;
