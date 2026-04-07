import * as z from "zod";

export const ResumeSchema = z.object({
  //user contact details
  name: z
    .string()
    .nonempty("name is required")
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be less than 50 characters long"),
  email: z
    .string()
    .nonempty("email is required")
    .email("invalid email address"),
  phone: z
    .string()
    .nonempty("phone no is requred")
    .regex(/^\d{10}$/, "Phone number must be a 10-digit number"),
  Role: z.string().nonempty("Role is required"),
  portfolio: z
    .string()
    .url("Portfolio URL must be a valid URL")
    .or(z.literal(""))
    .optional(),
  Linkedin: z
    .string()
    .url("LinkedIn URL must be a valid URL")
    .or(z.literal(""))
    .optional(),

  //user professional details
  Summary: z
    .string()
    .nonempty("Summary is required")
    .max(200, "Summary must be less than 200 characters long"),

  //skills and projects
  Skills: z
    .array(
      z.object({
        value: z.string().nonempty("Skill is required"),
      }),
    )
    .nonempty("At least one skill is required")
    .min(1, "At least one skill is required")
    .max(20, "You can add up to 20 skills only"),

  Projects: z.array(
    z.object({
      title: z
        .string()
        .max(30, "Project title must be less than 30 characters long"),
      description: z
        .string()
        .max(90, "Project description must be less than 90 characters long"),
      link: z.string().url("Project link must be a valid URL").optional(),
      Github: z.string().url("GitHub URL must be a valid URL").optional(),
    }),
  ),

  //experience and certifications
  Experienc: z.array(
    z.object({
      Role: z.string().max(50, "Role must be less than 50 characters long"),
      CompanyName: z
        .string()
        .max(50, "Company name must be less than 50 characters long"),
      StartDate: z
        .string()
        .max(50, "Start date must be less than 50 characters long"),
      EndDate: z
        .string()
        .max(50, "End date must be less than 50 characters long")
        .optional(),
      Description: z
        .string()
        .max(100, "Description must be less than 100 characters long"),
    }),
  ),

  Certifications: z.array(
    z.object({
      nameOfInstitute: z
        .string()
        .max(50, "Certification name must be less than 50 characters long"),
      CertifcateName: z
        .string()
        .max(50, "Certificate name must be less than 50 characters long"),
      date: z.string().max(50, "Date must be less than 50 characters long"),
    }),
  ),

  //education details
  Education: z.array(
    z.object({
      nameOfInstitute: z
        .string()
        .max(50, "Institution name must be less than 50 characters long"),
      degree: z.string().max(50, "Degree must be less than 50 characters long"),
      fieldOfStudy: z
        .string()
        .max(50, "Field of study must be less than 50 characters long"),
      graduationYear: z
        .string()
        .max(50, "Graduation year must be less than 50 characters long"),
    }),
  ),
});
