// "use client";

// import { useSelector } from "react-redux";

// const DownloadPDF = () => {
//   let { success } = useSelector((state) => state.ResumeSlice);

//   let download = async () => {
//     //  dynamic import (runs only in browser)
//     const html2pdf = (await import("html2pdf.js")).default;

//     const element = document.getElementById("resumePDF");

//     // const opt = {
//     //   margin: 0.5,
//     //   filename: "Resume.pdf",
//     //   image: { type: "jpeg", quality: 1 },
//     //   html2canvas: { backgroundColor: "#ffffff", scale: 2 },
//     //   jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//     // };

//     const opt = {
//       margin: 0.5,
//       filename: "Resume.pdf",
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: {
//         scale: 2,
//         backgroundColor: "#ffffff",
//         useCORS: true,
//       },
//       jsPDF: {
//         unit: "in",
//         format: "a4",
//         orientation: "portrait",
//       },
//     };

//     html2pdf().set(opt).from(element).save();
//   };

//   return (
//     <button
//       disabled={!success}
//       onClick={download}
//       className={`text-sm sm:text-lg text-white py-2 px-4 rounded-lg
//         ${
//           success
//             ? "bg-indigo-500  hover:bg-indigo-600 opacity-100 duration-300"
//             : "bg-indigo-400 opacity-30"
//         }`}
//     >
//       Download PDF
//     </button>
//   );
// };

// export default DownloadPDF;

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
