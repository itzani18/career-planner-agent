import { useState } from "react";

export default function SkillGapAnalyzer() {
  const [userSkills, setUserSkills] = useState("");
  const [careerField, setCareerField] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    const formData = new FormData();
    formData.append("user_skills", userSkills);
    formData.append("career_field", careerField);
    const res = await fetch("http://localhost:8000/api/skill-gap/", {
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
      <input value={userSkills} onChange={e => setUserSkills(e.target.value)} placeholder="Your skills (comma separated)" className="w-full border rounded px-3 py-2 mb-2" />
      <input value={careerField} onChange={e => setCareerField(e.target.value)} placeholder="Career field" className="w-full border rounded px-3 py-2 mb-2" />
      <button onClick={handleAnalyze} disabled={loading} className="bg-orange-600 text-white px-4 py-2 rounded">
        {loading ? "Loading..." : "Analyze"}
      </button>
      {result && (
        <div className="mt-4 bg-white rounded shadow p-4">
          <div>{result}</div>
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
