import { useState } from "react";
import "./styles.css";

export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobAdText, setJobAdText] = useState("");
  const [outputType, setOutputType] = useState("Interview Notes");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeText,
        jobAdText,
        outputType,
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="title">
      <h1>Steevy</h1>
      <p>Use Steevy to help with your interview prep!</p>

</div>
<label for="resume"> Paste Resume Text </label>
      <textarea
      id = "resume"
        placeholder="Add Resume"
        onChange={(e) => setResumeText(e.target.value)}
      />

      <textarea
        placeholder="Paste Job Description"
        onChange={(e) => setJobAdText(e.target.value)}
      />
<div className="output-layout">
      <select className="output-select" onChange={(e) => setOutputType(e.target.value)}>
        <option>Interview Notes</option>
        <option>Interview Questions</option>
      </select>

      <button onClick={handleGenerate}>
        Generate
      </button>
      </div>

      {loading ? (
        <p>Generating…</p>
      ) : (
        <pre className="output">{result}</pre>
      )}
    </div>
  );
}
