"use client";

import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const ModernDownloadPDF = ({ response = {} }) => {
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

    // =========================================================
    // MODERN CV GEOMETRY
    // =========================================================

    // Header remains full width
    const headerHeight = 32;

    // Sidebar starts from the absolute left edge
    const sidebarX = 0;

    // Sidebar width
    const sidebarWidth = 64;

    // Space between sidebar and main content
    const columnGap = 7;

    // Sidebar internal padding
    const sidebarPaddingX = 6.5;
    const sidebarPaddingY = 8;

    // Main content right margin
    const mainRightMargin = 16;

    // Main content top padding
    const mainPaddingY = 8;

    // Main content starts after sidebar + gap
    const mainX = sidebarX + sidebarWidth + columnGap;

    // Sidebar content width
    const sidebarContentWidth = sidebarWidth - sidebarPaddingX * 2;

    // Main content width
    const mainWidth = pageWidth - mainX - mainRightMargin;

    // =========================================================
    // COLORS
    // =========================================================

    const colors = {
      dark: [32, 36, 43],
      gold: [212, 169, 0],
      text: [41, 45, 53],
      body: [63, 66, 72],
      muted: [105, 119, 142],
      sidebar: [241, 240, 236],
      white: [255, 255, 255],
    };

    // =========================================================
    // DATA
    // =========================================================

    const skills = (response.Skills || [])
      .map((skill) => skill?.value)
      .filter(Boolean);

    const experiences = (response.Experience || []).filter(
      (experience) => experience?.CompanyName,
    );

    const projects = (response.Projects || []).filter(
      (project) => project?.title,
    );

    const education = (response.Education || []).filter(
      (item) => item?.nameOfInstitute,
    );

    const certifications = (response.Certifications || []).filter(
      (cert) => cert?.CertifcateName,
    );

    // =========================================================
    // HELPERS
    // =========================================================

    const font = (size = 9, style = "normal") => {
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
    };

    const textColor = (color) => {
      pdf.setTextColor(...color);
    };

    const fillColor = (color) => {
      pdf.setFillColor(...color);
    };

    // =========================================================
    // MODERN SECTION TITLE
    // =========================================================

    const drawSectionTitle = (
      title,
      x,
      currentY,
      width,
      color = colors.text,
    ) => {
      textColor(color);

      font(9.75, "bold");

      pdf.setCharSpace(1.4);

      pdf.text(title.toUpperCase(), x, currentY);

      pdf.setCharSpace(0);

      pdf.setDrawColor(...color);
      pdf.setLineWidth(0.4);

      pdf.line(x, currentY + 3.2, x + width, currentY + 3.2);

      return currentY + 9;
    };

    // =========================================================
    // SIDEBAR TITLE
    // =========================================================

    const drawSidebarTitle = (title, x, currentY, width) => {
      textColor(colors.text);

      font(9, "bold");

      pdf.setCharSpace(1.5);

      pdf.text(title.toUpperCase(), x, currentY);

      pdf.setCharSpace(0);

      pdf.setDrawColor(...colors.gold);
      pdf.setLineWidth(0.45);

      pdf.line(x, currentY + 3, x + width, currentY + 3);

      return currentY + 9;
    };

    // =========================================================
    // WRAPPED TEXT
    // =========================================================

    const wrapText = (text, width, size = 8.5) => {
      font(size, "normal");

      return pdf.splitTextToSize(String(text), width);
    };

    // =========================================================
    // PARAGRAPH
    // =========================================================

    const drawParagraph = (
      text,
      x,
      currentY,
      width,
      size = 8.8,
      lineHeight = 3.7,
    ) => {
      if (!text) return currentY;

      const lines = wrapText(text, width, size);

      textColor(colors.body);

      pdf.text(lines, x, currentY);

      return currentY + lines.length * lineHeight;
    };

    // =========================================================
    // BULLETS
    // =========================================================

    const drawBullets = (description, x, currentY, width, size = 8.5) => {
      if (!description) return currentY;

      const items = String(description)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      let yPosition = currentY;

      items.forEach((item) => {
        const lines = wrapText(item, width - 6, size);

        // Bullet
        fillColor(colors.text);

        pdf.circle(x + 1.2, yPosition - 1.1, 0.65, "F");

        // Text
        textColor(colors.body);

        pdf.text(lines, x + 4.5, yPosition);

        // Line height
        yPosition += lines.length * 3.15;

        // Gap between bullets
        yPosition += 0.8;
      });

      return yPosition;
    };

    // =========================================================
    // BACKGROUND
    // =========================================================

    // ---------------------------------------------------------
    // FULL WIDTH DARK HEADER
    // ---------------------------------------------------------

    fillColor(colors.dark);

    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    // ---------------------------------------------------------
    // FULL LEFT SIDEBAR
    // ---------------------------------------------------------

    fillColor(colors.sidebar);

    pdf.rect(
      sidebarX,
      headerHeight,
      sidebarWidth,
      pageHeight - headerHeight,
      "F",
    );

    // ---------------------------------------------------------
    // GOLD SIDEBAR BORDER
    // IMPORTANT:
    // No margin here.
    // Sidebar starts at 0, therefore the border must also
    // use sidebarWidth directly.
    // ---------------------------------------------------------

    fillColor(colors.gold);

    pdf.rect(
      sidebarWidth - 0.8,
      headerHeight,
      0.8,
      pageHeight - headerHeight,
      "F",
    );

    // =========================================================
    // HEADER
    // =========================================================

    textColor(colors.white);

    font(30, "bold");

    pdf.text(response.name || "Your Name", pageWidth / 2, 12.8, {
      align: "center",
    });

    // =========================================================
    // ROLE
    // =========================================================

    textColor(colors.gold);

    font(14, "bold");

    // IMPORTANT:
    // No excessive character spacing.
    pdf.setCharSpace(0);

    pdf.text(
      String(response.Role || "Your Role").toUpperCase(),
      pageWidth / 2,
      20.5,
      {
        align: "center",
      },
    );

    pdf.setCharSpace(0);

    // =========================================================
    // SIDEBAR
    // =========================================================

    let sidebarY = headerHeight + sidebarPaddingY;

    // IMPORTANT:
    // Sidebar starts at X=0.
    // Therefore content uses ONLY sidebarPaddingX.
    const sidebarContentX = sidebarX + sidebarPaddingX;

    // =========================================================
    // CONTACT
    // =========================================================

    sidebarY = drawSidebarTitle(
      "Contact",
      sidebarContentX,
      sidebarY,
      sidebarContentWidth,
    );

    const contactItems = [
      response.email,
      response.phone,
      response.address,
      response.portfolio,
      response.Linkedin,
    ].filter(Boolean);

    contactItems.forEach((item) => {
      const lines = wrapText(item, sidebarContentWidth, 9);

      textColor(colors.body);

      pdf.text(lines, sidebarContentX, sidebarY);

      sidebarY += lines.length * 3.5;

      sidebarY += 2;
    });

    // =========================================================
    // SKILLS
    // =========================================================

    if (skills.length) {
      sidebarY += 5;

      sidebarY = drawSidebarTitle(
        "Skills",
        sidebarContentX,
        sidebarY,
        sidebarContentWidth,
      );

      skills.forEach((skill) => {
        const lines = wrapText(skill, sidebarContentWidth - 7, 9);

        // Gold bullet
        fillColor(colors.gold);

        pdf.circle(sidebarContentX + 1, sidebarY - 1.1, 0.7, "F");

        textColor(colors.body);

        pdf.text(lines, sidebarContentX + 4, sidebarY);

        sidebarY += lines.length * 3.5;

        sidebarY += 1.2;
      });
    }

    // =========================================================
    // EDUCATION
    // =========================================================

    if (education.length) {
      sidebarY += 5;

      sidebarY = drawSidebarTitle(
        "Education",
        sidebarContentX,
        sidebarY,
        sidebarContentWidth,
      );

      education.forEach((item) => {
        // Degree
        textColor(colors.text);

        font(9.75, "bold");

        pdf.text(item.degree || "Degree", sidebarContentX, sidebarY);

        // Graduation year
        if (item.graduationYear) {
          textColor(colors.gold);

          font(7.5, "normal");

          pdf.text(
            String(item.graduationYear),
            sidebarContentX + sidebarContentWidth,
            sidebarY,
            {
              align: "right",
            },
          );
        }

        sidebarY += 4;

        // Institute
        if (item.nameOfInstitute) {
          const lines = wrapText(
            item.nameOfInstitute,
            sidebarContentWidth,
            8.5,
          );

          textColor(colors.body);

          pdf.text(lines, sidebarContentX, sidebarY);

          sidebarY += lines.length * 3.25;
        }

        // Field
        if (item.fieldOfStudy) {
          const lines = wrapText(item.fieldOfStudy, sidebarContentWidth, 8.5);

          textColor(colors.body);

          pdf.text(lines, sidebarContentX, sidebarY);

          sidebarY += lines.length * 3.25;
        }

        // Education gap
        sidebarY += 3;
      });
    }

    // =========================================================
    // CERTIFICATIONS
    // =========================================================

    if (certifications.length) {
      sidebarY += 5;

      sidebarY = drawSidebarTitle(
        "Certifications",
        sidebarContentX,
        sidebarY,
        sidebarContentWidth,
      );

      certifications.forEach((cert) => {
        const certificationText = cert.IssueDate
          ? `${cert.CertifcateName} ${cert.IssueDate}`
          : cert.CertifcateName;

        const lines = wrapText(certificationText, sidebarContentWidth, 8.5);

        textColor(colors.body);

        pdf.text(lines, sidebarContentX, sidebarY);

        sidebarY += lines.length * 3.3;

        sidebarY += 1.5;
      });
    }

    // =========================================================
    // MAIN CONTENT
    // =========================================================

    let mainY = headerHeight + mainPaddingY;

    // =========================================================
    // SUMMARY
    // =========================================================

    if (response.Summary) {
      mainY = drawSectionTitle("Summary", mainX, mainY, mainWidth);

      mainY = drawParagraph(response.Summary, mainX, mainY, mainWidth, 9, 3.7);

      mainY += 4;
    }

    // =========================================================
    // EXPERIENCE
    // =========================================================

    if (experiences.length) {
      mainY = drawSectionTitle("Experience", mainX, mainY, mainWidth);

      experiences.forEach((experience, index) => {
        // ---------------------------------------------------
        // JOB TITLE
        // ---------------------------------------------------

        textColor(colors.text);

        font(9.75, "bold");

        pdf.text(experience.Role || "Job Position", mainX, mainY);

        mainY;

        // ---------------------------------------------------
        // DATE
        // ---------------------------------------------------

        if (experience.StartDate || experience.EndDate) {
          const dateText = [
            experience.StartDate || "",
            experience.StartDate ? "-" : "",
            experience.EndDate || "Present",
          ]
            .filter(Boolean)
            .join(" ");

          textColor(colors.muted);

          font(7.5, "normal");

          pdf.text(dateText, pageWidth - mainRightMargin, mainY, {
            align: "right",
          });
        }

        mainY += 3.5;

        // ---------------------------------------------------
        // COMPANY
        // ---------------------------------------------------

        textColor([155, 123, 0]);

        font(8.25, "bold");

        pdf.text(experience.CompanyName, mainX, mainY);

        mainY += 4;

        // ---------------------------------------------------
        // DESCRIPTION
        // ---------------------------------------------------

        mainY = drawBullets(
          experience.Description,
          mainX,
          mainY,
          mainWidth,
          8.25,
        );

        // Space between experiences
        if (index < experiences.length - 1) {
          mainY += 5;
        }
      });

      mainY += 5;
    }

    // =========================================================
    // PROJECTS
    // =========================================================

    if (projects.length) {
      mainY = drawSectionTitle("Projects", mainX, mainY, mainWidth);

      projects.forEach((project, index) => {
        // ---------------------------------------------------
        // PROJECT TITLE
        // ---------------------------------------------------

        textColor(colors.text);
        font(9, "bold");

        pdf.text(project.title, mainX, mainY);

        mainY += 4;

        // ---------------------------------------------------
        // DESCRIPTION
        // ---------------------------------------------------

        if (project.description) {
          const descriptionLines = wrapText(
            project.description,
            mainWidth,
            8.25,
          );

          textColor(colors.body);

          pdf.text(descriptionLines, mainX, mainY);

          // Move to the end of description
          mainY += descriptionLines.length * 3.2;

          // Small controlled gap before links
          mainY += 1.5;
        }

        // ---------------------------------------------------
        // LIVE DEMO
        // ---------------------------------------------------

        if (project.link) {
          textColor(colors.muted);
          font(7, "normal");

          const liveDemoText = `Live Demo: ${project.link}`;

          const liveDemoLines = pdf.splitTextToSize(liveDemoText, mainWidth);

          pdf.text(liveDemoLines, mainX, mainY);

          mainY += liveDemoLines.length * 3;
        }

        // ---------------------------------------------------
        // GITHUB
        // ---------------------------------------------------

        if (project.Github) {
          textColor(colors.muted);
          font(7, "normal");

          const githubText = `GitHub: ${project.Github}`;

          const githubLines = pdf.splitTextToSize(githubText, mainWidth);

          pdf.text(githubLines, mainX, mainY);

          mainY += githubLines.length * 3;
        }

        // ---------------------------------------------------
        // SPACE BETWEEN PROJECTS
        // ---------------------------------------------------

        if (index < projects.length - 1) {
          mainY += 3;
        }
      });

      mainY += 2;
    }

    // =========================================================
    // DOWNLOAD
    // =========================================================
    console.log("PDF pages:", pdf.getNumberOfPages());
    console.log("PDF size:", pdf.output("blob").size);

    pdf.save("Modern-Resume.pdf");
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

export default ModernDownloadPDF;
