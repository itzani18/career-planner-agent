from langchain_google_genai import ChatGoogleGenerativeAI
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
key_skills = {
    "data science": ["Python", "SQL", "Machine Learning", "Statistics", "Data Visualization", "Pandas"],
    "web development": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    "teaching": ["Curriculum Planning", "Classroom Management", "Subject Knowledge", "Assessment", "Communication"],
    "sales & marketing": ["Negotiation", "CRM", "Digital Marketing", "Market Research", "Lead Generation"],
    "healthcare": ["Clinical Skills", "Patient Care", "Medical Terminology", "Diagnosis", "Empathy"],
}

def get_skill_gap_report(user_skills: str, career_field: str, gemini_api_key: str):
    career_field_lower = career_field.strip().lower()
    user_skills_set = set([s.strip().lower() for s in user_skills.split(",") if s.strip()])

    std_skills = key_skills.get(career_field_lower)
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key
    )

    if not std_skills:
        skill_prompt = (
            f"List 8 to 10 essential technical and soft skills required for a successful career in '{career_field}'. "
            "Give only the skill names, comma separated."
        )
        skill_resp = llm.invoke(skill_prompt)
        skill_list_text = skill_resp.content.strip() if hasattr(skill_resp, "content") else str(skill_resp)
        std_skills = [skill.strip() for skill in skill_list_text.split(",") if skill.strip()]

    missing_skills = [skill for skill in std_skills if skill.lower() not in user_skills_set]

    if missing_skills:
        prompt = (
            f"Aspiring for a career in {career_field}, but missing these skills: {', '.join(missing_skills)}. "
            "Suggest 3 practical ways or resources to learn these skills quickly."
        )
        response = llm.invoke(prompt)
        ai_tips = response.content.strip() if hasattr(response, "content") else str(response)
        return (
            f"**Standard Skills for {career_field.title()}:** {', '.join(std_skills)}\n\n"
            f"**Missing Skills:** {', '.join(missing_skills)}\n\n"
            f"**How to Learn:**\n{ai_tips}"
        )
    else:
        return f"Congratulations! You already have most essential skills for {career_field.title()}. 👍"
