"use client";
import DownloadPDF from "../Buttons/DownloadPDF";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema } from "@/Libraries/ZodSchema";
import { useEffect } from "react";

import ResumeThunck from "@/Libraries/Thuncks/Resume/ResumeThunck";
import { useDispatch, useSelector } from "react-redux";
//use watch is alway use for a complex form for a watchin or preview
import { useWatch } from "react-hook-form";

// on datachange is a funcion which hold the data which is used to preview the data

//here we are using eh on datachange which is used to uplift the data to preview the live data in a resume section
const ResumeForm = ({ onDataChange }) => {
  let dispatch = useDispatch();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResumeSchema),
    defaultValues: {
      Skills: [{ value: "" }],
      //for porject
      Projects: [
        {
          title: "",
          description: "",
          link: "",
          Github: "",
        },
      ],

      //for experinece
      Experience: [
        {
          CompanyName: "",
          Role: "",
          StartDate: "",
          EndDate: "",
          Description: "",
        },
      ],

      // for education
      Education: [
        {
          nameOfInstitute: "",
          degree: "",
          fieldOfStudy: "",
          graduationYear: "",
        },
      ],

      // Certifications
      Certifications: [
        {
          NameOfInstitute: "",
          CertifcateName: "",
          IssueDate: "",
        },
      ],
    },
  });

  const summaryCharacter = watch("Summary");

  // formvalue has all the data of a form (latest data)
  const formValues = useWatch({
    control,
  });

  useEffect(() => {
    // onDataChange is a function passed from parent component to get the form data in real time and preview it in resume preview section
    onDataChange?.(formValues);
  }, [formValues, onDataChange]);

  // useFieldArray for dynamic inputs for a skills section
  const {
    fields: skillFields,
    append: addSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "Skills",
  });
  //for skills section
  const handleAddSkill = () => {
    if (skillFields.length < 20) {
      addSkill(" "); // append empty string
    }
  };

  // useFieldArray for dynamic Experience
  const {
    fields: experienceFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "Experience",
  });

  // function to add Experience (max 3)
  const handleAddExperience = () => {
    if (experienceFields.length < 3) {
      addExperience({
        Role: "",
        Description: "",
        CompanyName: "",
        StartDate: "",
        EndDate: "",
      });
    }
  };

  //useFieldArray for dynamic projects
  const {
    fields: projectFields,
    append: addProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "Projects",
  });

  // function to add project (max 3)
  const handleAddProject = () => {
    if (projectFields.length < 3) {
      addProject({
        title: "",
        description: "",
        link: "",
        Github: "",
      });
    }
  };

  // useFieldArray for dynamic  Education
  const {
    fields: educationFields,
    append: addEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "Education",
  });

  // function to add Education (max 5)
  const handleAddEducation = () => {
    if (educationFields.length < 5) {
      addEducation({
        nameOfInstitute: "",
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
      });
    }
  };

  // useFieldArray for dynamic  Certifications
  const {
    fields: certificationsFields,
    append: addCertifications,
    remove: removeCertifications,
  } = useFieldArray({
    control,
    name: "Certifications",
  });

  // function to add Certifications (max 3)
  const handleAddCertifications = () => {
    if (certificationsFields.length < 3) {
      addCertifications({
        NameOfInstitute: "",
        CertifcateName: "",
        IssueDate: "",
      });
    }
  };

  let FormFunction = async (data) => {
    await dispatch(ResumeThunck(data));
  };

  //signup role
  let { Role } = useSelector((state) => state.SignUpSlice);

  //login role
  let { UserRole } = useSelector((state) => state.LogInSlice);

  // get remainingCalls from a Global slice and also here it is used to hide the button

  let { remainingCalls } = useSelector((state) => state.GlobalSlice);

  let IsRole = (Role === "User" || UserRole === "User") && remainingCalls !== 0;

  //when user press enter go to a next field
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);

      if (form.elements[index + 1]) {
        form.elements[index + 1].focus();
      }
    }
  };

  return (
    <div>
      <form>
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-4 mb-4 z-100 shadow-lg">
          <h1 className="text-xl text-black font-bold">Personal Detail</h1>

          <section className="grid grid-cols-2  gap-4 sm:gap-6 justify-between my-5 sm:mt-7 md:mt-7 2xl:mt-10 sm:mb-3 bg-white p-4 pt-8 rounded-xl shadow-sm">
            <div className="flex flex-col">
              <label className="text-gray-500 ">Full Name</label>
              {errors.name && (
                <p className="text-red-500 ">{errors.name.message}</p>
              )}
              <input
                onKeyDown={handleEnter}
                {...register("name")}
                className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 ">Email</label>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <input
                {...register("email")}
                onKeyDown={handleEnter}
                className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                placeholder="user@gmail.com"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 ">Phone</label>
              {errors.phone && (
                <p className="text-red-500 ">{errors.phone.message}</p>
              )}
              <input
                onKeyDown={handleEnter}
                {...register("phone")}
                className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                placeholder="03XXXXXXXX"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 ">Role</label>
              {errors.Role && (
                <p className="text-red-500">{errors.Role.message}</p>
              )}
              <input
                onKeyDown={handleEnter}
                {...register("Role")}
                className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                placeholder="Manager"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 ">Portfolio</label>
              {errors.portfolio && (
                <p className="text-red-500">{errors.portfolio.message}</p>
              )}
              <input
                onKeyDown={handleEnter}
                {...register("portfolio")}
                className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                placeholder="https://www.google.com"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 ">LinkedIn</label>
              {errors.Linkedin && (
                <p className="text-red-500 ">{errors.Linkedin.message}</p>
              )}
              <input
                onKeyDown={handleEnter}
                {...register("Linkedin")}
                className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                placeholder="https://www.linkedin.com"
              />
            </div>
          </section>
        </div>

        {/* about or a summary or a description */}
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl  p-4 mb-4 z-100 shadow-lg ">
          <h1 className="text-xl text-black font-bold mb-3 sm:mb-7 md:mb-7 2xl:mb-10 text-sm">
            Professional Detail
          </h1>
          <section className="grid gap-4 items-start mb-4 bg-white p-4 pt-8 rounded-xl shadow-sm">
            {errors.Summary && (
              <p className="text-red-500">{errors.Summary.message}</p>
            )}

            <textarea
              onKeyDown={handleEnter}
              {...register("Summary")}
              placeholder="Write a Summary about yourself..."
              rows={5}
              className="w-full border-black border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none shadow-sm text-gray-500"
            />
            <p className="text-gray-400 text-xs mt-1">
              {summaryCharacter?.length || 0}/500 characters
            </p>
          </section>
        </div>

        {/* skills */}
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-5 mb-4 shadow-lg ">
          <h1 className="text-xl text-black font-bold mb-6">Skills</h1>

          <div className="flex flex-col gap-4  mb-4 bg-white  p-4 pt-8 rounded-xl shadow-sm max-h-96  overflow-y-auto">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3">
                {/* Input + Error */}
                <div className="flex flex-col w-full">
                  {errors.Skills?.[index]?.value && (
                    <p className="text-red-500  mb-1">
                      {errors.Skills[index].value?.message}
                    </p>
                  )}

                  <input
                    onKeyDown={handleEnter}
                    {...register(`Skills.${index}.value`)}
                    placeholder={`Skill ${index + 1}`}
                    className="border border-gray-400 w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                  />
                </div>

                {/* Remove Button */}
                {skillFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="bg-red-400 text-white px-3 py-2 rounded-lg hover:bg-red-500 transition-all "
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          {skillFields.length < 20 && (
            <button
              type="button"
              onClick={handleAddSkill}
              className="mt-4 bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition-all"
            >
              + Add Skill
            </button>
          )}

          <p className="text-gray-400 text-xs mt-2">
            {skillFields.length}/20 skills
          </p>
        </div>

        {/* project */}
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-4 mb-4 shadow-lg">
          <h1 className="text-xl text-black font-bold mb-3">Projects</h1>

          {projectFields.map((field, index) => (
            <section
              key={field.id}
              className="grid grid-cols-2 gap-4 items-start mb-4 bg-white p-4 rounded-xl shadow-sm"
            >
              {/* Left side: Title, Link, GitHub */}
              <div className="flex flex-col ">
                <h3 className="my-2 text-gray-500">Title </h3>
                {errors.Projects?.[index]?.title && (
                  <p className="text-red-500 text-sm">
                    {errors.Projects[index].title?.message}
                  </p>
                )}

                <input
                  onKeyDown={handleEnter}
                  {...register(`Projects.${index}.title`)}
                  placeholder="Project Title"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                <h3 className="my-2 text-gray-500">Project Link </h3>
                {errors.Projects?.[index]?.link && (
                  <p className="text-red-500 text-sm">
                    {errors.Projects[index].link?.message}
                  </p>
                )}

                <input
                  onKeyDown={handleEnter}
                  {...register(`Projects.${index}.link`)}
                  placeholder="Project Link"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                <h3 className="my-2 text-gray-500">GitHub Link </h3>

                {errors.Projects?.[index]?.Github && (
                  <p className="text-red-500 text-sm">
                    {errors.Projects[index].Github?.message}
                  </p>
                )}
                <input
                  onKeyDown={handleEnter}
                  {...register(`Projects.${index}.Github`)}
                  placeholder="GitHub Link"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                {/* Remove button */}
                {projectFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500 duration-300 w-fit mt-2"
                  >
                    Remove Project
                  </button>
                )}
              </div>
              <section className="flex flex-col items-center justify-center content-center h-full ">
                {/* Right side: Description */}

                <h3 className="my-2 text-gray-500">Description </h3>

                {errors.Projects?.[index]?.description && (
                  <p className="text-red-500 text-sm">
                    {errors.Projects[index].description?.message}
                  </p>
                )}
                <textarea
                  rows={6}
                  {...register(`Projects.${index}.description`)}
                  placeholder="Project Description"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-gray-500"
                />
              </section>
            </section>
          ))}

          {/* Add Project button */}
          {projectFields.length < 3 && (
            <button
              type="button"
              onClick={handleAddProject}
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 duration-300 w-fit"
            >
              + Add Project
            </button>
          )}
        </div>

        {/* //for Experience */}
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-4 mb-4 shadow-lg">
          <h1 className="text-xl text-black font-bold mb-3">Experience</h1>

          {experienceFields.map((field, index) => (
            <section
              key={field.id}
              className="grid grid-cols-2 gap-4 items-start mb-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex flex-col">
                <h3 className="my-2 text-gray-500">Company Name </h3>

                {errors.Experience?.[index]?.CompanyName && (
                  <p className="text-red-500 text-sm">
                    {errors.Experience[index].CompanyName?.message}
                  </p>
                )}

                <input
                  onKeyDown={handleEnter}
                  {...register(`Experience.${index}.CompanyName`)}
                  placeholder="Company name"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                <h3 className="my-2 text-gray-500">Role </h3>
                {errors.Experience?.[index]?.Role && (
                  <p className="text-red-500 text-sm">
                    {errors.Experience[index].Role?.message}
                  </p>
                )}

                <input
                  onKeyDown={handleEnter}
                  {...register(`Experience.${index}.Role`)}
                  placeholder="Role"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                <h3 className="my-2 text-gray-500">Start Date </h3>

                {errors.Experience?.[index]?.StartDate && (
                  <p className="text-red-500 text-sm">
                    {errors.Experience[index].StartDate?.message}
                  </p>
                )}
                <input
                  onKeyDown={handleEnter}
                  type="date"
                  //state date must be smaller thana ending date
                  max={
                    watch(`Experience.${index}.EndDate`) ||
                    new Date().toISOString().split("T")[0]
                  }
                  {...register(`Experience.${index}.StartDate`)}
                  placeholder="Start Date"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                <h3 className="my-2 text-gray-500">End Date </h3>
                {errors.Experience?.[index]?.EndDate && (
                  <p className="text-red-500 text-sm">
                    {errors.Experience[index].EndDate?.message}
                  </p>
                )}
                <input
                  onKeyDown={handleEnter}
                  type="date"
                  //ending date must be smaller than afuter date
                  max={new Date().toISOString().split("T")[0]}
                  {...register(`Experience.${index}.EndDate`)}
                  placeholder="End Date"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />

                {/* Remove button */}
                {experienceFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500 duration-300 w-fit mt-2"
                  >
                    Remove Experience
                  </button>
                )}
              </div>
              <section className="flex flex-col items-center justify-center content-center h-full ">
                {/* Right side: Description */}
                <h3 className="my-2 text-gray-500">Description </h3>

                {errors.Experience?.[index]?.Description && (
                  <p className="text-red-500 text-sm">
                    {errors.Experience[index].Description?.message}
                  </p>
                )}
                <textarea
                  rows={8}
                  {...register(`Experience.${index}.Description`)}
                  placeholder="Experience Description"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none text-gray-500"
                />
              </section>
            </section>
          ))}

          {/* Add experience button */}
          {experienceFields.length < 3 && (
            <button
              type="button"
              onClick={handleAddExperience}
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 duration-300 w-fit"
            >
              + Add Experience
            </button>
          )}
        </div>

        {/* //for Education */}
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-4 mb-4 shadow-lg">
          <h1 className="text-xl text-black font-bold mb-3 ">Education</h1>

          {educationFields.map((field, index) => (
            <section
              key={field.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start mb-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex flex-col">
                <h3 className="my-2 text-gray-500">Institution Name </h3>

                {errors.Education?.[index]?.nameOfInstitute && (
                  <p className="text-red-500 text-sm">
                    {errors.Education[index].nameOfInstitute?.message}
                  </p>
                )}

                <input
                  onKeyDown={handleEnter}
                  {...register(`Education.${index}.nameOfInstitute`)}
                  placeholder="Institution name"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="my-2 text-gray-500">Degree</h3>
                {errors.Education?.[index]?.degree && (
                  <p className="text-red-500 text-sm">
                    {errors.Education[index].degree?.message}
                  </p>
                )}

                <input
                  onKeyDown={handleEnter}
                  {...register(`Education.${index}.degree`)}
                  placeholder="Degree i.e FSC"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="my-2 text-gray-500">field Of Study </h3>

                {errors.Education?.[index]?.fieldOfStudy && (
                  <p className="text-red-500 text-sm">
                    {errors.Education[index].fieldOfStudy?.message}
                  </p>
                )}
                <input
                  onKeyDown={handleEnter}
                  {...register(`Education.${index}.fieldOfStudy`)}
                  placeholder="fieldOfStudy i.e CS"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="my-2 text-gray-500"> Graduation Year</h3>
                {errors.Education?.[index]?.graduationYear && (
                  <p className="text-red-500 text-sm">
                    {errors.Education[index].graduationYear?.message}
                  </p>
                )}
                <input
                  onKeyDown={handleEnter}
                  type="date"
                  {...register(`Education.${index}.graduationYear`)}
                  placeholder="Graduation Year"
                  className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                />
              </div>
              {/* Remove button */}
              {educationFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500 duration-300 w-fit mt-2"
                >
                  Remove Education
                </button>
              )}
            </section>
          ))}

          {/* Add education button */}
          {educationFields.length < 5 && (
            <button
              type="button"
              onClick={handleAddEducation}
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 duration-300 w-fit"
            >
              + Add Education
            </button>
          )}
        </div>

        {/* for certification */}
        <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-5 mb-4 shadow-lg">
          <h1 className="text-xl text-black font-bold mb-6">Certifications</h1>

          {certificationsFields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-300 rounded-xl p-4 mb-4 bg-white shadow-sm flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Institution */}
                <div className="flex flex-col">
                  <label className=" text-gray-600 my-2 text-gray-500">
                    Institution Name
                  </label>

                  {errors.Certifications?.[index]?.NameOfInstitute && (
                    <p className="text-red-500 text-sm ">
                      {errors.Certifications[index].NameOfInstitute?.message}
                    </p>
                  )}

                  <input
                    onKeyDown={handleEnter}
                    {...register(`Certifications.${index}.NameOfInstitute`)}
                    placeholder="Institution name"
                    className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                  />
                </div>

                {/* Certificate Name */}
                <div className="flex flex-col">
                  <label className=" text-gray-600 my-2 text-gray-500">
                    Certificate Name
                  </label>

                  {errors.Certifications?.[index]?.CertifcateName && (
                    <p className="text-red-500 text-sm ">
                      {errors.Certifications[index].CertifcateName?.message}
                    </p>
                  )}

                  <input
                    onKeyDown={handleEnter}
                    {...register(`Certifications.${index}.CertifcateName`)}
                    placeholder="Certificate name"
                    className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500"
                  />
                </div>

                {/* Issue Date */}
                <div className="flex flex-col">
                  <label className=" text-gray-600 my-2 text-gray-500">
                    Issue Date
                  </label>

                  {errors.Certifications?.[index]?.IssueDate && (
                    <p className="text-red-500 text-sm">
                      {errors.Certifications[index].IssueDate?.message}
                    </p>
                  )}

                  <input
                    type="date"
                    {...register(`Certifications.${index}.IssueDate`)}
                    //issue date must be smaller than afuture date
                    max={new Date().toISOString().split("T")[0]}
                    placeholder="Issue Date"
                    className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500 w-full"
                  />
                </div>
              </div>

              {/* Remove Button*/}
              {certificationsFields.length > 1 && (
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={() => removeCertifications(index)}
                    className="bg-red-400 text-white px-4 py-1.5 rounded-lg  hover:bg-red-500 transition"
                  >
                    Remove Certification
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Button */}
          {certificationsFields.length < 3 && (
            <button
              type="button"
              onClick={handleAddCertifications}
              className="mt-3 bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              + Add Certificate
            </button>
          )}
        </div>
        <div className="flex justify-between gap-3">
          <button
            type="button"
            //when role is not disable
            disabled={!IsRole}
            onClick={handleSubmit(FormFunction)}
            className={`bg-indigo-500 text-white py-2 px-4 rounded-lg 
            ${IsRole ? " hover:bg-indigo- 600 focus:outline-none focus:ring-2 focus:ring-blue-300 duration-300" : "opacity-30 hover:cursor-not-allowed"}`}
          >
            Generate Resume
          </button>
          <div className=" block lg:hidden">
            <DownloadPDF />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
