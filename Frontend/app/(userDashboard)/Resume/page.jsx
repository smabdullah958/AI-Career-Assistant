import ResumeForm from "@/Component/Form/ResumeForm";
const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5 sm:p-10 2xl:p-20">
      <h1 className="text-xl sm:text-3xl 2xl:text-4xl font-bold mb-6">
        Resume Details
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:justify-between">
        <ResumeForm />
      </div>
    </div>
  );
};

export default page;
