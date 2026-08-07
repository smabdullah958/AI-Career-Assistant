
"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const DownloadPDF = () => {
  const { success } = useSelector((state) => state.ResumeSlice);

  const download = async () => {
    const element = document.getElementById("resumePDF");

    if (!element) {
      console.error("Resume element not found");
      return;
    }

    // Store original width
    const originalWidth = element.style.width;

    try {
      // Force a fixed width while generating the image
      element.style.width = "1024px";

      const dataUrl = await toPng(element, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 3,
      });

      // Restore original width
      element.style.width = originalWidth;

      // Create A4 PDF
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;

      // Small padding
      const padding = 5;

      const availableWidth = pageWidth - padding * 2;
      const availableHeight = pageHeight - padding * 2;

      // Create image
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        // Original image dimensions
        const imageWidth = img.width;
        const imageHeight = img.height;

        // Calculate image ratio
        const imageRatio = imageWidth / imageHeight;

        // Calculate PDF dimensions while maintaining aspect ratio
        let pdfImageWidth = availableWidth;
        let pdfImageHeight = pdfImageWidth / imageRatio;

        /*
         * If the resume is taller than the available A4 height,
         * scale it down so the COMPLETE resume fits on ONE page.
         */
        if (pdfImageHeight > availableHeight) {
          pdfImageHeight = availableHeight;
          pdfImageWidth = pdfImageHeight * imageRatio;
        }

        // Center the resume horizontally
        const x = (pageWidth - pdfImageWidth) / 2;

        // Center vertically
        const y = (pageHeight - pdfImageHeight) / 2;

        // Add complete resume to the PDF
        pdf.addImage(img, "PNG", x, y, pdfImageWidth, pdfImageHeight);

        // Download
        pdf.save("Resume.pdf");
      };

      img.onerror = (error) => {
        console.error("Failed to load resume image", error);

        // Restore width if image loading fails
        element.style.width = originalWidth;
      };
    } catch (error) {
      console.error("Error generating PDF:", error);

      // Always restore original width
      element.style.width = originalWidth;
    }
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
