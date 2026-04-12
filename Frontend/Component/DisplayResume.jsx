// "use client";
// import { useSelector } from "react-redux";
// import ReactMarkdown from "react-markdown";

// const DisplayResume = () => {
//   const { response } = useSelector((state) => state.ResumeSlice);

//   if (!response) return null;

//   return (
//     <div
//       id="resumePDF"
//       className="ml-5 bg-white p-10 shadow-2xl rounded-sm max-w-4xl mx-auto text-black border border-gray-100"
//       style={{
//         backgroundColor: "#ffffff",
//         color: "#000000",
//       }}
//     >
//       <ReactMarkdown
//         components={{
//           h1: ({ children }) => (
//             <h1
//               style={{
//                 fontSize: "32px",
//                 fontWeight: "bold",
//                 borderBottom: "2px solid black",
//                 marginBottom: "10px",
//               }}
//             >
//               {children}
//             </h1>
//           ),

//           h2: ({ children }) => (
//             <h2
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "bold",
//                 marginTop: "20px",
//                 borderBottom: "1px solid #ccc",
//               }}
//             >
//               {children}
//             </h2>
//           ),

//           h3: ({ children }) => (
//             <h3
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "bold",
//                 marginTop: "10px",
//               }}
//             >
//               {children}
//             </h3>
//           ),

//           h4: ({ children }) => (
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 fontSize: "12px",
//                 color: "#555",
//               }}
//             >
//               {children}
//             </div>
//           ),

//           p: ({ children }) => (
//             <p style={{ fontSize: "13px", marginBottom: "5px" }}>{children}</p>
//           ),

//           ul: ({ children }) => (
//             <ul style={{ marginLeft: "20px" }}>{children}</ul>
//           ),

//           li: ({ children }) => (
//             <li style={{ fontSize: "13px", marginBottom: "4px" }}>
//               {children}
//             </li>
//           ),
//         }}
//       >
//         {response}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default DisplayResume;

"use client";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const DisplayResume = () => {
  const { response } = useSelector((state) => state.ResumeSlice);

  if (!response) return null;

  return (
    <div
      id="resumePDF"
      className="ml-5 bg-white shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto text-[#333] border border-gray-200 sticky top-8"
      style={{
        fontFamily: "'Inter', sans-serif",
        lineHeight: "1.5",
      }}
    >
      <ReactMarkdown
        components={{
          // Main Name Header
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
                borderBottom: "2px solid #000",
                paddingBottom: "8px",
                marginBottom: "16px",
                letterSpacing: "-0.025em",
              }}
            >
              {children}
            </h1>
          ),

          // Section Headers (About Me, Experience, Certifications, etc.)
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "black",
                borderBottom: "1px solid #d1d5db",
                marginTop: "24px",
                marginBottom: "12px",
                paddingBottom: "4px",
              }}
            >
              {children}
            </h2>
          ),

          // Job Titles or Project Titles
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#111",
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              {children}
            </h3>
          ),

          // Subheaders (Dates, Company Names, or Links)
          h4: ({ children }) => (
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#6b7280",
                textTransform: "uppercase",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              {children}
            </div>
          ),

          // Paragraphs (Summary and Descriptions)
          p: ({ children }) => (
            <p
              style={{
                fontSize: "14px",
                color: "#374151",
                marginBottom: "8px",
                textAlign: "justify",
              }}
            >
              {children}
            </p>
          ),

          // Lists for Experience/Project Bullets
          ul: ({ children }) => (
            <ul
              style={{
                marginLeft: "18px",
                listStyleType: "disc",
                marginBottom: "12px",
              }}
            >
              {children}
            </ul>
          ),

          li: ({ children }) => (
            <li
              style={{
                fontSize: "13px",
                color: "#4b5563",
                marginBottom: "4px",
                paddingLeft: "4px",
              }}
            >
              {children}
            </li>
          ),

          // Custom styling for links (Portfolio/GitHub)
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              style={{
                color: "#1d4ed8",
                textDecoration: "underline",
                fontWeight: "500",
              }}
            >
              {children}
            </a>
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};

export default DisplayResume;
