export default function Dashboard({
  name,
  setName,
  category,
  setCategory,
  difficulty,
  setDifficulty,
  onStart,
  onLeaderboard,
}) {
  return (
    <div className="quiz-container">
      <h1 className="title">Quiz Dashboard</h1>

      <div className="form-group">
        <label>Your Name</label>
        <input
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Select Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="cs">Computer Science</option>
          <option value="aptitude">Aptitude</option>
        </select>
      </div>

      <div className="form-group">
        <label>Select Difficulty</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="btn-row">
        <button className="btn primary" onClick={onStart}>
          Start Quiz
        </button>
        <button className="btn secondary" onClick={onLeaderboard}>
          Leaderboard
        </button>
      </div>
    </div>
  );
}
