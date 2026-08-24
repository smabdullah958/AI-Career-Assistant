"use client";

import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const DownloadPDF = ({ response = {} }) => {
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

    // Screenshot uses a compact page.
    const margin = 16;

    const contentWidth = pageWidth - margin * 2;

    const navy = [38, 57, 86];
    const textColor = [51, 51, 51];
    const lightGray = [238, 241, 245];

    let y = 10;

    // =========================================================
    // HELPERS
    // =========================================================

    const normalText = (size = 8.5) => {
      pdf.setFont("times", "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(...textColor);
    };

    const boldText = (size = 9) => {
      pdf.setFont("times", "bold");
      pdf.setFontSize(size);
      pdf.setTextColor(...textColor);
    };

    const navyText = (size = 8.5, style = "normal") => {
      pdf.setFont("times", style);
      pdf.setFontSize(size);
      pdf.setTextColor(...navy);
    };

    // =========================================================
    // SECTION TITLE
    // =========================================================

    const sectionTitle = (title) => {
      navyText(9, "bold");

      pdf.setCharSpace(0.7);

      pdf.text(title.toUpperCase(), margin, y);

      pdf.setCharSpace(0);

      y += 1.8;

      pdf.setDrawColor(...navy);
      pdf.setLineWidth(0.25);

      pdf.line(margin, y, pageWidth - margin, y);

      y += 5;
    };

    // =========================================================
    // WRAPPED TEXT
    // =========================================================

    const drawWrappedText = (text, x, startY, width, fontSize = 7) => {
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
        normalText(7);

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

    const rightText = (text, rightX, currentY, fontSize = 6.5) => {
      normalText(fontSize);

      pdf.text(String(text), rightX, currentY, {
        align: "right",
      });
    };

    // =========================================================
    // HEADER
    // =========================================================

    // NAME
    navyText(13, "bold");

    pdf.text(response.name || "S M ABDULLAH", margin, y);

    y += 5.5;

    // ROLE
    navyText(8, "normal");

    pdf.setCharSpace(1);

    pdf.text(
      String(response.Role || "AI POWERED FULLSTACK DEVELOPER").toUpperCase(),
      margin,
      y,
    );

    pdf.setCharSpace(0);

    y += 5;

    // =========================================================
    // CONTACT
    // =========================================================

    normalText(8);

    const contactItems = [
      response.email,
      response.phone,
      response.portfolio,
      response.Linkedin,
    ].filter(Boolean);

    let contactX = margin;

    contactItems.forEach((item, index) => {
      const value = String(item);

      pdf.text(value, contactX, y);

      contactX += pdf.getTextWidth(value);

      if (index < contactItems.length - 1) {
        contactX += 3.5;
      }
    });

    y += 4;

    // =========================================================
    // HEADER LINE
    // =========================================================

    pdf.setDrawColor(...navy);
    pdf.setLineWidth(0.35);

    pdf.line(margin, y, pageWidth - margin, y);

    y += 10;

    // =========================================================
    // SUMMARY
    // =========================================================

    if (response.Summary) {
      sectionTitle("Summary");

      y = drawWrappedText(response.Summary, margin, y, contentWidth, 8);

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

      // Increased box height
      const skillHeight = 8;

      // Increased vertical gap between rows
      const rowGap = 3;

      // Increased horizontal gap between boxes
      const boxGap = 3;

      skills.forEach((skill) => {
        normalText(8);

        const textWidth = pdf.getTextWidth(String(skill));

        const skillWidth = textWidth + 10;

        // New row
        if (skillX + skillWidth > pageWidth - margin) {
          skillX = margin;
          skillY += skillHeight + rowGap;
        }

        // Background
        pdf.setFillColor(...lightGray);

        pdf.roundedRect(
          skillX,
          skillY - 5,
          skillWidth,
          skillHeight,
          0.5,
          0.5,
          "F",
        );

        // Skill text
        navyText(8);

        // Vertically center the text inside the box
        const textY = skillY - 5 + skillHeight / 2 + 1.2;

        pdf.text(String(skill), skillX + 3, textY);

        // Increased horizontal gap
        skillX += skillWidth + boxGap;
      });

      y = skillY + skillHeight + 6;
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

        boldText(9);

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

        boldText(8.5);

        pdf.text(experience.CompanyName, margin, y);

        y += 4;

        // ---------------------------------------------------
        // DESCRIPTION
        // ---------------------------------------------------

        if (experience.Description) {
          normalText(8.5);
          y = drawBullets(experience.Description, margin, y, contentWidth);
        }

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
        // Project title
        boldText(9.5);

        pdf.text(project.title, margin, y);

        y += 3.5;

        // Description
        if (project.description) {
          normalText(8.5);

          y = drawWrappedText(project.description, margin, y, contentWidth, 8);

          // Small gap before links
          y += 1.5;
        }

        // Live Demo
        if (project.link) {
          navyText(8);

          pdf.text(`Live Demo: ${String(project.link)}`, margin, y);

          y += 3;
        }

        // GitHub
        if (project.Github) {
          navyText(8);

          pdf.text(`GitHub: ${String(project.Github)}`, margin, y);

          y += 3;
        }

        // More space between projects
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
        navyText(8.5, "bold");

        pdf.setCharSpace(0.7);

        pdf.text("EDUCATION", leftX, columnTopY);

        pdf.setCharSpace(0);

        pdf.setDrawColor(...navy);

        pdf.setLineWidth(0.25);

        pdf.line(
          leftX,
          columnTopY + 1.8,
          leftX + columnWidth,
          columnTopY + 1.8,
        );

        let educationY = columnTopY + 6;

        education.forEach((item) => {
          boldText(9);

          pdf.text(item.degree || "Degree", leftX, educationY);

          if (item.graduationYear) {
            rightText(
              item.graduationYear,
              leftX + columnWidth,
              educationY,
              8.5,
            );
          }

          educationY += 4.5;

          normalText(8.5);

          const instituteLines = pdf.splitTextToSize(
            String(item.nameOfInstitute),
            columnWidth,
          );

          pdf.text(instituteLines, leftX, educationY);

          educationY += instituteLines.length * 3;

          if (item.fieldOfStudy) {
            normalText(8.5);

            const fieldLines = pdf.splitTextToSize(
              String(item.fieldOfStudy),
              columnWidth,
            );

            pdf.text(fieldLines, leftX, educationY);

            educationY += fieldLines.length * 3;
          }

          educationY += 2;
        });
      }

      // =======================================================
      // CERTIFICATIONS
      // =======================================================

      if (certifications.length) {
        navyText(8.5, "bold");

        pdf.setCharSpace(0);

        pdf.text("CERTIFICATIONS", rightX, columnTopY);

        pdf.setCharSpace(0);

        pdf.setDrawColor(...navy);

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

    pdf.save("Classical-Resume.pdf");
  };

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

export default DownloadPDF;
