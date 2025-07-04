import { useState } from "react";

export default function JobSearch() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("job_title", query);
    const res = await fetch("http://localhost:8000/api/job-search/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });
    const data = await res.json();
    setJobs(data.jobs || []);
    setLoading(false);
  }

  function handleCopyAll() {
    if (jobs.length) {
      navigator.clipboard.writeText(jobs.map(j => `${j.title} at ${j.company} (${j.location}): ${j.url}`).join("\n"));
      alert("Copied to clipboard!");
    }
  }

  return (
    <div>
      <form className="flex mb-4 space-x-2" onSubmit={handleSearch}>
        <input className="w-full border rounded px-3 py-2" placeholder="Search jobs (e.g. Data Scientist)" value={query} onChange={e => setQuery(e.target.value)} required />
        <button className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Searching..." : "Find Jobs"}</button>
      </form>
      {jobs.length > 0 && (
        <div>
          <div className="flex mb-2 space-x-2">
            <button className="bg-gray-200 px-4 py-2 rounded shadow" onClick={handleCopyAll}>
              Copy All
            </button>
          </div>
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-lg text-blue-700">{job.title}</div>
                  <div className="text-gray-500">{job.company} | {job.location}</div>
                  <div className="text-sm text-slate-500 mb-2">{job.tags?.join(", ")}</div>
                  <div className="text-xs text-green-600 font-semibold">{job.salary}</div>
                </div>
                <div className="flex items-center mt-3 md:mt-0 space-x-2">
                  <a href={job.url} target="_blank" rel="noopener" className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition">Apply</a>
                  <button className="bg-gray-200 px-3 py-1 rounded shadow hover:bg-gray-300 transition">Save Job</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
