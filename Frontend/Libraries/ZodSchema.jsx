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
    .nonempty("phone no is required")
    .regex(/^\d{11}$/, "Phone number must be a 11-digit number"),
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
    .max(200, "Summary must be less than 200 characters"),

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

  Projects: z
    .array(
      z.object({
        title: z
          .string()
          .nonempty("Project title is required")
          .max(30, "Project title must be less than 30 characters long"),
        description: z
          .string()
          .nonempty("Project description is required")
          .max(90, "Description must be less than 90 characters"),
        link: z
          .string()
          .url("Project link must be a valid URL")
          .or(z.literal(""))
          .optional(),
        Github: z
          .string()
          .url("GitHub URL must be a valid URL")
          .or(z.literal(""))
          .optional(),
      }),
    )
    .nonempty("At least one project is required")
    .max(3, "You can add up to 3 projects only"),

  //experience and certifications
  Experience: z.array(
    z.object({
      Role: z
        .string()
        .max(50, "Role must be less than 50 characters long")
        .nonempty("Role is required"),
      CompanyName: z
        .string()
        .max(50, "Company name must be less than 50 characters long")
        .nonempty("Company name is required"),
      StartDate: z.string().nonempty("Start date is required"),
      EndDate: z.string().optional(),
      Description: z
        .string()
        .nonempty("Description is required")
        .max(100, "Description must be less than 100 characters"),
    }),
  ),

  Certifications: z.array(
    z.object({
      nameOfInstitute: z
        .string()
        .nonempty("Institution name is required")
        .max(50, "Institution name must be less than 50 characters"),
      CertifcateName: z
        .string()
        .nonempty("Certificate name is required")
        .max(50, "Certificate name must be less than 50 characters"),
      IssueDate: z.string().nonempty("Date is required"),
    }),
  ),

  //education details
  Education: z.array(
    z.object({
      nameOfInstitute: z
        .string()
        .nonempty("Institution name is required")
        .max(50, "Institution name must be less than 50 characters long"),
      degree: z
        .string()
        .nonempty("Degree is required")
        .max(50, "Degree must be less than 50 characters long"),
      fieldOfStudy: z
        .string()
        .nonempty("Field of study is required")
        .max(50, "Field of study must be less than 50 characters long"),
      graduationYear: z.string().nonempty("Graduation year is required"),
    }),
  ),
});
