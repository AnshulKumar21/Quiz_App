import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Leaderboard from "./components/Leaderboard";

export default function App() {

  const [step, setStep] = useState("dashboard");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("cs");
  const [difficulty, setDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);

  const start = () => {
    if (!name.trim()) return alert("Enter name");
    setStep("quiz");
  };

  const finish = (s, q) => {
    setScore(s);
    setData(q);

    const lb = JSON.parse(localStorage.getItem("lb") || "[]");
    lb.push({
      name,
      category,
      difficulty,
      score: s,
      total: q.length,
      date: new Date().toLocaleString()
    });
    localStorage.setItem("lb", JSON.stringify(lb));

    setStep("result");
  };

  return (
    <div className="app-root">

      {step === "dashboard" && (
        <Dashboard
          name={name}
          setName={setName}
          category={category}
          setCategory={setCategory}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onStart={start}
          onLeaderboard={() => setStep("leaderboard")}
        />
      )}

      {step === "quiz" && (
        <Quiz
          name={name}
          category={category}
          difficulty={difficulty}
          onBack={() => setStep("dashboard")}
          onFinish={finish}
        />
      )}

      {step === "result" && (
        <Result
          name={name}
          score={score}
          questions={data}
          onBack={() => setStep("dashboard")}
          onLeaderboard={() => setStep("leaderboard")}
        />
      )}

      {step === "leaderboard" && (
        <Leaderboard
          onBack={() => setStep("dashboard")}
        />
      )}

    </div>
  );
}
