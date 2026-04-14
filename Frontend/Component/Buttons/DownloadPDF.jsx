"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";

const DownloadPDF = () => {
  const { success } = useSelector((state) => state.ResumeSlice);

  // const download = async () => {
  //   const element = document.getElementById("resumePDF");

  //   if (!element) {
  //     alert("Generate resume first!");
  //     return;
  //   }

  //   try {
  //     const dataUrl = await toPng(element, {
  //       cacheBust: true,
  //       backgroundColor: "#ffffff",
  //       pixelRatio: 2,
  //     });

  //     const pdf = new jsPDF("p", "mm", "a4");

  //     const imgProps = pdf.getImageProperties(dataUrl, "PNG", 0, 0, 210, 297);

  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("Resume.pdf");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        pixelRatio: 2,
      });

      const pdf = new jsPDF("p", "mm", "a4");

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidth = 210;
        const pageHeight = 297;

        const imgHeight = (img.height * imgWidth) / img.width;

        let heightLeft = imgHeight;
        let position = 0;
        let pageCount = 1;

        //  First page
        pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        //  Add second page ONLY if needed
        if (heightLeft > 0 && pageCount < 2) {
          pdf.addPage();
          position = heightLeft - imgHeight;
          pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
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
