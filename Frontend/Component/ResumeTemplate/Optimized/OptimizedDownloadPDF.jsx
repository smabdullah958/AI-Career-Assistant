"use client";

import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const OptimizedDownloadPDF = ({ response = {} }) => {
  const { success } = useSelector((state) => state.ResumeSlice || {});

  const download = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // =========================================================
    // PAGE
    // =========================================================

    const pageWidth = 210;
    const pageHeight = 297;

    const margin = 16;
    const contentWidth = pageWidth - margin * 2;

    // =========================================================
    // COLORS
    // =========================================================

    const teal = [14, 124, 115];
    const lightTeal = [230, 243, 241];
    const lightTealLine = [181, 218, 214];

    const textColor = [51, 51, 51];
    const mutedText = [85, 85, 85];
    const white = [255, 255, 255];

    // =========================================================
    // INITIAL Y POSITION
    // =========================================================

    let y = 7;

    // =========================================================
    // HELPERS
    // =========================================================

    const normalText = (size = 8.5) => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(...textColor);
    };

    const boldText = (size = 9) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(size);
      pdf.setTextColor(...textColor);
    };

    const tealText = (size = 8.5, style = "normal") => {
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
      pdf.setTextColor(...teal);
    };

    const mutedTextStyle = (size = 8) => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(...mutedText);
    };

    // =========================================================
    // SECTION TITLE
    // =========================================================

    const sectionTitle = (title) => {
      tealText(9, "bold");

      pdf.setCharSpace(0.7);

      pdf.text(title.toUpperCase(), margin, y);

      pdf.setCharSpace(0);

      // Light teal underline
      pdf.setDrawColor(...lightTealLine);
      pdf.setLineWidth(0.25);

      y += 1.8;

      pdf.line(margin, y, pageWidth - margin, y);

      y += 5;
    };

    // =========================================================
    // WRAPPED TEXT
    // =========================================================

    const drawWrappedText = (text, x, startY, width, fontSize = 8) => {
      normalText(fontSize);

      const lines = pdf.splitTextToSize(String(text), width);

      pdf.text(lines, x, startY);

      return startY + lines.length * 3.25;
    };

    // =========================================================
    // BULLET DESCRIPTION
    // =========================================================

    const drawBullets = (description, x, startY, width) => {
      if (!description) return startY;

      const items = String(description)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      let currentY = startY;

      items.forEach((item) => {
        normalText(8.5);

        pdf.text("•", x, currentY);

        const lines = pdf.splitTextToSize(item, width - 4);

        pdf.text(lines, x + 3.5, currentY);

        currentY += lines.length * 3.15;
      });

      return currentY;
    };

    // =========================================================
    // RIGHT ALIGNED TEXT
    // =========================================================

    const rightText = (text, rightX, currentY, fontSize = 8) => {
      normalText(fontSize);

      pdf.text(String(text), rightX, currentY, {
        align: "right",
      });
    };

    // =========================================================
    // HEADER
    // =========================================================

    const headerHeight = 32;

    // Teal header background
    pdf.setFillColor(...teal);

    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    // ---------------------------------------------------------
    // NAME
    // ---------------------------------------------------------

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(30);
    pdf.setTextColor(...white);

    pdf.text(response.name || "Abdullah", pageWidth / 2, 12.8, {
      align: "center",
    });

    // ---------------------------------------------------------
    // ROLE
    // ---------------------------------------------------------

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.setTextColor(...white);

    pdf.setCharSpace(1.5);

    pdf.text(
      String(response.Role || "Professional Title").toUpperCase(),
      pageWidth / 2,
      20.5,
      {
        align: "center",
      },
    );

    pdf.setCharSpace(0);

    // ---------------------------------------------------------
    // CONTACT INFORMATION
    // ---------------------------------------------------------

    const contactItems = [
      response.email,
      response.phone,
      response.address,
      response.portfolio,
      response.Linkedin,
    ].filter(Boolean);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...white);

    let contactX = 6;

    contactItems.forEach((item, index) => {
      const value = String(item);

      pdf.text(value, contactX, 27);

      contactX += pdf.getTextWidth(value);

      if (index < contactItems.length - 1) {
        contactX += 5;
      }
    });

    // =========================================================
    // CONTENT START
    // =========================================================

    y = headerHeight + 5;

    // =========================================================
    // SUMMARY
    // =========================================================

    if (response.Summary) {
      sectionTitle("Summary");

      y = drawWrappedText(response.Summary, margin, y, contentWidth, 8.5);

      y += 3;
    }

    // =========================================================
    // SKILLS
    // =========================================================

    const skills = (response.Skills || [])
      .map((skill) => skill?.value)
      .filter(Boolean);

    if (skills.length) {
      sectionTitle("Skills");

      let skillX = margin;
      let skillY = y + 3;

      const skillHeight = 7;
      const rowGap = 2.5;
      const boxGap = 2.5;

      skills.forEach((skill) => {
        normalText(8);

        const textWidth = pdf.getTextWidth(String(skill));

        const skillWidth = textWidth + 8;

        // New row
        if (skillX + skillWidth > pageWidth - margin) {
          skillX = margin;

          skillY += skillHeight + rowGap;
        }

        // Skill background
        pdf.setFillColor(...lightTeal);

        pdf.roundedRect(skillX, skillY - 5, skillWidth, skillHeight, 3, 3, "F");

        // Skill text
        tealText(8, "bold");

        const textY = skillY - 5 + skillHeight / 2 + 1.2;

        pdf.text(String(skill), skillX + 4, textY);

        skillX += skillWidth + boxGap;
      });

      y = skillY + skillHeight + 1;
    }

    // =========================================================
    // EXPERIENCE
    // =========================================================

    const experiences = (response.Experience || []).filter(
      (experience) => experience?.CompanyName,
    );

    if (experiences.length) {
      sectionTitle("Experience");

      experiences.forEach((experience) => {
        // ---------------------------------------------------
        // JOB TITLE
        // ---------------------------------------------------

        boldText(9.5);

        pdf.text(experience.Role || "Job Position", margin, y);

        // ---------------------------------------------------
        // DATE
        // ---------------------------------------------------

        const dateText = [
          experience.StartDate,
          experience.StartDate ? "-" : "",
          experience.EndDate || "Present",
        ]
          .filter(Boolean)
          .join(" ");

        if (dateText) {
          rightText(dateText, pageWidth - margin, y, 8);
        }

        y += 3.5;

        // ---------------------------------------------------
        // COMPANY
        // ---------------------------------------------------

        tealText(8.5, "bold");

        pdf.text(experience.CompanyName, margin, y);

        y += 4;

        // ---------------------------------------------------
        // DESCRIPTION
        // ---------------------------------------------------

        if (experience.Description) {
          y = drawBullets(experience.Description, margin, y, contentWidth);
        }

        // Preserve existing experience spacing
        y += 4;
      });
    }

    // =========================================================
    // PROJECTS
    // =========================================================

    const projects = (response.Projects || []).filter(
      (project) => project?.title,
    );

    if (projects.length) {
      sectionTitle("Projects");

      projects.forEach((project, index) => {
        // ---------------------------------------------------
        // PROJECT TITLE
        // ---------------------------------------------------

        boldText(9.5);

        pdf.text(project.title, margin, y);

        //space between the title and descirption
        y += 3.5;

        // ---------------------------------------------------
        // DESCRIPTION
        // ---------------------------------------------------

        if (project.description) {
          y = drawWrappedText(
            project.description,
            margin,
            y,
            contentWidth,
            8.5,
          );

          // Small gap before links
          y;
        }

        // ---------------------------------------------------
        // LIVE DEMO
        // ---------------------------------------------------

        if (project.link) {
          tealText(8);

          const liveDemoText = `Live Demo: ${String(project.link)}`;

          const liveDemoLines = pdf.splitTextToSize(liveDemoText, contentWidth);

          pdf.text(liveDemoLines, margin, y);

          y += liveDemoLines.length * 3;
        }

        // ---------------------------------------------------
        // GITHUB
        // ---------------------------------------------------

        if (project.Github) {
          tealText(8);

          const githubText = `GitHub: ${String(project.Github)}`;

          const githubLines = pdf.splitTextToSize(githubText, contentWidth);

          pdf.text(githubLines, margin, y);

          y += githubLines.length * 3;
        }

        // ---------------------------------------------------
        // SPACE BETWEEN PROJECTS
        // ---------------------------------------------------

        if (index < projects.length - 1) {
          y += 3;
        }
      });

      // Space after complete Projects section
      y += 3;
    }

    // =========================================================
    // EDUCATION + CERTIFICATIONS
    // =========================================================

    const education = (response.Education || []).filter(
      (item) => item?.nameOfInstitute,
    );

    const certifications = (response.Certifications || []).filter(
      (cert) => cert?.CertifcateName,
    );

    if (education.length || certifications.length) {
      const columnGap = 7;

      const columnWidth = (contentWidth - columnGap) / 2;

      const leftX = margin;

      const rightX = margin + columnWidth + columnGap;

      const columnTopY = y;

      // =======================================================
      // EDUCATION
      // =======================================================

      if (education.length) {
        tealText(8.5, "bold");

        pdf.setCharSpace(0.7);

        pdf.text("EDUCATION", leftX, columnTopY);

        pdf.setCharSpace(0);

        pdf.setDrawColor(...lightTealLine);

        pdf.setLineWidth(0.25);

        pdf.line(
          leftX,
          columnTopY + 1.8,
          leftX + columnWidth,
          columnTopY + 1.8,
        );

        let educationY = columnTopY + 6;

        education.forEach((item) => {
          // Degree
          boldText(9);

          pdf.text(item.degree || "Degree", leftX, educationY);

          // Graduation year
          if (item.graduationYear) {
            rightText(
              item.graduationYear,
              leftX + columnWidth,
              educationY,
              8.5,
            );
          }

          educationY += 4.5;

          // Field of study
          if (item.fieldOfStudy) {
            normalText(8.5);

            const fieldLines = pdf.splitTextToSize(
              String(item.fieldOfStudy),
              columnWidth,
            );

            pdf.text(fieldLines, leftX, educationY);

            educationY += fieldLines.length * 3;
          }

          // Institute
          normalText(8.5);

          const instituteLines = pdf.splitTextToSize(
            String(item.nameOfInstitute),
            columnWidth,
          );

          pdf.text(instituteLines, leftX, educationY);

          educationY += instituteLines.length * 3;

          // Education spacing
          educationY += 2;
        });
      }

      // =======================================================
      // CERTIFICATIONS
      // =======================================================

      if (certifications.length) {
        tealText(8.5, "bold");

        pdf.setCharSpace(0);

        pdf.text("CERTIFICATIONS", rightX, columnTopY);

        pdf.setCharSpace(0);

        pdf.setDrawColor(...lightTealLine);

        pdf.setLineWidth(0.25);

        pdf.line(
          rightX,
          columnTopY + 1.8,
          rightX + columnWidth,
          columnTopY + 1.8,
        );

        let certificationY = columnTopY + 6;

        certifications.forEach((cert) => {
          normalText(8.5);

          pdf.text("•", rightX, certificationY);

          const certificationText = cert.IssueDate
            ? `${cert.CertifcateName} (${cert.IssueDate})`
            : cert.CertifcateName;

          const lines = pdf.splitTextToSize(
            String(certificationText),
            columnWidth - 4,
          );

          pdf.text(lines, rightX + 3, certificationY);

          certificationY += lines.length * 3.1;

          certificationY += 0.8;
        });
      }
    }

    // =========================================================
    // DOWNLOAD
    // =========================================================

    pdf.save("Resume.pdf");
  };

  // =========================================================
  // BUTTON
  // =========================================================

  return (
    <button
      type="button"
      onClick={download}
      disabled={!success}
      className={`px-4 py-2 rounded-lg text-white font-bold transition-all duration-200 ${
        success
          ? "bg-indigo-500 hover:bg-indigo-600 shadow-md"
          : "bg-indigo-200 cursor-not-allowed"
      }`}
    >
      Download PDF
    </button>
  );
};

export default OptimizedDownloadPDF;
