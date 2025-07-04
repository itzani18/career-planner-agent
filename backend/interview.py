import re
import json
from langchain_google_genai import ChatGoogleGenerativeAI

def extract_and_fix_json(text):
    match = re.search(r'```json(.*?)```', text, re.DOTALL)
    if match:
        candidate = match.group(1).strip()
    else:
        match = re.search(r'({.*})', text, re.DOTALL)
        candidate = match.group(1).strip() if match else text
    candidate = candidate.replace("'", '"')
    candidate = re.sub(r',\s*}', '}', candidate)
    candidate = re.sub(r',\s*]', ']', candidate)
    return candidate

def generate_mock_interview(career_field: str, goal: str, gemini_api_key: str, user_name="User"):
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=gemini_api_key
    )

    prompt = f"""
You are a world-class technical interviewer.  
Ask 5 realistic, challenging interview questions for a candidate aiming for: "{goal}" in the field "{career_field}".  
**For each question, also provide a concise, high-quality model answer or tip.**

**Return ONLY JSON. NO markdown, no commentary, no code fences. Use this format:**

{{
  "intro": "Motivational intro to the candidate by name, 1-2 lines.",
  "questions": [
    {{"question": "Question 1?", "tip": "Model answer/tip for Q1."}},
    ...
  ]
}}

**Candidate name:** {user_name}
"""

    response = llm.invoke(prompt)
    interview_json_raw = response.content.strip()

    try:
        interview_struct = json.loads(interview_json_raw)
    except Exception:
        interview_json = extract_and_fix_json(interview_json_raw)
        try:
            interview_struct = json.loads(interview_json)
        except Exception:
            interview_struct = None

    return interview_struct, interview_json_raw
