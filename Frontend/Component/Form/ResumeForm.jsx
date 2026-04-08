"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema } from "@/Libraries/ZodSchema";
import { useEffect } from "react";
const ResumeForm = ({ onDataChange }) => {
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
          nameOfInstitute: "",
          CertifcateName: "",
          IssueDate: "",
        },
      ],
    },
  });

  const summaryCharacter = watch("Summary");

  useEffect(() => {
    //formdata has all the data of a form
    const formdata = watch((value) => {
      //onDataChange is a function passed from parent component to get the form data in real time and preview it in resume preview section
      if (onDataChange) {
        onDataChange(value);
      }
    });

    return () => formdata.unsubscribe();
  }, [watch, onDataChange]);

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
        nameOfInstitute: "",
        CertifcateName: "",
        IssueDate: "",
      });
    }
  };

  let FormFunction = (data) => {
    console.log(data);
    alert("Form submitted successfully!", data.name, data.email);
  };

  return (
    <div>
      <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-4 mb-4 z-100 shadow-lg">
        <h1 className="text-xl text-black font-bold">Personal Detail</h1>

        <section className="grid grid-cols-2  gap-4 sm:gap-6 justify-between my-5 sm:mt-7 md:mt-7 2xl:mt-10 sm:mb-3 bg-white p-4 pt-8 rounded-xl shadow-sm">
          <div className="flex flex-col">
            <label className="text-gray-500 ">Full Name</label>
            {errors.name && (
              <p className="text-red-500 ">{errors.name.message}</p>
            )}
            <input
              {...register("name")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 ">Email</label>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <input
              {...register("email")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="user@gmail.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 ">Phone</label>
            {errors.phone && (
              <p className="text-red-500 ">{errors.phone.message}</p>
            )}
            <input
              {...register("phone")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="03XXXXXXXX"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 ">Role</label>
            {errors.Role && (
              <p className="text-red-500">{errors.Role.message}</p>
            )}
            <input
              {...register("Role")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Manager"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 ">Portfolio</label>
            {errors.portfolio && (
              <p className="text-red-500">{errors.portfolio.message}</p>
            )}
            <input
              {...register("portfolio")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="https://www.google.com"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 ">LinkedIn</label>
            {errors.Linkedin && (
              <p className="text-red-500 ">{errors.Linkedin.message}</p>
            )}
            <input
              {...register("Linkedin")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            {...register("Summary")}
            placeholder="Write a Summary about yourself..."
            rows={5}
            className="w-full border-black border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none shadow-sm"
          />
          <p className="text-gray-400 text-xs mt-1">
            {summaryCharacter?.length || 0}/200 characters
          </p>
        </section>
      </div>

      {/* skills */}
      <div className="bg-slate-100 border-2 border-gray-300 rounded-2xl p-5 mb-4 shadow-lg">
        <h1 className="text-xl text-black font-bold mb-6">Skills</h1>

        <div className="flex flex-col gap-4  mb-4 bg-white  p-4 pt-8 rounded-xl shadow-sm">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-3">
              {/* Input + Error */}
              <div className="flex flex-col w-full">
                {errors.Skills?.[0]?.value && (
                  <p className="text-red-500  mb-1">
                    {errors.Skills[0].value?.message}
                  </p>
                )}

                <input
                  {...register(`Skills.${index}.value`)}
                  placeholder={`Skill ${index + 1}`}
                  className="border border-gray-400 w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              <h3 className="my-2">Title </h3>
              {errors.Projects?.[0]?.title && (
                <p className="text-red-500 text-sm">
                  {errors.Projects[0].title?.message}
                </p>
              )}

              <input
                {...register(`Projects.${index}.title`)}
                placeholder="Project Title"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <h3 className="my-2 ">Project Link </h3>
              {errors.Projects?.[0]?.link && (
                <p className="text-red-500 text-sm">
                  {errors.Projects[0].link?.message}
                </p>
              )}

              <input
                {...register(`Projects.${index}.link`)}
                placeholder="Project Link"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <h3 className="my-2 ">GitHub Link </h3>

              {errors.Projects?.[0]?.Github && (
                <p className="text-red-500 text-sm">
                  {errors.Projects[0].Github?.message}
                </p>
              )}
              <input
                {...register(`Projects.${index}.Github`)}
                placeholder="GitHub Link"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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

              <h3 className="my-2 ">Description </h3>

              {errors.Projects?.[0]?.description && (
                <p className="text-red-500 text-sm">
                  {errors.Projects[0].description?.message}
                </p>
              )}
              <textarea
                rows={6}
                {...register(`Projects.${index}.description`)}
                placeholder="Project Description"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
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
              <h3 className="my-2 ">Company Name </h3>

              {errors.Experience?.[0]?.CompanyName && (
                <p className="text-red-500 text-sm">
                  {errors.Experience[0].CompanyName?.message}
                </p>
              )}

              <input
                {...register(`Experience.${index}.CompanyName`)}
                placeholder="Company name"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <h3 className="my-2 ">Role </h3>
              {errors.Experience?.[0]?.Role && (
                <p className="text-red-500 text-sm">
                  {errors.Experience[0].Role?.message}
                </p>
              )}

              <input
                {...register(`Experience.${index}.Role`)}
                placeholder="Role"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <h3 className="my-2 ">Start Date </h3>

              {errors.Experience?.[0]?.StartDate && (
                <p className="text-red-500 text-sm">
                  {errors.Experience[0].StartDate?.message}
                </p>
              )}
              <input
                type="date"
                {...register(`Experience.${index}.StartDate`)}
                placeholder="Start Date"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <h3 className="my-2 ">End Date </h3>
              {errors.Experience?.[0]?.EndDate && (
                <p className="text-red-500 text-sm">
                  {errors.Experience[0].EndDate?.message}
                </p>
              )}
              <input
                type="date"
                {...register(`Experience.${index}.EndDate`)}
                placeholder="End Date"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
              <h3 className="my-2 ">Description </h3>

              {errors.Experience?.[0]?.Description && (
                <p className="text-red-500 text-sm">
                  {errors.Experience[0].Description?.message}
                </p>
              )}
              <textarea
                rows={8}
                {...register(`Experience.${index}.Description`)}
                placeholder="Experience Description"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
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
        <h1 className="text-xl text-black font-bold mb-3">Education</h1>

        {educationFields.map((field, index) => (
          <section
            key={field.id}
            className="grid grid-cols-2 gap-4 items-start mb-4 bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex flex-col">
              <h3 className="my-2 ">Institution Name </h3>

              {errors.Education?.[0]?.nameOfInstitute && (
                <p className="text-red-500 text-sm">
                  {errors.Education[0].nameOfInstitute?.message}
                </p>
              )}

              <input
                {...register(`Education.${index}.nameOfInstitute`)}
                placeholder="Institution name"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="flex flex-col">
              <h3 className="my-2 ">Degree</h3>
              {errors.Education?.[0]?.degree && (
                <p className="text-red-500 text-sm">
                  {errors.Education[0].degree?.message}
                </p>
              )}

              <input
                {...register(`Education.${index}.degree`)}
                placeholder="Degree i.e FSC"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="my-2 ">field Of Study </h3>

              {errors.Education?.[0]?.fieldOfStudy && (
                <p className="text-red-500 text-sm">
                  {errors.Education[0].fieldOfStudy?.message}
                </p>
              )}
              <input
                {...register(`Education.${index}.fieldOfStudy`)}
                placeholder="fieldOfStudy i.e CS"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="my-2 "> Graduation Year</h3>
              {errors.Education?.[0]?.graduationYear && (
                <p className="text-red-500 text-sm">
                  {errors.Education[0].graduationYear?.message}
                </p>
              )}
              <input
                type="date"
                {...register(`Education.${index}.graduationYear`)}
                placeholder="Graduation Year"
                className="border-black w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                <label className=" text-gray-600 my-2">Institution Name</label>

                {errors.Certifications?.[0]?.nameOfInstitute && (
                  <p className="text-red-500 text-sm ">
                    {errors.Certifications[0].nameOfInstitute?.message}
                  </p>
                )}

                <input
                  {...register(`Certifications.${index}.nameOfInstitute`)}
                  placeholder="Institution name"
                  className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Certificate Name */}
              <div className="flex flex-col">
                <label className=" text-gray-600 my-2">Certificate Name</label>

                {errors.Certifications?.[0]?.CertifcateName && (
                  <p className="text-red-500 text-sm ">
                    {errors.Certifications[0].CertifcateName?.message}
                  </p>
                )}

                <input
                  {...register(`Certifications.${index}.CertifcateName`)}
                  placeholder="Certificate name"
                  className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Issue Date */}
              <div className="flex flex-col">
                <label className=" text-gray-600 my-2">Issue Date</label>

                {errors.Certifications?.[0]?.IssueDate && (
                  <p className="text-red-500 text-sm">
                    {errors.Certifications[0].IssueDate?.message}
                  </p>
                )}

                <input
                  type="date"
                  {...register(`Certifications.${index}.IssueDate`)}
                  className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
            onClick={handleAddCertifications}
            className="mt-3 bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            + Add Certificate
          </button>
        )}
      </div>

      <button
        onClick={handleSubmit(FormFunction)}
        className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300 duration-300"
      >
        Submit
      </button>
    </div>
  );
};

export default ResumeForm;
