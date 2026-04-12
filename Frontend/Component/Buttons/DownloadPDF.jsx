
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
      });

      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(dataUrl);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={download}
      disabled={!success}
      className={`px-4 py-2 rounded-lg text-white
        ${
          success
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-indigo-200 cursor-not-allowed"
        }`}
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;
