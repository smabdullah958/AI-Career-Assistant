"use client";
import { useState, useRef } from "react";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaBriefcase,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdHistoryEdu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AnalyzerThunck from "@/Libraries/Thuncks/Analyzer/AnalyzerThunck";

const ResumeAnalyzer = () => {
  //these are used to ceck that if a user is login or signup or not if not than user can not use our feature
  //signup role
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  const fileInputRef = useRef(null); // 2. Create the reference for a update the file

  let dispatch = useDispatch();

  const [formState, setFormState] = useState({
    Experience: "Fresher",
    Role: "",
    File: null,
  });

  const [error, setError] = useState("");

  //file handling
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(""); // Reset error

    if (!selectedFile) return;

    //  Check File Type
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed, brother!");
      setFormState((prev) => ({ ...prev, File: null }));
      return;
    }

    //  Check File Size (3MB = 3 * 1024 * 1024 bytes) less than 3 mb are allowed
    const maxSize = 3 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError("File is too heavy! Max size is 3MB.");
      setFormState((prev) => ({ ...prev, File: null }));
      return;
    }

    setFormState((prev) => ({ ...prev, File: selectedFile }));
  };

  // Check if all fields are valid for the button
  const isFormValid =
    formState.Role.trim() !== "" &&
    formState.File !== null &&
    formState.Experience &&
    (Role !== "User" || UserRole !== "User");

  // Handle input fildes
  const HandleFields = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //for form submission
  let FormFunction = () => {
    let data = new FormData();

    //now append the data
    data.append("Role", formState.Role);
    data.append("Experience", formState.Experience);

    //now append the file
    data.append("File", formState.File);

    //now dispatch
    dispatch(AnalyzerThunck(data));
  };

  return (
    <div className="min-h-screen xl:min-h-auto bg-[#f8fafc] p-4 md:p-10 font-sans">
      <section className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">
          AI Resume <span className="text-indigo-600 font-black">Analyzer</span>
        </h1>
        {error && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-500 bg-red-50 py-2 px-4 rounded-lg border border-red-100 animate-shake">
            <FaExclamationTriangle />
            <span className="font-bold text-sm">{error}</span>
          </div>
        )}
      </section>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* INPUTS SECTION */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100/50 border border-slate-200">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Target Role
            </label>
            <div className="relative mb-4">
              <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
              <input
                type="text"
                placeholder="e.g. Next.js Developer"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700"
                name="Role"
                value={formState.Role}
                onChange={HandleFields}
              />
            </div>

            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Experience
            </label>
            <div className="relative">
              <MdHistoryEdu className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-xl" />
              <select
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none appearance-none text-slate-700"
                name="Experience"
                value={formState.Experience}
                onChange={HandleFields}
              >
                <option value="Fresher level">less than 1 year</option>
                <option value="Junior level">1-2 Years</option>
                <option value="Mid level">2-5 Years</option>
                <option value="Senior level">5+ Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* UPLOAD SECTION */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-200 h-full flex flex-col justify-center">
            {/* THE HIDDEN INPUT (Keep this outside the toggle logic) */}
            <input
              type="file"
              ref={fileInputRef} // Attach the ref here
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />

            {!formState.File ? (
              <label className="w-full flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[2.5rem] py-16 cursor-pointer hover:bg-slate-50 transition-all group">
                <FaCloudUploadAlt className="text-indigo-600 text-6xl group-hover:scale-110 transition-transform" />
                <p className="mt-4 text-xl font-black text-slate-700">
                  Upload Resume (PDF)
                </p>
                <p className="text-slate-400 text-sm">Max size: 3MB</p>
                <input
                  type="file"
                  name="File"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="text-center">
                <div className="bg-red-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaFilePdf className="text-red-500 text-4xl" />
                </div>
                <h3 className="text-lg font-black text-slate-800 truncate px-6">
                  {formState.File.name}
                </h3>

                <div className="mt-8 grid grid-cols-2 gap-3 text-sm sm:text-md lg:text-lg 2xl:text-xl">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="font-extrabold py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Change PDF
                  </button>
                  <button
                    onClick={FormFunction}
                    disabled={!isFormValid}
                    className={` py-4 text-white font-black rounded-2xl shadow-lg ${isFormValid ? " bg-indigo-600 disabled:opacity-50  transition-all flex items-center justify-center gap-2" : "bg-indigo-600 opacity-30 cursor-not-allowed   "}`}
                  >
                    Analyze Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;
