import tempfile
import os

def analyze_resume(pdf_bytes, career_field, gemini_api_key):
    # STEP 1: File bana, likh aur close kar
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(pdf_bytes)
        tmp_path = tmp.name
    # STEP 2: Ab file access karo (ab lock nahi hai)
    resume_text = extract_text_from_pdf(tmp_path)
    os.remove(tmp_path)  # Clean up temp file

    # --- Gemini analysis as usual ---
    from langchain_google_genai import ChatGoogleGenerativeAI
    api_key = os.getenv("GEMINI_API_KEY")
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key
    )
    prompt = (
        f"You are a career expert for {career_field}. "
        f"Analyze this resume and provide 5 specific, practical suggestions for improvement so the user can become a stronger candidate in {career_field} jobs. "
        "Be direct and actionable, avoid generic advice.\n\n"
        f"Resume:\n{resume_text}"
    )
    response = llm.invoke(prompt)
    return response.content.strip() if hasattr(response, "content") else str(response)
def extract_text_from_pdf(pdf_path):
    from PyPDF2 import PdfReader
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.strip()
    except Exception as e:
        return f"Error extracting text: {str(e)}"   