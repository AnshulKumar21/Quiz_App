import { useEffect, useState } from "react";
import { questionBank } from "../data/questions";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function Quiz({ name, category, difficulty, onBack, onFinish }) {

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pool = questionBank[category]?.[difficulty] || [];

    const ten = shuffle(pool).slice(0, 10).map(q => ({
      ...q,
      userAnswer: null,
      isCorrect: null
    }));

    setQuestions(ten);
    setLoading(false);
  }, [category, difficulty]);

  // SAVE ANSWER FUNCTION
  const saveAnswer = () => {
    const updated = [...questions];
    const q = updated[current];

    if (!selected) {
      // skip allowed
      updated[current] = { ...q, userAnswer: null, isCorrect: null };
    } else {
      const idx = q.options.indexOf(selected);
      const correct = idx === q.correct;
      updated[current] = { ...q, userAnswer: selected, isCorrect: correct };
    }

    setQuestions(updated);
  };

  // NEXT BUTTON
  const next = () => {
    saveAnswer();

    if (current === questions.length - 1) {
      // CALCULATE SCORE
      const score = questions.reduce((sum, q) => sum + (q.isCorrect ? 1 : 0), 0);
      onFinish(score, questions);
    } else {
      setCurrent(current + 1);
      setSelected(questions[current + 1]?.userAnswer || "");
    }
  };

  // PREV BUTTON ✅
  const prev = () => {
    if (current === 0) return;

    setCurrent(current - 1);
    setSelected(questions[current - 1]?.userAnswer || "");
  };

  // LOAD STATE
  if (loading) {
    return (
      <div className="quiz-container">
        <button className="btn back" onClick={onBack}>⬅ Back</button>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="quiz-container">
        <button className="btn back" onClick={onBack}>⬅ Back</button>
        <p>No questions available.</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <button className="btn back" onClick={onBack}>⬅ Back</button>

      <h2>{name} — {category.toUpperCase()} ({difficulty.toUpperCase()})</h2>
      <p>Question {current + 1} / {questions.length}</p>

      <p className="question-text">{q.question}</p>

      <ul>
        {q.options.map(option => (
          <li key={option}>
            <label>
              <input
                type="radio"
                checked={selected === option}
                onChange={() => setSelected(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"
      }}>
        <button
          className="btn secondary"
          onClick={prev}
          disabled={current === 0}
        >
          ⬅ Prev
        </button>

        <button
          className="btn primary"
          onClick={next}
        >
          {current === questions.length - 1 ? "Finish" : "Next / Skip ➡"}
        </button>
      </div>

    </div>
  );
}
