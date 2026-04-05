import Link from "next/link";

const HowWorks = () => {
  return (
    <section className=" sm:pt-16 pb-1 px-6 bg-white text-center">
      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        From Idea to Interview In Minutes
      </h3>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        No complex steps. Just tell us about yourself our AI does the heavy
        lifting.
      </p>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-50 to-white shadow-lg hover:shadow-2xl transition relative">
          <div className="text-5xl font-extrabold text-indigo-100 absolute -top-6 left-6">
            01
          </div>
          <h4 className="text-xl font-semibold text-indigo-600 mb-3 mt-4">
            Tell Us About You
          </h4>
          <p className="text-gray-600">
            Enter your skills, experience, or job role no formatting needed.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white shadow-lg hover:shadow-2xl transition relative">
          <div className="text-5xl font-extrabold text-blue-100 absolute -top-6 left-6">
            02
          </div>
          <h4 className="text-xl font-semibold text-blue-600 mb-3 mt-4">
            AI Gets to Work
          </h4>
          <p className="text-gray-600">
            Our AI instantly generates your resume, interview questions, and ATS
            analysis.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-100 to-white shadow-lg hover:shadow-2xl transition relative">
          <div className="text-5xl font-extrabold text-indigo-200 absolute -top-6 left-6">
            03
          </div>
          <h4 className="text-xl font-semibold text-indigo-700 mb-3 mt-4">
            Get Hired Faster
          </h4>
          <p className="text-gray-600">
            Download, improve, and confidently apply for your dream job.
          </p>
        </div>
      </div>

      <div className="mt-6 mb-10 flex justify-center ">
        <Link
          href="/Resume"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 shadow-indigo-400 shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Try Now
        </Link>
      </div>
    </section>
  );
};

export default HowWorks;
