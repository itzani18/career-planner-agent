import requests

def search_jobs_remotive(job_title, location=""):
    url = f"https://remotive.io/api/remote-jobs?search={job_title}"
    response = requests.get(url)
    data = response.json()
    jobs = []
    for job in data.get("jobs", [])[:10]:  # Only first 10 jobs
        jobs.append({
            "title": job["title"],
            "company": job["company_name"],
            "url": job["url"],
            "location": job["candidate_required_location"],
            "tags": job["tags"],
            "salary": job.get("salary", ""),
        })
    return jobs
