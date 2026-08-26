"use client";
import toast from "react-hot-toast";
import ResumeForm from "@/Component/Form/ResumeForm";
import ResumeFormSkeleton from "@/Component/Loader/ResumeFormSkeleton";
//to show the resume when the result is prepared
import ResumeSkeleton from "@/Component/Loader/ResumeResultSkeleton";

import { ResetResume } from "@/Libraries/Slices/Resume/ResumeSlice";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

//remaining api calls per day
import RemainingAPICalls from "@/Features/RemainingAPICalls";
import { useParams } from "next/navigation";

//classical cv
import ClassicalDownloadPDF from "@/Component/ResumeTemplate/Classical/ClassicalDownloadPDF";
import ClassicalCVPreview from "@/Component/ResumeTemplate/Classical/ClassicalCVPreview";

//modern cv
import ModernCVPreview from "@/Component/ResumeTemplate/Modern/ModernCVPreview";
import ModernDownloadPDF from "@/Component/ResumeTemplate/Modern/ModernDowloadPDF";

//optimized cv
import OptimizedCVPreview from "@/Component/ResumeTemplate/Optimized/OptimizedCVPreview";
import OptimizedDownloadPDF from "@/Component/ResumeTemplate/Optimized/OptimizedDownloadPDF";

//elegant cv
import ElegantCVPreview from "@/Component/ResumeTemplate/Elegant/ElegantCVPreview";
import ElegantDownloadPDF from "@/Component/ResumeTemplate/Elegant/ElegantDownloadPDF";

const page = () => {
  let parms = useParams();
  const previewRef = useRef(null); // Create the reference
  let dispatch = useDispatch();
  let { success, loading, errorMessage } = useSelector(
    (state) => state.ResumeSlice,
  );

  // // get remainingCalls from a interivew slice and also here it is used to show the remining number of a calls
  // let { remainingCalls, ShowPopUp } = useSelector((state) => state.GlobalSlice);

  // get role remainingCalls from a global slice and also here it is used to show the remining number of a calls role froma gloabl slice and also it run when we can open  website or  reload a website
  let {
    remainingCalls,
    ShowPopUp,
    success: Success,
    Role: role,
  } = useSelector((state) => state.GlobalSlice);

  //to preview the data in resume preview section
  const [previewData, setPreviewData] = useState({});

  // Reset resume when user leaves this page
  useEffect(() => {
    return () => {
      dispatch(ResetResume());
    };
  }, [dispatch]);

  // Automatically scroll when success or loading becomes true
  useEffect(() => {
    if ((success || loading) && previewRef.current) {
      previewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [success, loading]);

  //these are used to ceck that if a user is login or signup  if user is login than it will show ther remaining number of a api calls
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  // let role = useSelector((state) => state.GlobalSlice.Role); //get role froma gloabl slice and also it run when we can open  website or  reload a website

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  //show the resume sekeleton when move to a remuse section
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ResumeFormSkeleton />;
  }

  // alert(parms.slug);

  let Slug = parms.slug;

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-100 p-5 sm:p-10 2xl:p-20">
      {(Role === "User" || UserRole === "User" || role === "User") &&
        (success ||
          Success || //here the Successs is come from a global slice it is run wehna  user is reload a webite
          errorMessage ||
          remainingCalls === 0 ||
          //show popups is also use to show the popup when thre remaining calls is greater than a 0 brother
          ShowPopUp === true) && (
          <RemainingAPICalls remaining={remainingCalls} />
        )}

      <div className=" flex justify-between ">
        <h1 className="text-xl sm:text-3xl  xl:text-4xl font-bold my-6 lg:my-10 text-slate-800">
          AI Resume Builder
        </h1>

        <h1 className="hidden md:block md:my-5 lg:my-10 md:text-3xl  xl:text-4xl font-bold  text-slate-800">
          Live Preview
        </h1>

        <h2 className="hidden md:block md:my-5 lg:my-10 ">
          {Slug === "classical-cv" ? (
            <ClassicalDownloadPDF response={previewData} />
          ) : Slug === "modern-cv" ? (
            <ModernDownloadPDF response={previewData} />
          ) : Slug === "optimized-cv" ? (
            <OptimizedDownloadPDF response={previewData} />
          ) : (
            Slug === "elegant-cv" && (
              <ElegantDownloadPDF response={previewData} />
            )
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 md:gap-10 lg:gap-16 2xl:gap-20">
        <ResumeForm
          onDataChange={setPreviewData} //pass to get a live data from aresume form to show a live preveiw
        />
        <div ref={previewRef} className="lg:block my-5 ">
          {/* when loading is true than show the resume skeleton  */}
          {loading ? (
            <ResumeSkeleton />
          ) : (
            (Slug === "classical-cv" && (
              <ClassicalCVPreview data={previewData} />
            )) ||
            (Slug === "modern-cv" && <ModernCVPreview data={previewData} />) ||
            (Slug === "optimized-cv" && (
              <OptimizedCVPreview data={previewData} />
            )) ||
            (Slug === "elegant-cv" && <ElegantCVPreview data={previewData} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
