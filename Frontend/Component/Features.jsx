const Features = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Everything You Need to Get Hired
      </h3>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition border border-indigo-50">
          <h4 className="text-xl font-semibold mb-2 text-indigo-600">
            📄 Resume Generator
          </h4>
          <p className="text-gray-600">
            Create a professional, ATS-friendly resume in seconds using AI.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition border border-indigo-50">
          <h4 className="text-xl font-semibold mb-2 text-indigo-600">
            🎯 Interview Questions
          </h4>
          <p className="text-gray-600">
            Practice smarter with AI-generated interview questions tailored to
            your role.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-2xl hover:shadow-2xl transition border border-indigo-50">
          <h4 className="text-xl font-semibold mb-2 text-indigo-600">
            📊 ATS Analyzer
          </h4>
          <p className="text-gray-600">
            Analyze your resume and get an ATS score with improvement tips.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
