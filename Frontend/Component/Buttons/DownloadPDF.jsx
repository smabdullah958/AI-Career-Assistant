"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const DownloadPDF = () => {
  const { success } = useSelector((state) => state.ResumeSlice);

  const download = async () => {
    const element = document.getElementById("resumePDF");

    if (!element) {
      alert("Generate resume first!");
      return;
    }

    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = 210;
        const pageHeight = 297;
        const padding = 5; // 10mm padding for top and bottom

        // Height of content that actually fits on one page
        const effectivePageHeight = pageHeight - padding * 2;
        const imgHeight = (img.height * imgWidth) / img.width;

        let heightLeft = imgHeight;
        let pageCount = 1;

        // --- PAGE 1 ---
        // Add the image starting at the top padding
        pdf.addImage(img, "PNG", 0, padding, imgWidth, imgHeight);

        // CLEANUP PAGE 1: Cover the top and bottom padding with white bars
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, 210, padding, "F"); // Top cover
        pdf.rect(0, pageHeight - padding, 210, padding, "F"); // Bottom cover

        heightLeft -= effectivePageHeight;

        // --- PAGE 2 ---
        if (heightLeft > 0 && pageCount < 2) {
          pdf.addPage();

          // To stop repeating lines, we shift by the exact content height shown on Page 1
          // Then add 'padding' to respect the top gap of Page 2
          const position = -effectivePageHeight + padding;

          pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);

          // CLEANUP PAGE 2: Cover the top and bottom padding with white bars
          pdf.setFillColor(255, 255, 255);
          pdf.rect(0, 0, 210, padding, "F"); // Top cover
          pdf.rect(0, pageHeight - padding, 210, padding, "F"); // Bottom cover

          pageCount++;
        }

        pdf.save("Resume.pdf");
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={download}
      disabled={!success}
      className={`px-4 py-2 rounded-lg text-white font-bold
        ${
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
