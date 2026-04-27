"use client";
import AnalysisFormSkeleton from "@/Component/Loader/AnalysisFormSkeleton";
import { useSelector, useDispatch } from "react-redux";
import AnalyzerResult from "@/Component/AnalyzerResult";
import { useEffect, useState } from "react";
import ResumeAnalyzerFrom from "@/Component/Form/ResumeAnalyzerForm";

import AnalyzerSkeleton from "@/Component/Loader/AnalyzisResultSkeleton";

//to reset all teh state
import { ResetAnalyzer } from "@/Libraries/Slices/Analyzer/AnalyzerSlice";
import RemainingAPICalls from "@/Component/RemainingAPICalls";
const page = () => {
  let dispatch = useDispatch();
  let { success, loading, errorMessage } = useSelector(
    (state) => state.AnalyzeSlice,
  );

  // get remainingCalls from a interivew slice and also here it is used to show the remining number of a calls
  let { remainingCalls, ShowPopUp } = useSelector((state) => state.GlobalSlice);

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
        (success ||
          errorMessage ||
          remainingCalls === 0 ||
          //show popups is also use to show the popup when thre remaining calls is greater than a 0 brother
          ShowPopUp === true) && (
          <RemainingAPICalls remaining={remainingCalls} />
        )}
      <ResumeAnalyzerFrom />
      {success ? (
        <AnalyzerResult />
      ) : (
        loading && remainingCalls !== 0 && <AnalyzerSkeleton />
      )}
    </div>
  );
};

export default page;
