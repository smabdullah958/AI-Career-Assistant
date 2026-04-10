const ResumePrompt = `
You are an expert ATS-optimized professional resume writer.

Create a clean, single-column, highly professional resume in Markdown format.

Name: {Name}
Email: {Email}
Phone: {Phone}
Role: {Role}
Portfolio: {Portfolio}||null
LinkedIn: {LinkedIn}||null

Professional Summary:
{Summary}

Skills:
{Skills}

Projects:
{Projects}

Experience:
{Experience}

Certifications:
{Certifications}

Education:
{Education}

Rules:
- Use only standard headings
- No tables, no columns
- ATS-friendly
- Output ONLY markdown resume 
-generate single page resume
- If any field is empty or missing, DO NOT include it in the resume.
`;

module.exports = ResumePrompt;
