let { body } = require("express-validator");

let ResumeValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 5 })
    .withMessage("minimum 5 character")
    .isLength({ max: 50 })
    .withMessage("maximum 50 character is allowed")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid  format"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("invalid phone number ")
    .matches(/^\d{11}$/)
    .withMessage("Phone number must be a 11-digit number"),

  body("Role")
    .notEmpty()
    .withMessage("role is required")
    .withMessage("role must be string")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed")
    .isLength({ max: 50 })
    .withMessage("maximum 50 character is allowed"),

  body("portfolio")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Portfolio must be a valid URL"),

  body("Linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  // summary
  body("Summary")
    .notEmpty()
    .withMessage("Summary is required")
    .isLength({ max: 200 })
    .withMessage("maximum 200 character is allowed"),

  // skills
  body("Skills")
    .isArray({ min: 1, max: 20 })
    .withMessage("skills must be between 1 to 20")
    .notEmpty()
    .withMessage("skills is required"),
  body("Skills.*.value")
    .notEmpty()
    .withMessage("skill value is required")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  // project
  body("Projects").isArray({ max: 3 }).withMessage("Projects must be 1 to 3"),

  body("Projects.*.title")
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ max: 50 })
    .withMessage("Max 30 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Projects.*.description")
    .notEmpty()
    .withMessage("Project description is required")
    .isLength({ max: 120 })
    .withMessage("Max 120 characters"),

  body("Projects.*.link")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid project URL"),

  body("Projects.*.Github")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid GitHub URL"),

  // experience
  body("Experience")
    .notEmpty()
    .isArray({ max: 3 })
    .withMessage("Experience is allowed between 1 to 3"),

  body("Experience.*.Role")
    .notEmpty()
    .withMessage("Role is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Experience.*.CompanyName")
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Experience.*.StartDate")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .withMessage("Start date must be a valid date")
    .toDate(),

  body("Experience.*.EndDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("end date must be a valid date")
    .toDate(),

  body("Experience.*.Description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 120 })
    .withMessage("Max 100 characters"),

  // certification
  body("Certifications")
    .notEmpty()
    .isArray({ min: 1, max: 3 })
    .withMessage("Certifications must be an array"),

  body("Certifications.*.nameOfInstitute")
    .notEmpty()
    .withMessage("Institution name is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Certifications.*.CertifcateName")
    .notEmpty()
    .withMessage("Certificate name is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Certifications.*.IssueDate")
    .notEmpty()
    .withMessage("Issue date is required")
    .isISO8601()
    .withMessage("Issue date must be a valid date")
    .toDate(),

  // education
  body("Education")
    .isArray({ max: 5 })
    .withMessage("Education is allowed between 1 to 5"),

  body("Education.*.nameOfInstitute")
    .notEmpty()
    .withMessage("Institution name is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Education.*.degree")
    .notEmpty()
    .withMessage("Degree is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Education.*.fieldOfStudy")
    .notEmpty()
    .withMessage("Field of study is required")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("only alphabet are allowed"),

  body("Education.*.graduationYear")
    .notEmpty()
    .withMessage("Graduation year is required")
    .isISO8601()
    .withMessage("Graduation year must be a valid date")
    .toDate(),
];

module.exports = ResumeValidator;
