export async function getSkillGap(user_skills: string, career_field: string) {
  const formData = new FormData();
  formData.append("user_skills", user_skills);
  formData.append("career_field", career_field);
  const res = await fetch("http://localhost:8000/api/skill-gap/", {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

export async function analyzeResume(file: File, career_field: string) {
  const formData = new FormData();
  formData.append("resume_file", file);
  formData.append("career_field", career_field);
  const res = await fetch("http://localhost:8000/api/resume-analyze/", {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

export async function jobSearch(job_title: string, location: string) {
  const formData = new FormData();
  formData.append("job_title", job_title);
  formData.append("location", location);
  const res = await fetch("http://localhost:8000/api/job-search/", {
    method: "POST",
    body: formData,
  });
  return await res.json();
}

export async function generateInterview(career_field: string, goal: string) {
  const formData = new FormData();
  formData.append("career_field", career_field);
  formData.append("goal", goal);
  const res = await fetch("http://localhost:8000/api/interview/", {
    method: "POST",
    body: formData,
  });
  return await res.json();
}
