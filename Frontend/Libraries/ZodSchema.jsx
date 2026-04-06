import * as z from "zod";

export const ResumeSchema = z.object({
  //user contact details
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .required("Name is required"),
  email: z.email().required("Email is required"),
  phone: z
    .number()
    .required("phone number is required")
    .regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
  Role: z
    .string()
    .required("Role is required")
    .max(50, "Role must be less than 50 characters long"),
  portfolio: z.url("Portfolio URL must be a valid URL").optional(),
  Linkedin: z.url("LinkedIn URL must be a valid URL").optional(),
  Github: z.url("GitHub URL must be a valid URL").optional(),

  //user professional details
  AboutMe: z
    .string()
    .max(200, "Description must be less than 200 characters long")
    .required("Introduction is required"),

  //skills and projects
  Skills: z
    .array(z.string())
    .min(1, "At least one skill is required")
    .required("Skills are required"),

  Projects: z.array(
    z.object({
      title: z
        .string()
        .required("Project title is required")
        .max(30, "Project title must be less than 30 characters long"),
      description: z
        .string()
        .required("Project description is required")
        .max(90, "Project description must be less than 90 characters long"),
      link: z.url("Project link must be a valid URL").optional(),
      Github: z.url("GitHub URL must be a valid URL").optional(),
    }),
  ),

  //experience and certifications
  Experienc: z.array(
    z.object({
      Role: z
        .string()
        .required("Role is required")
        .max(50, "Role must be less than 50 characters long"),
      CompanyName: z
        .string()
        .required("Company name is required")
        .max(50, "Company name must be less than 50 characters long"),
      StartDate: z
        .string()
        .required("Start date is required")
        .max(50, "Start date must be less than 50 characters long"),
      EndDate: z
        .string()
        .optional()
        .max(50, "End date must be less than 50 characters long"),
      Description: z
        .string()
        .required("Description is required")
        .max(100, "Description must be less than 100 characters long"),
    }),
  ),

  Certifications: z.array(
    z.object({
      nameOfInstitute: z
        .string()
        .required("Certification name is required")
        .max(50, "Certification name must be less than 50 characters long"),
      CertifcateName: z
        .string()
        .required("Certificate name is required")
        .max(50, "Certificate name must be less than 50 characters long"),
      date: z
        .string()
        .required("Date is required")
        .max(50, "Date must be less than 50 characters long"),
    }),
  ),

  //education details
  Education: z.array(
    z.object({
      nameOfInstitute: z
        .string()
        .required("Institution name is required")
        .max(50, "Institution name must be less than 50 characters long"),
      degree: z
        .string()
        .required("Degree is required")
        .max(50, "Degree must be less than 50 characters long"),
      fieldOfStudy: z
        .string()
        .required("Field of study is required")
        .max(50, "Field of study must be less than 50 characters long"),
      graduationYear: z
        .string()
        .required("Graduation year is required")
        .max(50, "Graduation year must be less than 50 characters long"),
    }),
  ),
});
