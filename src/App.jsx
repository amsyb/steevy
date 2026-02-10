import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./styles.css";
import logo from "./assets/steevy-logo.svg";
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
        <img src={logo} alt="steevy-logo" />
      <h4>Your AI coach for interview prep</h4>
</div>
<div className="input">
<label htmlFor="resume" className="input-label"> Paste Resume Text </label>
      <textarea
      className="input-field"
      id = "resume"
        placeholder="Add Resume"
        onChange={(e) => setResumeText(e.target.value)}
      />
      </div>
      <div className="input">
      <label className="input-label" htmlFor="job-desc"> Paste Job Description </label>
      <textarea
      className="input-field"
      id="job-desc"
        placeholder="Paste Job Description"
        onChange={(e) => setJobAdText(e.target.value)}
      />
      </div>
<div className="dropdown">
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
) : result ? (
  <div className="output">
    <ReactMarkdown>{result}</ReactMarkdown>
  </div>
) : null}
    </div>
  );
}