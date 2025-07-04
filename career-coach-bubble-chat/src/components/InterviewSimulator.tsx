import { useState } from "react";

export default function InterviewSimulator() {
  const [careerField, setCareerField] = useState("");
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleInterview(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("career_field", careerField);
    formData.append("goal", goal);
    formData.append("name", name || "User");
    const res = await fetch("http://localhost:8000/api/interview/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  async function handleDownloadPDF() {
    if (!result) return;
    const res = await fetch("http://localhost:8000/api/interview-pdf/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...result, name, career_field: careerField, goal }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mock_interview.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  function handleCopy() {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      alert("Copied to clipboard!");
    }
  }

  return (
    <div>
      <form className="space-y-3" onSubmit={handleInterview}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="w-full border rounded px-3 py-2" />
        <input value={careerField} onChange={e => setCareerField(e.target.value)} placeholder="Career Field" className="w-full border rounded px-3 py-2" />
        <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="Goal/Role" className="w-full border rounded px-3 py-2" />
        <button type="submit" disabled={loading} className="bg-purple-700 text-white px-4 py-2 rounded w-full">
          {loading ? "Generating..." : "Get Interview Qs"}
        </button>
      </form>
      {result && (
        <div className="mt-6 bg-white rounded shadow p-4">
          <div className="font-bold text-lg mb-2 text-purple-700">{result.intro}</div>
          <ol className="list-decimal pl-4 space-y-3">
            {result.questions?.map((q: any, i: number) => (
              <li key={i}>
                <div className="font-semibold">{q.question}</div>
                <div className="text-xs text-gray-500">Model Answer/Tip: {q.tip}</div>
              </li>
            ))}
          </ol>
          <div className="flex mt-6 space-x-2">
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded shadow"
              onClick={handleDownloadPDF}
              type="button"
            >
              Download as PDF
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded shadow" onClick={handleCopy}>
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
