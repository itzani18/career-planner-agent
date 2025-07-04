from langchain_google_genai import ChatGoogleGenerativeAI

def generate_plan(form, gemini_api_key):
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=gemini_api_key
    )
    prompt = f"""
You are a professional career coach.
Given this user's info:
Name: {form.get("name")}
Age/Education: {form.get("age")}
Career Field: {form.get("career_field")}
Interests: {form.get("interests")}
Skills: {form.get("skills")}
Experience: {form.get("experience")}
Goal: {form.get("goal")}

Generate a detailed 3-phase career roadmap, with:
- Short intro (1-2 lines)
- Each phase: title, timeline, goal, 3-5 action steps, resources.
- 3-4 overall career tips.
Return only this JSON format:

{{
"intro": "...",
"phases": [
    {{"title": "...", "timeline": "...", "goal": "...", "steps": ["..."], "resources": "..."}},
    ...
],
"tips": ["..."]
}}
"""
    response = llm.invoke(prompt)
    import json
    try:
        data = json.loads(response.content)
    except:
        import re
        match = re.search(r'({.*})', response.content, re.DOTALL)
        data = json.loads(match.group(1)) if match else {}
    return data
