import Link from "next/link";
const CTA = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center relative overflow-hidden">
      <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        Stop Guessing. Start Getting Hired
      </h3>

      <p className="text-lg md:text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
        Join hundreds of users who are already improving their resumes, cracking
        interviews, and boosting their careers with AI.
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <Link
          href="/Resume"
          className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold 
          hover:bg-gray-100 transition shadow-xl hover:shadow-2xl shadow-indigo-500 text-lg hover:-translate-y-1 "
        >
          Start For Free
        </Link>
      </div>
    </section>
  );
};

export default CTA;
