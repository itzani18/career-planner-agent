Ready-to-Copy README.md Content (Your Full Guide in Markdown)
markdown
Copy
Edit
# 🚀 GenAI Career Coach

AI-powered career guidance: personalized career plans, resume analysis, skill gap reports, mock interview Qs, and job search — all with PDF downloads and a beautiful UI.

---

## 🛠️ **Getting Started (Run Locally)**

### **Requirements**
- **Python 3.8+**
- **Node.js + npm/yarn**
- **Git**
- **TeX Live** (for PDF/LaTeX backend, see below)

---

### **1. Clone This Repo**
```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
2. Backend Setup (FastAPI)
sh
Copy
Edit
cd backend
python -m venv venv
# (Windows)
venv\Scripts\activate
# (Linux/Mac)
# source venv/bin/activate

pip install -r requirements.txt
.env File
Create a .env file in /backend and add your Gemini API Key:

ini
Copy
Edit
GEMINI_API_KEY=your_api_key_here
TeX Live (For PDF Download)
Windows: TeX Live Download

Ubuntu:

sh
Copy
Edit
sudo apt update
sudo apt install texlive-full
Mac:

sh
Copy
Edit
brew install --cask mactex
Run FastAPI:
sh
Copy
Edit
uvicorn main:app --reload
App runs at http://localhost:8000

API docs: http://localhost:8000/docs

3. Frontend Setup (React/Next.js)
sh
Copy
Edit
cd ../frontend
npm install
# or
yarn install

npm run dev
# or
yarn dev
App opens at http://localhost:5173 (or 3000)

🧑‍💻 Features — How to Use
Career Planning: Fill form, get stepwise roadmap, download as PDF.

Resume Review: Upload PDF resume, get AI feedback.

Skill Gap Analyzer: List your skills & career field, get missing skills & upskilling tips.

Interview Prep: Enter your target role, get 5 AI interview Qs + answers, PDF download.

Job Search: Search for jobs, get direct “Apply” links.

PDF Download
Look for the Download as PDF button below each result.

Floating Chat Widget
Use the chat in the bottom right for quick tips and feature tabs!

📝 Troubleshooting
PDF not generating?
Make sure TeX Live is installed and in your system PATH.

Gemini API error?
Check .env and your Google Gemini API Key.

Port in use error?
Change port in uvicorn/npm run dev commands.
