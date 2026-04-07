"use client";
import ResumeForm from "@/Component/Form/ResumeForm";
import ResumePreview from "@/Component/ResumePreview";

import { useState } from "react";

const page = () => {
  //to preview the data in resume preview section
  const [previewData, setPreviewData] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 p-5 sm:p-10 2xl:p-20">
      <h1 className="text-xl sm:text-3xl 2xl:text-4xl font-bold mb-6">
        Resume Details
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:justify-between">
        <ResumeForm onDataChange={setPreviewData} />
        <div className="lg:block my-5 ">
          <ResumePreview data={previewData} />
        </div>
      </div>
    </div>
  );
};

export default page;
