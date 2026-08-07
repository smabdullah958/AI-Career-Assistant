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

  Role: z
    .string()
    .nonempty("Role is required")
    .regex(/^[a-zA-Z\s]+$/, "only alphabet are allowed")
    .max(50, "Role must be less than 50 characters long"),

  portfolio: z
    .string()
    .url("Portfolio URL must be a valid URL")
    .or(z.literal(""))
    .optional({ checkFalsy: true }),

  Linkedin: z
    .string()
    .url("LinkedIn URL must be a valid URL")
    .or(z.literal(""))
    .optional({ checkFalsy: true }),

  //user professional details
  Summary: z
    .string()
    .nonempty("Summary is required")
    .max(500, "Summary must be less than 500 characters"),

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
          .max(50, "Project title must be less than 50 characters long"),

        description: z
          .string()
          .nonempty("Project description is required")
          .max(200, "Description must be less than 200 characters"),

        link: z
          .string()
          .url("Project link must be a valid URL")
          .or(z.literal(""))
          .optional({ checkFalsy: true }),

        Github: z
          .string()
          .url("GitHub URL must be a valid URL")
          .or(z.literal(""))
          .optional({ checkFalsy: true }),
      }),
    )
    .nonempty("At least one project is required")
    .max(3, "You can add up to 3 projects only"),

  //experience and certifications
  Experience: z
    .array(
      z
        .object({
          Role: z
            .string()
            .max(50, "Role must be less than 50 characters long")
            .nonempty("Role is required"),

          Description: z
            .string()
            .nonempty("Description is required")
            .max(200, "Description must be less than 200 characters"),

          CompanyName: z
            .string()
            .max(50, "Company name must be less than 50 characters long")
            .nonempty("Company name is required"),

          StartDate: z.string().nonempty("Start date is required"),
          EndDate: z.string().optional({ checkFalsy: true }),
        })
        .refine(
          (data) => {
            // If there is no EndDate (e.g., "Present"), we consider it valid
            if (!data.EndDate) return true;

            const start = new Date(data.StartDate);
            const end = new Date(data.EndDate);

            // Check if EndDate is after StartDate
            return end >= start;
          },
          {
            message: "End date must be greater then start date",
            path: ["EndDate"], // This sets the error specifically on the EndDate field
          },
        ),
    )
    .min(1, "You can add at least 1 experience only")
    .max(3, "You can add up to 3 experience only"),

  Certifications: z
    .array(
      z.object({
        NameOfInstitute: z
          .string()
          .nonempty("Institution name is required")
          .max(50, "Institution name must be less than 50 characters"),

        CertifcateName: z
          .string()
          .nonempty("Certificate name is required")
          .max(50, "Certificate name must be less than 50 characters"),

        IssueDate: z.string().nonempty("Date is required"),
      }),
    )
    .max(3, "You can add up to 3 certifications only"),

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
