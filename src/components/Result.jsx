export default function Result({ name, score, questions, onBack, onLeaderboard }) {
  return (
    <div className="quiz-container">
      <h2>{name}, your score is</h2>
      <h1>{score} / {questions.length}</h1>

      <div style={{textAlign:"left", maxHeight:"50vh", overflowY:"auto"}}>
        {questions.map((q, idx) => (
          <div key={idx} style={{marginBottom:"12px"}}>
            <p><b>Q{idx + 1}.</b> {q.question}</p>
            <p>Your answer: {q.userAnswer ?? "Skipped"}</p>
            <p>Correct answer: {q.options[q.correct]}</p>
            <p>Result: {q.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn primary" onClick={onBack}>⬅ Back to Dashboard</button>
        <button className="btn secondary" onClick={onLeaderboard}>Leaderboard</button>
      </div>
    </div>
  );
}
