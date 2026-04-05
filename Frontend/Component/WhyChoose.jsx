const WhyChoose = () => {
  return (
    <section className="pt-5 pb-20 sm:py-20 px-8 bg-gradient-to-b from-white to-indigo-50 text-center">
      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        Why Job Seekers Love Us
      </h3>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        We don’t just generate content we help you stand out, get noticed, and
        get hired faster.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition border-t-4 border-indigo-500">
          <h4 className="text-xl font-semibold text-indigo-600 mb-2">
            Instant Results
          </h4>
          <p className="text-gray-600">
            Generate resumes, interview questions, and ATS analysis in seconds
            no waiting, no hassle.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition border-t-4 border-blue-500">
          <h4 className="text-xl font-semibold text-blue-600 mb-2">
            Built for Success
          </h4>
          <p className="text-gray-600">
            Our AI focuses on what recruiters actually look for helping you pass
            ATS filters and impress hiring managers.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition border-t-4 border-indigo-700">
          <h4 className="text-xl font-semibold text-indigo-700 mb-2">
            Career Boost
          </h4>
          <p className="text-gray-600">
            From resume creation to interview prep, everything is designed to
            maximize your chances of landing a job.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
