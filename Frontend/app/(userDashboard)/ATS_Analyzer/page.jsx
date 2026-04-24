"use client";
import AnalysisFormSkeleton from "@/Component/AnalysisFormSkeleton";
import { useSelector, useDispatch } from "react-redux";
import AnalyzerResult from "@/Component/AnalyzerResult";
import { useEffect, useState } from "react";
import ResumeAnalyzerFrom from "@/Component/Form/ResumeAnalyzerForm";

import AnalyzerSkeleton from "@/Component/AnalyzisSkeleton";

//to reset all teh state
import { ResetAnalyzer } from "@/Libraries/Slices/Analyzer/AnalyzerSlice";
import RemainingAPICalls from "@/Component/RemainingAPICalls";
const page = () => {
  let dispatch = useDispatch();
  let { success, loading, remainingCalls, errorMessage } = useSelector(
    (state) => state.AnalyzeSlice,
  );

  //these are used to ceck that if a user is login or signup  if user is login than it will show ther remaining number of a api calls
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  //show the analysiz skeleton sekeleton when move to a remuse section
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage);
    }
  }, [errorMessage]);

  //reset the states when the page is load
  useEffect(() => {
    dispatch(ResetAnalyzer());
  }, []);

  if (!mounted) {
    return <AnalysisFormSkeleton />;
  }

  return (
    <div className="xl:min-h-screen 2xl:overflow-y-auto">
      {(Role === "User" || UserRole === "User") &&
        (success || errorMessage) && (
          <RemainingAPICalls remaining={remainingCalls} />
        )}
      <ResumeAnalyzerFrom />
      {success ? <AnalyzerResult /> : loading && <AnalyzerSkeleton />}
    </div>
  );
};

export default page;
