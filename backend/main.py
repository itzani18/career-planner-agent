from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import StreamingResponse, JSONResponse
import io
from fastapi.middleware.cors import CORSMiddleware
import os
import skill_gap, resume, job_search, interview
import pdf_export

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY")

app = FastAPI()

# CORS for React/Next frontend (for dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def escape_latex(text):
    if not isinstance(text, str):
        return text
    latex_special_chars = {
        '&': r'\&',
        '%': r'\%',
        '$': r'\$',
        '#': r'\#',
        '_': r'\_',
        '{': r'\{',
        '}': r'\}',
        '~': r'\textasciitilde{}',
        '^': r'\textasciicircum{}',
        '\\': r'\textbackslash{}',
    }
    import re
    regex = re.compile('|'.join(re.escape(key) for key in latex_special_chars.keys()))
    return regex.sub(lambda match: latex_special_chars[match.group()], text)
@app.post("/api/career-plan-pdf/")
async def career_plan_pdf_api(request: Request):
    data = await request.json()
    from templates.career_plan_template import latex_template

    # ---- Yahi context banate waqt escape_latex lagao ----
    context = {
        "name": escape_latex(data.get("name", "")),
        "career_field": escape_latex(data.get("career_field", "")),
        "goal": escape_latex(data.get("goal", "")),
        "intro": escape_latex(data.get("intro", "")),
        "phases": [
            {
                "title": escape_latex(phase.get("title", "")),
                "timeline": escape_latex(phase.get("timeline", "")),
                "goal": escape_latex(phase.get("goal", "")),
                "steps": [escape_latex(step) for step in phase.get("steps", [])],
                "resources": escape_latex(phase.get("resources", "")),
            }
            for phase in data.get("phases", [])
        ],
        "tips": [escape_latex(tip) for tip in data.get("tips", [])]
    }

    pdf_bytes = pdf_export.render_latex_and_compile(latex_template, context)
    return StreamingResponse(io.BytesIO(pdf_bytes), media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=career_roadmap.pdf"})

@app.post("/api/career-plan-pdf/")
async def career_plan_pdf_api(request: Request):
    data = await request.json()
    from templates.career_plan_template import latex_template
    context = {
        "name": data.get("name", ""),
        "career_field": data.get("career_field", ""),
        "goal": data.get("goal", ""),
        "intro": data.get("intro", ""),
        "phases": data.get("phases", []),
        "tips": data.get("tips", [])
    }
    pdf_bytes = pdf_export.render_latex_and_compile(latex_template, context)
    return StreamingResponse(io.BytesIO(pdf_bytes), media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=career_roadmap.pdf"})

@app.post("/api/skill-gap/")
async def skill_gap_api(user_skills: str = Form(...), career_field: str = Form(...)):
    result = skill_gap.get_skill_gap_report(user_skills, career_field, GEMINI_API_KEY)
    return {"result": result}

@app.post("/api/resume-analyze/")
async def resume_analyze_api(resume_file: UploadFile = File(...), career_field: str = Form("")):
    content = await resume_file.read()
    result = resume.analyze_resume(content, career_field, GEMINI_API_KEY)
    return {"result": result}

@app.post("/api/job-search/")
async def job_search_api(job_title: str = Form(...), location: str = Form("")):
    jobs = job_search.search_jobs_remotive(job_title, location)
    return {"jobs": jobs}

@app.post("/api/interview/")
async def interview_api(career_field: str = Form(...), goal: str = Form(...), name: str = Form("User")):
    struct, _ = interview.generate_mock_interview(career_field, goal, GEMINI_API_KEY, user_name=name)
    return {"result": struct}

@app.post("/api/interview-pdf/")
async def interview_pdf_api(request: Request):
    data = await request.json()
    from templates.interview_template import latex_template
    context = {
        "name": data.get("name", ""),
        "career_field": data.get("career_field", ""),
        "goal": data.get("goal", ""),
        "intro": data.get("intro", ""),
        "questions": data.get("questions", [])
    }
    pdf_bytes = pdf_export.render_latex_and_compile(latex_template, context)
    return StreamingResponse(io.BytesIO(pdf_bytes), media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=mock_interview.pdf"})
