"use client";

import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const ProfessionalDownloadPDF = ({ response = {} }) => {
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
    // IMPORTANT:
    // ONLY COLUMN POSITION HAS BEEN SWAPPED
    // NO PADDING / MARGIN / GAP VALUES CHANGED
    // =========================================================

    // Header remains full width
    const headerHeight = 32;

    // ---------------------------------------------------------
    // MAIN CONTENT IS NOW ON THE LEFT
    // ---------------------------------------------------------

    // This keeps the same 16mm margin value.
    // It is now used as the LEFT position of main content.
    const mainLeftMargin = 16;

    let mainPaddingY = 10;

    // Space between main content and sidebar
    // SAME VALUE AS BEFORE
    const columnGap = 7;

    // ---------------------------------------------------------
    // SIDEBAR
    // ---------------------------------------------------------

    // SAME sidebar width
    const sidebarWidth = 64;

    // SAME sidebar internal padding
    const sidebarPaddingX = 6.5;
    const sidebarPaddingY = 8;

    // ---------------------------------------------------------
    // MAIN CONTENT
    // ---------------------------------------------------------

    // SAME main content width calculation/value
    // Previous mainWidth was:
    // pageWidth - mainX - mainRightMargin
    //
    // Previous result:
    // 210 - 71 - 16 = 123mm
    //
    // We keep that exact 123mm width.
    const mainWidth = 123;

    // Main content now starts from LEFT
    const mainX = mainLeftMargin;

    // Sidebar now starts after:
    // main content + column gap
    const sidebarX = mainX + mainWidth + columnGap;

    // Sidebar content width remains EXACTLY the same
    const sidebarContentWidth = sidebarWidth - sidebarPaddingX * 2;

    // Main content right edge
    const mainRightX = mainX + mainWidth;

    // =========================================================
    // COLORS
    // =========================================================

    const colors = {
      accent: [15, 54, 101],

      gold: [28, 82, 143],

      text: [20, 20, 20],

      body: [25, 25, 25],

      muted: [105, 105, 105],

      brown: [18, 75, 139],

      sidebar: [239, 246, 255],

      white: [255, 255, 255],

      divider: [108, 161, 215],

      textMed: [25, 25, 25],

      textLight: [45, 86, 130],

      black: [15, 54, 101],

      header: [13, 52, 98],
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
    // MAIN SECTION TITLE
    // =========================================================

    const drawSectionTitle = (
      title,
      x,
      currentY,
      width,
      color = colors.accent,
      lineColor = colors.divider,
    ) => {
      textColor(color);

      font(9.75, "bold");

      pdf.setCharSpace(1.4);

      pdf.text(title.toUpperCase(), x, currentY);

      pdf.setCharSpace(0);

      pdf.setDrawColor(...lineColor);
      pdf.setLineWidth(0.4);

      pdf.line(x, currentY + 3.2, x + width, currentY + 3.2);

      return currentY + 9;
    };

    // =========================================================
    // SIDEBAR TITLE
    // =========================================================

    const drawSidebarTitle = (title, x, currentY, width) => {
      textColor(colors.accent);

      font(9, "bold");

      pdf.setCharSpace(1.5);

      pdf.text(title.toUpperCase(), x, currentY);

      pdf.setCharSpace(0);

      pdf.setDrawColor(...colors.divider);
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

        fillColor(colors.gold);

        pdf.circle(x + 1.2, yPosition - 1.1, 0.65, "F");

        textColor(colors.body);

        pdf.text(lines, x + 4.5, yPosition);

        yPosition += lines.length * 3.15;

        yPosition += 0.8;
      });

      return yPosition;
    };

    // =========================================================
    // BACKGROUND
    // =========================================================

    // ---------------------------------------------------------
    // FULL WIDTH HEADER
    // ---------------------------------------------------------

    fillColor(colors.header);

    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    // ---------------------------------------------------------
    // RIGHT SIDEBAR
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
    // SIDEBAR BORDER
    // NOW BORDER IS ON THE LEFT SIDE OF RIGHT SIDEBAR
    // ---------------------------------------------------------

    fillColor(colors.accent);

    pdf.rect(sidebarX, headerHeight, 0.8, pageHeight - headerHeight, "F");

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

    textColor(colors.white);

    font(14, "bold");

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
    // RIGHT SIDEBAR
    // =========================================================

    let sidebarY = headerHeight + sidebarPaddingY;

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

      textColor(colors.text);

      pdf.text(lines, sidebarContentX, sidebarY);

      sidebarY += lines.length * 3.5;

      sidebarY += 2;
    });

    // =========================================================
    // SKILLS
    // =========================================================

    if (skills.length) {
      sidebarY += 3;

      sidebarY = drawSidebarTitle(
        "Skills",
        sidebarContentX,
        sidebarY,
        sidebarContentWidth,
      );

      skills.forEach((skill) => {
        const lines = wrapText(skill, sidebarContentWidth - 7, 9);

        fillColor(colors.gold);

        pdf.circle(sidebarContentX + 1, sidebarY - 1.1, 0.7, "F");

        textColor(colors.textMed);

        pdf.text(lines, sidebarContentX + 4, sidebarY);

        sidebarY += lines.length * 3.5;

        sidebarY += 1.2;
      });
    }

    // =========================================================
    // EDUCATION
    // =========================================================

    if (education.length) {
      sidebarY += 3;

      sidebarY = drawSidebarTitle(
        "Education",
        sidebarContentX,
        sidebarY,
        sidebarContentWidth,
      );

      education.forEach((item) => {
        textColor(colors.text);

        font(9.75, "bold");

        pdf.text(item.degree || "Degree", sidebarContentX, sidebarY);

        if (item.graduationYear) {
          textColor(colors.muted);

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

        if (item.nameOfInstitute) {
          const lines = wrapText(
            item.nameOfInstitute,
            sidebarContentWidth,
            8.5,
          );

          textColor(colors.brown);

          pdf.text(lines, sidebarContentX, sidebarY);

          sidebarY += lines.length * 3.25;
        }

        if (item.fieldOfStudy) {
          const lines = wrapText(item.fieldOfStudy, sidebarContentWidth, 8.5);

          textColor(colors.textLight);

          pdf.text(lines, sidebarContentX, sidebarY);

          sidebarY += lines.length * 3.25;
        }

        sidebarY += 3;
      });
    }

    // =========================================================
    // CERTIFICATIONS
    // =========================================================

    if (certifications.length) {
      sidebarY += 3;

      sidebarY = drawSidebarTitle(
        "Certifications",
        sidebarContentX,
        sidebarY,
        sidebarContentWidth,
      );

      certifications.forEach((cert) => {
        const nameLines = wrapText(
          cert.CertifcateName,
          sidebarContentWidth,
          8.5,
        );

        textColor(colors.textMed);

        pdf.text(nameLines, sidebarContentX, sidebarY);

        sidebarY += nameLines.length * 3.3;

        if (cert.IssueDate) {
          const dateLines = wrapText(cert.IssueDate, sidebarContentWidth, 8.5);

          textColor(colors.muted);

          pdf.text(dateLines, sidebarContentX, sidebarY);

          sidebarY += dateLines.length * 3.3;
        }

        sidebarY += 1.5;
      });
    }

    // =========================================================
    // MAIN CONTENT
    // NOW ON LEFT
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

        // ---------------------------------------------------
        // DATE
        // IMPORTANT:
        // Date now aligns with MAIN CONTENT right edge.
        // No margin/gap changed.
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

          pdf.text(dateText, mainRightX, mainY, {
            align: "right",
          });
        }

        mainY += 3.5;

        // ---------------------------------------------------
        // COMPANY
        // ---------------------------------------------------

        textColor(colors.brown);

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

          mainY += descriptionLines.length * 3.2;

          mainY += 1.5;
        }

        // ---------------------------------------------------
        // LIVE DEMO
        // ---------------------------------------------------

        if (project.link) {
          textColor(colors.brown);

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
          textColor(colors.brown);

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

    pdf.save("Professional-Resume.pdf");
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

export default ProfessionalDownloadPDF;
