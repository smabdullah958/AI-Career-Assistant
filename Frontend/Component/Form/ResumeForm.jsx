"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema } from "@/Libraries/ZodSchema";
const ResumeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResumeSchema),
  });

  let FormFunction = (data) => {
    console.log(data);
    alert("Form submitted successfully!", data.name, data.email);
  };

  return (
    <div>
      <div className="bg-slate-100 border-2  border-gray-300 rounded-2xl p-4 mb-4 z-100 shadow-lg">
        <h1 className="text-xl text-black font-bold">Personal Detail</h1>

        <section className="grid grid-cols-2  gap-4 sm:gap-6 justify-between my-5 sm:mt-7 md:mt-10 sm:mb-3">
          <div className="flex flex-col">
            <label className="text-gray-500 ">Full Name</label>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
              <p className="text-red-500 text-sm">{errors.email.message}</p>
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
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
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
              <p className="text-red-500 text-sm">{errors.Role.message}</p>
            )}
            <input
              {...register("Role")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Manager"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 ">portfolio</label>
            {errors.portfolio && (
              <p className="text-red-500 text-sm">{errors.portfolio.message}</p>
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
              <p className="text-red-500 text-sm">{errors.Linkedin.message}</p>
            )}
            <input
              {...register("Linkedin")}
              className="border-black border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="https://www.linkedin.com"
            />
          </div>

          <button
            onClick={handleSubmit(FormFunction)}
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-300 duration-300"
          >
            Submit
          </button>
        </section>
      </div>
    </div>
  );
};

export default ResumeForm;
