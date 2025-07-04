import subprocess
import tempfile
from jinja2 import Template
import re

def escape_latex(text):
    """
    Escape LaTeX special characters in a string.
    """
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
    regex = re.compile('|'.join(re.escape(key) for key in latex_special_chars.keys()))
    return regex.sub(lambda match: latex_special_chars[match.group()], text)

def render_latex_and_compile(latex_template, context):
    latex_code = Template(latex_template).render(**context)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".tex") as texfile:
        texfile.write(latex_code.encode("utf-8"))
        texfile.flush()
        pdf_path = texfile.name.replace('.tex', '.pdf')
        subprocess.run([
            "pdflatex", "-output-directory", tempfile.gettempdir(), texfile.name
        ], check=True)
        with open(pdf_path, "rb") as pdf:
            pdf_bytes = pdf.read()
    return pdf_bytes
