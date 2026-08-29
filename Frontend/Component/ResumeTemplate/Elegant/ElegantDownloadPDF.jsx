"use client";

import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const ElegantDownloadPDF = ({ response = {} }) => {
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
    // CV GEOMETRY
    // =========================================================

    const headerHeight = 32;

    const sidebarX = 0;

    const sidebarWidth = 64;

    const columnGap = 7;

    const sidebarPaddingX = 6.5;
    const sidebarPaddingY = 8;

    const mainRightMargin = 16;

    const mainPaddingY = 8;

    const mainX = sidebarX + sidebarWidth + columnGap;

    const sidebarContentWidth = sidebarWidth - sidebarPaddingX * 2;

    const mainWidth = pageWidth - mainX - mainRightMargin;

    // =========================================================
    // COLORS
    // =========================================================
    // These colors now match the Preview component
    // =========================================================

    const colors = {
      // Preview:
      // text-[#292d35]
      primary: [41, 45, 53],

      // Preview:
      secondary: [105, 119, 142],

      // Preview:
      // text-[#444]
      muted: [68, 68, 68],

      // Preview:
      // text-[#555]
      lightMuted: [85, 85, 85],

      // Preview:
      // text-[#69778e]
      date: [105, 119, 142],

      // Preview:
      // text-black
      black: [0, 0, 0],

      // Preview:
      // bg-white
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

    const font = (size = 9, style = "bold") => {
      pdf.setFont("helvetica", style);
      pdf.setFontSize(size);
    };

    const textColor = (color = colors.black) => {
      pdf.setTextColor(...color);
    };

    const fillColor = (color = colors.white) => {
      pdf.setFillColor(...color);
    };

    // =========================================================
    // SECTION TITLE
    // =========================================================

    const drawSectionTitle = (title, x, currentY, width) => {
      // Preview:
      // text-black

      textColor(colors.black);

      font(9.75, "bold");

      pdf.setCharSpace(1.4);

      pdf.text(title.toUpperCase(), x, currentY);

      pdf.setCharSpace(0);

      // Preview:
      // black divider

      pdf.setDrawColor(...colors.black);
      pdf.setLineWidth(0.4);

      pdf.line(x, currentY + 3.2, x + width, currentY + 3.2);

      return currentY + 9;
    };

    // =========================================================
    // SIDEBAR TITLE
    // =========================================================

    const drawSidebarTitle = (title, x, currentY, width) => {
      // Preview:
      // text-black

      textColor(colors.black);

      font(9, "bold");

      pdf.setCharSpace(1.5);

      pdf.text(title.toUpperCase(), x, currentY);

      pdf.setCharSpace(0);

      // Preview:
      // black line

      pdf.setDrawColor(...colors.black);
      pdf.setLineWidth(0.45);

      pdf.line(x, currentY + 3, x + width, currentY + 3);

      return currentY + 9;
    };

    // =========================================================
    // WRAPPED TEXT
    // =========================================================

    const wrapText = (text, width, size = 8.5) => {
      font(size, "bold");

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

      // Preview:
      // text-[#3f4248]

      textColor(colors.secondary);

      font(size, "bold");

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

        // Preview:
        // bullet is black

        fillColor(colors.black);

        pdf.circle(x + 1.2, yPosition - 1.1, 0.65, "F");

        // Preview:
        // Description text-[#3f4248]

        textColor(colors.secondary);

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
    // WHITE FULL PAGE
    // ---------------------------------------------------------

    fillColor(colors.white);

    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // ---------------------------------------------------------
    // BLACK HEADER
    // ---------------------------------------------------------

    fillColor(colors.white);

    pdf.rect(0, 0, pageWidth, headerHeight, "F");

    // ---------------------------------------------------------
    // WHITE SIDEBAR
    // ---------------------------------------------------------

    fillColor(colors.white);

    pdf.rect(
      sidebarX,
      headerHeight,
      sidebarWidth,
      pageHeight - headerHeight,
      "F",
    );

    // ---------------------------------------------------------
    // BLACK SIDEBAR BORDER
    // ---------------------------------------------------------

    fillColor(colors.black);

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

    // Preview:
    // header text-black

    textColor(colors.black);

    // NAME
    font(30, "bold");

    pdf.text(response.name || "Your Name", pageWidth / 2, 12.8, {
      align: "center",
    });

    // =========================================================
    // ROLE
    // =========================================================

    // Preview:
    // role text-black

    textColor(colors.black);

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
    // SIDEBAR
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

      // Preview:
      // Contact inherits #292d35

      textColor(colors.primary);

      font(9, "bold");

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

        // Preview:
        // bullet is black

        fillColor(colors.black);

        pdf.circle(sidebarContentX + 1, sidebarY - 1.1, 0.7, "F");

        // Preview:
        // skill text-[#444]

        textColor(colors.muted);

        font(9, "bold");

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
        // =====================================================
        // DEGREE
        // =====================================================

        // Preview:
        // text-[#292d35]

        textColor(colors.primary);

        font(9.75, "bold");

        pdf.text(item.degree || "Degree", sidebarContentX, sidebarY);

        // =====================================================
        // GRADUATION YEAR
        // =====================================================

        if (item.graduationYear) {
          // Preview:
          // text-black

          textColor(colors.black);

          font(7.5, "bold");

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

        // =====================================================
        // INSTITUTE
        // =====================================================

        if (item.nameOfInstitute) {
          const lines = wrapText(
            item.nameOfInstitute,
            sidebarContentWidth,
            8.5,
          );

          // Preview:
          // text-black

          textColor(colors.black);

          font(8.5, "bold");

          pdf.text(lines, sidebarContentX, sidebarY);

          sidebarY += lines.length * 3.25;
        }

        // =====================================================
        // FIELD OF STUDY
        // =====================================================

        if (item.fieldOfStudy) {
          const lines = wrapText(item.fieldOfStudy, sidebarContentWidth, 8.5);

          // Preview:
          // text-[#555]

          textColor(colors.lightMuted);

          font(8.5, "bold");

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

        // Preview:
        // certification text-[#444]

        textColor(colors.muted);

        font(8.5, "bold");

        pdf.text(nameLines, sidebarContentX, sidebarY);

        sidebarY += nameLines.length * 3.3;

        // =====================================================
        // ISSUE DATE
        // =====================================================

        if (cert.IssueDate) {
          const dateLines = wrapText(cert.IssueDate, sidebarContentWidth, 8.5);

          // Preview:
          // date text-[#555]

          textColor(colors.lightMuted);

          font(8.5, "bold");

          pdf.text(dateLines, sidebarContentX, sidebarY);

          sidebarY += dateLines.length * 3.3;
        }

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

      // Preview:
      // text-[#3f4248]

      mainY = drawParagraph(response.Summary, mainX, mainY, mainWidth, 9, 3.7);

      mainY += 4;
    }

    // =========================================================
    // EXPERIENCE
    // =========================================================

    if (experiences.length) {
      mainY = drawSectionTitle("Experience", mainX, mainY, mainWidth);

      experiences.forEach((experience, index) => {
        // =====================================================
        // JOB TITLE
        // =====================================================

        // Preview:
        // text-[#292d35]

        textColor(colors.primary);

        font(9.75, "bold");

        pdf.text(experience.Role || "Job Position", mainX, mainY);

        // =====================================================
        // DATE
        // =====================================================

        if (experience.StartDate || experience.EndDate) {
          const dateText = [
            experience.StartDate || "",
            experience.StartDate ? "-" : "",
            experience.EndDate || "Present",
          ]
            .filter(Boolean)
            .join(" ");

          // Preview:
          // text-[#69778e]

          textColor(colors.date);

          font(7.5, "bold");

          pdf.text(dateText, pageWidth - mainRightMargin, mainY, {
            align: "right",
          });
        }

        mainY += 3.5;

        // =====================================================
        // COMPANY NAME
        // =====================================================

        // Preview:
        // text-black

        textColor(colors.black);

        font(8.25, "bold");

        pdf.text(experience.CompanyName, mainX, mainY);

        mainY += 4;

        // =====================================================
        // DESCRIPTION
        // =====================================================

        mainY = drawBullets(
          experience.Description,
          mainX,
          mainY,
          mainWidth,
          8.25,
        );

        // =====================================================
        // SPACE
        // =====================================================

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
        // =====================================================
        // PROJECT TITLE
        // =====================================================

        // Preview:
        // text-[#292d35]

        textColor(colors.primary);

        font(9, "bold");

        pdf.text(project.title, mainX, mainY);

        mainY += 4;

        // =====================================================
        // PROJECT DESCRIPTION
        // =====================================================

        if (project.description) {
          const descriptionLines = wrapText(
            project.description,
            mainWidth,
            8.25,
          );

          // Preview:
          // text-[#3f4248]

          textColor(colors.secondary);

          font(8.25, "bold");

          pdf.text(descriptionLines, mainX, mainY);

          mainY += descriptionLines.length * 3.2;

          mainY += 1.5;
        }

        // =====================================================
        // LIVE DEMO
        // =====================================================

        if (project.link) {
          // Preview:
          // text-[#292d35]

          textColor(colors.primary);

          font(7, "bold");

          const liveDemoText = `Live Demo: ${project.link}`;

          const liveDemoLines = pdf.splitTextToSize(liveDemoText, mainWidth);

          pdf.text(liveDemoLines, mainX, mainY);

          mainY += liveDemoLines.length * 3;
        }

        // =====================================================
        // GITHUB
        // =====================================================

        if (project.Github) {
          // Preview:
          // text-[#292d35]

          textColor(colors.primary);

          font(7, "bold");

          const githubText = `GitHub: ${project.Github}`;

          const githubLines = pdf.splitTextToSize(githubText, mainWidth);

          pdf.text(githubLines, mainX, mainY);

          mainY += githubLines.length * 3;
        }

        // =====================================================
        // SPACE BETWEEN PROJECTS
        // =====================================================

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

    pdf.save("Elegant-Resume.pdf");
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

export default ElegantDownloadPDF;
