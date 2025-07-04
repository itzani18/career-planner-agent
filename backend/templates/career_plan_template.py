latex_template = r"""
\documentclass[12pt]{article}
\usepackage{geometry}
\geometry{margin=1in}
\usepackage{enumitem}
\begin{document}

\begin{center}
    {\Huge \textbf{Career Roadmap for {{ name }}}}
\end{center}

\vspace{1em}
\textbf{Career Field:} {{ career_field }} \\
\textbf{Goal:} {{ goal }}

\vspace{1em}
\textbf{Introduction:}

{{ intro }}

\vspace{1em}
\textbf{Phases:}
\begin{enumerate}[leftmargin=*, label={\textbf{Phase \arabic*:}}]
{% for phase in phases %}
    \item \textbf{ {{ phase.title }} } \\
    \textbf{Timeline:} {{ phase.timeline }} \\
    \textbf{Goal:} {{ phase.goal }} \\
    \textbf{Key Action Steps:}
    \begin{itemize}
    {% for step in phase.steps %}
        \item {{ step }}
    {% endfor %}
    \end{itemize}
    \textbf{Resources:} {{ phase.resources }}
{% endfor %}
\end{enumerate}

\vspace{1em}
\textbf{Continuous Improvement \& Tips:}
\begin{itemize}
{% for tip in tips %}
    \item {{ tip }}
{% endfor %}
\end{itemize}

\vspace{2em}
\textit{Generated by GenAI Career Coach.}
\end{document}
"""
