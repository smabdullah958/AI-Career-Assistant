"use client";

import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import AnalysisFormSkeleton from "@/Component/Loader/AnalysisFormSkeleton";
import AnalyzerResult from "@/Features/AnalyzerResult";
import AnalyzerPartialResult from "@/Features/AnalyzerPartialResult"; //it si shwo a partial result during a llm response genration

import ResumeAnalyzerFrom from "@/Component/Form/ResumeAnalyzerForm";
import AnalyzerSkeleton from "@/Component/Loader/AnalyzisResultSkeleton";

import { ResetAnalyzer } from "@/Libraries/Slices/Analyzer/AnalyzerSlice";
import RemainingAPICalls from "@/Features/RemainingAPICalls";

const Page = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const { success, loading, errorMessage, streamingResult } = useSelector(
    (state) => state.AnalyzeSlice,
  );

  const {
    remainingCalls,
    ShowPopUp,
    success: Success,
    Role: role,
  } = useSelector((state) => state.GlobalSlice);

  const { Role } = useSelector((state) => state.SignUpSlice);
  const { UserRole } = useSelector((state) => state.LogInSlice);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if ((success || loading) && scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [success, loading]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    dispatch(ResetAnalyzer());
  }, [dispatch]);

  if (!mounted) {
    return <AnalysisFormSkeleton />;
  }

  const hasStreamingResult =
    streamingResult &&
    typeof streamingResult === "object" &&
    Object.keys(streamingResult).length > 0;

  return (
    <div className="xl:min-h-screen 2xl:overflow-y-auto">
      {(Role === "User" || UserRole === "User" || role === "User") &&
        (success ||
          Success ||
          errorMessage ||
          remainingCalls === 0 ||
          ShowPopUp === true) && (
          <RemainingAPICalls remaining={remainingCalls} />
        )}

      <ResumeAnalyzerFrom />

      <div ref={scrollRef} className="scroll-mt-10">
        {success ? (
          <AnalyzerResult />
        ) : loading && remainingCalls !== 0 ? (
          hasStreamingResult ? (
            <AnalyzerPartialResult />
          ) : (
            <AnalyzerSkeleton />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Page;
