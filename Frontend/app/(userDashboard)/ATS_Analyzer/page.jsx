"use client";
import ResumeAnalyzer from "@/Component/Form/ResumeAnalyzerForm";
import { useSelector } from "react-redux";
import AnalyzerResult from "@/Component/AnalyzerResult";

const page = () => {
  let { success, loading } = useSelector((state) => state.AnalyzeSlice);

  return (
    <div>
      <ResumeAnalyzer />
      {success && <AnalyzerResult />}
    </div>
  );
};

export default page;
