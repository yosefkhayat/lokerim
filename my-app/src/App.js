import React, { useState, useEffect } from "react";
import "./styles.css";

const questions = [
  {
    question: "מהו המספר שמופיע תמיד בתחילת מספר המנעול?",
    options: ["A", "B", "P", "L"],
    correctAnswer: 2,
    image: "https://smart.lockerim.co.il/wp-content/uploads/2023/07/תמונה.png",
  },
  {
    question: "מה עושים אם התלמיד החליף מספר טלפון ולא מצליח להתחבר לאפליקציה?",
    options: [
      "מתקינים מחדש את האפליקציה",
      "מעדכנים את מספר הטלפון במערכת",
      "פותחים קריאת שירות",
      "מחליפים את המנעול",
    ],
    correctAnswer: 1,
    image:
      "https://https://smart.lockerim.co.il/wp-content/uploads/2023/07/תמונה.png.com/phone-app.jpg", // החלף בתמונה של אפליקציית Lockerim
  },
  {
    question:
      "מה הצעד הראשון שיש לעשות אם התלמיד לוחץ על כפתור המנעול והוא לא נדלק?",
    options: [
      "להחליף סוללה",
      "לפתוח קריאת שירות",
      "לבקש מהתלמיד לשלוח סרטון לוואטסאפס (גלאסיקס)",
      "להתקין מחדש את האפליקציה",
    ],
    correctAnswer: 2,
    image: "https://example.com/lock-not-working.jpg", // החלף בתמונה של מנעול כבוי
  },
  {
    question: "מה עושים אם התלמיד נעל את הטלפון בתוך הלוקר?",
    options: [
      "פותחים קריאת שירות דחופה",
      "מבקשים מהתלמיד להתחבר לאפליקציה מהנייד של חבר, במקביל לבקש מהאחמש את הקוד אימות",
      "שולחים טכנאי לפתוח את הלוקר",
      "מבטלים את ההזמנה של התלמיד",
    ],
    correctAnswer: 1,
  },
  {
    question: "מה העלות של החלפת מנעול חכם במקרה של גניבה או אובדן?",
    options: ['100 ש"ח', '150 ש"ח', '175 ש"ח', '200 ש"ח'],
    correctAnswer: 2,
  },
  {
    question:
      "מה יש לעשות אם המנעול נפתח אבל הלקוח לא מצליח למשוך אותו החוצה מהוו נעילה?",
    options: [
      "לפתוח קריאת שירות",
      "להחליף את המנעול",
      "להנחות אותו למשוך את המנעול בחוזקה",
      "להתקין מחדש את האפליקציה",
    ],
    correctAnswer: 2,
  },
  {
    question: "מה הצעד הראשון בטיפול בתקלת PUF או PLF?",
    options: [
      "פתיחת קריאת שירות",
      "החלפת סוללה",
      "לבקש מהתלמיד להתנתק ולהתחבר מחדש לאפליקציה",
      "שליחת טכנאי",
    ],
    correctAnswer: 2,
  },
  {
    question: "מה יש לעשות אם הבלוטוס לא מתחבר למנעול?",
    options: [
      "להחליף את המנעול",
      "לוודא שהבלוטוס והמיקום במכשיר פעילים ושאישרו את הגישה לכל השירותים בהתקנת האפליקציה",
      "לפתוח קריאת שירות מיידית",
      "להתקין גרסה ישנה יותר של האפליקציה",
    ],
    correctAnswer: 1,
  },
  {
    question: "איזה מידע חשוב לתעד בקריאת שירות במקרה של בעיית בלוטוס?",
    options: [
      "שם התלמיד",
      "מספר הלוקר",
      "סוג המכשיר, דגם וגרסת מערכת ההפעלה",
      "זמן ההתקנה של האפליקציה",
    ],
    correctAnswer: 2,
  },
  {
    question: "מה יש לעשות אם הוו או הדלת תקולים?",
    options: [
      "להחליף מיידית את המנעול",
      "לבקש מהתלמיד לשלוח תמונה",
      "לשלוח טכנאי ללא בדיקה",
      "להתעלם מהבעיה",
    ],
    correctAnswer: 1,
  },
  {
    question: "האם יש אחריות במקרה של חוט אבטחה קרוע?",
    options: [
      "כן, תמיד",
      "לא, אין אחריות במקרה זה",
      "רק אם זה קרה בחודש הראשון",
      "תלוי בנסיבות",
    ],
    correctAnswer: 1,
  },
  {
    question: "מה התפקיד של החוט באבטחת המנעול?",
    options: [
      "לחבר את המנעול לטלפון",
      "למנוע גניבה של המנעול",
      "לשמור על המנעול שלא ייפול",
      "לשפר את קליטת הבלוטוס",
    ],
    correctAnswer: 2,
  },
  {
    question: "איך פותחים את הלוקר אם נעלו את הטלפון בפנים?",
    options: [
      "אי אפשר לפתוח",
      "רק טכנאי יכול לפתוח",
      "משתמשים בקוד חירום",
      "משתמשים בטלפון של חבר ובקוד מהמערכת",
    ],
    correctAnswer: 3,
  },
  {
    question: "מה יש לעשות אם התלמיד מבקש להחליף לוקר?",
    options: [
      "לסרב מיידית",
      "להחליף ללא שאלות",
      "לבקש מהתלמיד למלא טופס החלפה",
      "לשלוח טכנאי לבדוק את הלוקר",
    ],
    correctAnswer: 2,
  },
  {
    question: "מה קורה אם אין לוקר פנוי להחלפה?",
    options: [
      "מבטלים את המנוי של התלמיד",
      "נותנים החזר כספי",
      "מוסיפים את התלמיד לרשימת המתנה",
      "מבקשים מהתלמיד לחכות עד השנה הבאה",
    ],
    correctAnswer: 2,
  },
];

const LockerimQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);
  const [username, setUsername] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (quizStarted && timer > 0 && !showScore && !showFeedback) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0 && !showFeedback) {
      handleNextQuestion();
    }
  }, [timer, quizStarted, showScore, showFeedback]);

  const handleStartQuiz = () => {
    if (username.trim() !== "") {
      setQuizStarted(true);
    } else {
      alert("אנא הכנס את שמך לפני תחילת החידון!");
    }
  };

  const handleAnswerClick = (answerIndex) => {
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setShowFeedback(false);
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(30);
    } else {
      setShowScore(true);
    // Send POST request with username and score as JSON
    fetch('https://lokerim.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, score }),
    })
      console.log("dd:",score);
      console.log(username);
    }
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h1>ברוכים הבאים לחידון המנעול החכם של Lockerim!</h1>
        <input
          type="text"
          placeholder="הכנס את שמך"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="name-input"
        />
        <button onClick={handleStartQuiz} className="start-button">
          התחל את החידון
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>סיימת את החידון!</h2>
          <p>
            הציון שלך הוא {score} מתוך {questions.length}
          </p>
        </div>
      ): (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>שאלה {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].question}
            </div>
          </div>
          {showFeedback ? (
            <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
              {isCorrect ? (
                <p>כל הכבוד! תשובה נכונה! 🎉</p>
              ) : (
                <div>
                  <p>אופס! זו לא התשובה הנכונה 😕</p>
                  <p>
                    התשובה הנכונה היא:{" "}
                    {
                      questions[currentQuestion].options[
                        questions[currentQuestion].correctAnswer
                      ]
                    }
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="answer-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className="answer-button"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          <div className="timer">זמן נותר: {timer} שניות</div>
        </>
      )}
    </div>
  );
};

export default LockerimQuiz;
