import { useState } from "react";

function renderRoadmap(result: any) {
  if (!result || typeof result === "string") return null;
  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-purple-700">{result.intro}</div>
      <div>
        <h4 className="text-lg font-bold mb-2 text-blue-700">Phases:</h4>
        <ol className="space-y-4 list-decimal pl-5">
          {result.phases?.map((phase: any, i: number) => (
            <li key={i} className="bg-blue-50 p-4 rounded-xl shadow-sm">
              <div className="font-bold text-blue-900">{phase.title} <span className="text-xs font-normal text-gray-500">({phase.timeline})</span></div>
              <div className="mb-1 text-gray-700">{phase.goal}</div>
              <ul className="list-disc pl-5 mb-1 text-sm">
                {phase.steps?.map((step: string, j: number) => (
                  <li key={j}>{step}</li>
                ))}
              </ul>
              <div className="text-xs text-gray-500">Resources: {phase.resources}</div>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-1 text-purple-600">Tips:</h4>
        <ul className="list-disc pl-6 text-sm text-purple-700">
          {result.tips?.map((tip: string, k: number) => <li key={k}>{tip}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default function CareerPlanForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    career_field: "",
    interests: "",
    skills: "",
    experience: "",
    goal: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:8000/api/career-plan/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  async function handleDownloadPDF() {
    if (!result) return;
    const res = await fetch("http://localhost:8000/api/career-plan-pdf/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, ...result }),
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "career_roadmap.pdf");
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" className="w-full border rounded px-3 py-2" placeholder="Age or Education" value={form.age} onChange={handleChange} required />
        <input name="career_field" className="w-full border rounded px-3 py-2" placeholder="Career Field (e.g. Data Science)" value={form.career_field} onChange={handleChange} required />
        <input name="interests" className="w-full border rounded px-3 py-2" placeholder="Interests (comma separated)" value={form.interests} onChange={handleChange} />
        <input name="skills" className="w-full border rounded px-3 py-2" placeholder="Current Skills (comma separated)" value={form.skills} onChange={handleChange} />
        <input name="experience" className="w-full border rounded px-3 py-2" placeholder="Any experience or projects?" value={form.experience} onChange={handleChange} />
        <input name="goal" className="w-full border rounded px-3 py-2" placeholder="Your dream job or goal" value={form.goal} onChange={handleChange} />
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded px-6 py-2 w-full" disabled={loading}>
          {loading ? "Generating..." : "Get Career Plan"}
        </button>
      </form>
      {loading && <div className="mt-4 text-blue-500">Generating...</div>}
      {result && (
        <div className="mt-8 bg-white rounded shadow p-4">
          <h3 className="text-lg font-bold mb-2">Career Roadmap:</h3>
          {renderRoadmap(result)}
          <div className="flex mt-6 space-x-2">
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded shadow"
              onClick={handleDownloadPDF}
              type="button"
            >
              Download as PDF
            </button>
            <button
              className="bg-gray-200 px-4 py-2 rounded shadow"
              onClick={handleCopy}
              type="button"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
