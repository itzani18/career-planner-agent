import { useState } from "react";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";
import SkillGapAnalyzer from "@/components/SkillGapAnalyzer";
import InterviewSimulator from "@/components/InterviewSimulator";
import CareerPlanForm from "@/components/CareerPlanForm";
import JobSearch from "@/components/JobSearch";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";
import '@/index.css';
import Spline3DView from "@/components/ui/Spline3DView";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  function renderFeatureComponent() {
    switch (activeFeature) {
      case "careerplan":
        return <CareerPlanForm />;
      case "resume":
        return <ResumeAnalyzer />;
      case "skillgap":
        return <SkillGapAnalyzer />;
      case "interview":
        return <InterviewSimulator />;
      case "jobsearch":
        return <JobSearch />;
      default:
        return null;
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#130F40] via-[#7d5fff]/40 to-[#0be881]/40">
      <Spline3DView/>
      {/* HEADER */}
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col min-h-screen">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
            AI Career Coach
          </h1>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed animate-fade-in">
            Transform your career with personalized AI guidance. Get expert advice, resume reviews, interview prep, job search, and career planning - all powered by advanced AI.
          </p>
        </div>

        {/* MODAL FOR FEATURE */}
        <div className="flex-grow flex items-center justify-center py-16">
          {activeFeature && (
            <div className="relative bg-white/95 rounded-xl shadow-xl max-w-lg mx-auto p-8 border border-gray-200 animate-fade-in">
              <button
                onClick={() => setActiveFeature(null)}
                className="absolute top-3 right-3 text-xl text-gray-400 hover:text-gray-700 font-bold"
                title="Close"
              >×</button>
              {renderFeatureComponent()}
            </div>
          )}
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
          {/* Career Planning */}
          <div
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:scale-105 transition-all duration-300 animate-fade-in"
            onClick={() => setActiveFeature("careerplan")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow">
              <span className="text-white text-xl">🎯</span>
            </div>
            <h3 className="text-md font-semibold text-slate-800 mb-1">Career Planning</h3>
            <p className="text-xs text-slate-600">Personalized roadmap & strategy.</p>
          </div>
          {/* Resume Review */}
          <div
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.15s' }}
            onClick={() => setActiveFeature("resume")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow">
              <span className="text-white text-xl">📝</span>
            </div>
            <h3 className="text-md font-semibold text-slate-800 mb-1">Resume Review</h3>
            <p className="text-xs text-slate-600">AI-powered resume analysis.</p>
          </div>
          {/* Interview Prep */}
          <div
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.30s' }}
            onClick={() => setActiveFeature("interview")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow">
              <span className="text-white text-xl">💬</span>
            </div>
            <h3 className="text-md font-semibold text-slate-800 mb-1">Interview Prep</h3>
            <p className="text-xs text-slate-600">Practice with AI mock interviews.</p>
          </div>
          {/* Job Search */}
          <div
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/60 hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.45s' }}
            onClick={() => setActiveFeature("jobsearch")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl mx-auto mb-2 flex items-center justify-center shadow">
              <span className="text-white text-xl">🔍</span>
            </div>
            <h3 className="text-md font-semibold text-slate-800 mb-1">Job Search</h3>
            <p className="text-xs text-slate-600">Find remote/global jobs instantly.</p>
          </div>
        </div>

        {/* Bottom instruction text */}
        <div className="text-center mb-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="text-slate-500 text-sm">
            👇 Try the advanced AI Career Coach with floating chat & more!
          </p>
        </div>
      </div>

      {/* Floating Chat Widget (bottom right) */}
      <FloatingChatWidget />
    </div>
  );
};

export default Index;
