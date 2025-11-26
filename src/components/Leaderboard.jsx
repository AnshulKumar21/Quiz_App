export default function Leaderboard({ onBack }) {
  const data = JSON.parse(localStorage.getItem("lb") || "[]");

  return (
    <div className="quiz-container">
      <h2>Leaderboard</h2>

      {data.length === 0 && <p>No quiz attempts yet.</p>}

      {data.length > 0 && (
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.category}</td>
                <td>{d.difficulty}</td>
                <td>{d.score}/{d.total}</td>
                <td>{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn back" onClick={onBack}>⬅ Back</button>
    </div>
  );
}
