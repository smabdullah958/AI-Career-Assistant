"use client";
import AnalysisFormSkeleton from "@/Component/AnalysisFormSkeleton";
import { useSelector, useDispatch } from "react-redux";
import AnalyzerResult from "@/Component/AnalyzerResult";
import { useEffect, useState } from "react";
import ResumeAnalyzerFrom from "@/Component/Form/ResumeAnalyzerForm";

import AnalyzerSkeleton from "@/Component/AnalyzisSkeleton";

//to reset all teh state
import { ResetAnalyzer } from "@/Libraries/Slices/Analyzer/AnalyzerSlice";
const page = () => {
  let dispatch = useDispatch();
  let { success, loading } = useSelector((state) => state.AnalyzeSlice);

  //show the analysiz skeleton sekeleton when move to a remuse section
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //reset the states when the page is load
  useEffect(() => {
    dispatch(ResetAnalyzer());
  }, []);

  if (!mounted) {
    return <AnalysisFormSkeleton />;
  }

  return (
    <div>
      <ResumeAnalyzerFrom />
      {success ? <AnalyzerResult /> : loading && <AnalyzerSkeleton />}
    </div>
  );
};

export default page;
