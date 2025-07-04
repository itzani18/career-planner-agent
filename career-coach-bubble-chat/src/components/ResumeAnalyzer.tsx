import { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("resume_file", file);
    formData.append("career_field", ""); // User can set if needed
    const res = await fetch("http://localhost:8000/api/resume-analyze/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  function handleCopy() {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Copied to clipboard!");
    }
  }

  return (
    <div>
      <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleAnalyze} disabled={loading || !file} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
      {result && (
        <div className="mt-4 bg-white rounded shadow p-4">
          <div className="text-green-600">{result}</div>
          <div className="flex mt-4 space-x-2">
            <button className="bg-gray-200 px-4 py-2 rounded shadow" onClick={handleCopy}>
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
