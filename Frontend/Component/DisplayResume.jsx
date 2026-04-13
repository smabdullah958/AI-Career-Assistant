// // // "use client";
// // // import { useSelector } from "react-redux";
// // // import ReactMarkdown from "react-markdown";

// // // /**
// // //  * Brother, I have updated this to exactly match the "ResumePreview" layout you liked.
// // // //  * It now uses the thick gray headers, the specific side-bordered skills grid,
// // //  * and the exact font sizes from your preferred design.
// // //  */
// // // const DisplayResume = () => {
// // //   const { response } = useSelector((state) => state.ResumeSlice);

// // //   if (!response) return null;

// // //   return (
// // //     <div
// // //       id="resumePDF"
// // //       className="bg-white p-10 max-w-[210mm] min-h-[297mm] mx-auto text-[#333] border border-gray-200 shadow-2xl sticky top-8"
// // //       style={{
// // //         fontFamily: "'Inter', sans-serif",
// // //         lineHeight: "1.5",
// // //       }}
// // //     >
// // //       {/* <ReactMarkdown
// // //         components={{
// // //           // HEADER: Name and Role with the thick bottom border
// // //           h1: ({ children }) => (
// // //             <div className="border-b-2 border-gray-800 pb-4 mb-6">
// // //               <h1
// // //                 style={{
// // //                   fontSize: "30px",
// // //                   fontWeight: "700",
// // //                   textTransform: "uppercase",
// // //                   color: "black",
// // //                   margin: "0",
// // //                   letterSpacing: "-0.025em",
// // //                 }}
// // //               >
// // //                 {children}
// // //               </h1>
// // //             </div>
// // //           ),

// // //           // SECTION HEADERS: About Me, Experience, etc.
// // //           h2: ({ children }) => (
// // //             <h2
// // //               style={{
// // //                 fontSize: "18px",
// // //                 fontWeight: "700",
// // //                 textTransform: "uppercase",
// // //                 color: "black",
// // //                 borderBottom: "1px solid #d1d5db",
// // //                 marginTop: "32px",
// // //                 marginBottom: "12px",
// // //                 paddingBottom: "4px",
// // //               }}
// // //             >
// // //               {children}
// // //             </h2>
// // //           ),

// // //           // JOB TITLES / PROJECT TITLES
// // //           h3: ({ children }) => (
// // //             <h3
// // //               style={{
// // //                 fontSize: "15px",
// // //                 fontWeight: "700",
// // //                 color: "#000",
// // //                 marginTop: "16px",
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //                 alignItems: "baseline",
// // //               }}
// // //             >
// // //               {children}
// // //             </h3>
// // //           ),

// // //           // COMPANY / INSTITUTE / DATES
// // //           h4: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 fontSize: "14px",
// // //                 fontWeight: "500",
// // //                 fontStyle: "italic",
// // //                 color: "#4b5563",
// // //                 marginBottom: "4px",
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),

// // //           // SUMMARY & CONTACT INFO
// // //           p: ({ children }) => {
// // //             const content = String(children);
// // //             // Matches the contact info logic from ResumePreview
// // //             if (
// // //               content.includes("|") ||
// // //               content.includes("@") ||
// // //               content.includes("+")
// // //             ) {
// // //               return (
// // //                 <div
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     color: "#4b5563",
// // //                     marginTop: "-20px",
// // //                     marginBottom: "20px",
// // //                     display: "flex",
// // //                     flexWrap: "wrap",
// // //                     gap: "12px",
// // //                   }}
// // //                 >
// // //                   {children}
// // //                 </div>
// // //               );
// // //             }
// // //             return (
// // //               <p
// // //                 style={{
// // //                   fontSize: "14px",
// // //                   color: "#374151",
// // //                   marginBottom: "8px",
// // //                   lineHeight: "1.6",
// // //                 }}
// // //               >
// // //                 {children}
// // //               </p>
// // //             );
// // //           },

// // //           // SKILLS GRID: Exact 4-column layout with left borders
// // //           table: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 display: "grid",
// // //                 gridTemplateColumns: "repeat(4, 1fr)",
// // //                 gap: "8px",
// // //                 marginTop: "12px",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),
// // //           tbody: ({ children }) => <>{children}</>,
// // //           tr: ({ children }) => <>{children}</>,
// // //           td: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 fontSize: "14px",
// // //                 color: "#374151",
// // //                 borderLeft: "2px solid #e5e7eb",
// // //                 paddingLeft: "8px",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),

// // //           // BULLET POINTS
// // //           ul: ({ children }) => (
// // //             <ul
// // //               style={{
// // //                 marginLeft: "18px",
// // //                 listStyleType: "disc",
// // //                 marginBottom: "12px",
// // //               }}
// // //             >
// // //               {children}
// // //             </ul>
// // //           ),
// // //           li: ({ children }) => (
// // //             <li
// // //               style={{
// // //                 fontSize: "14px",
// // //                 color: "#374151",
// // //                 marginBottom: "4px",
// // //               }}
// // //             >
// // //               {children}
// // //             </li>
// // //           ),

// // //           // LINKS: Styled to look like the Next.js Links
// // //           a: ({ children, href }) => (
// // //             <a
// // //               href={href}
// // //               target="_blank"
// // //               rel="noopener noreferrer"
// // //               style={{
// // //                 color: "#1d4ed8",
// // //                 textDecoration: "none",
// // //                 fontWeight: "500",
// // //                 fontSize: "13px",
// // //               }}
// // //               onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
// // //               onMouseOut={(e) => (e.target.style.textDecoration = "none")}
// // //             >
// // //               {children}
// // //             </a>
// // //           ),
// // //         }}
// // //       >
// // //         {response}
// // //       </ReactMarkdown> */}
// // //       <ReactMarkdown
// // //         components={{
// // //           // NAME + ROLE (HEADER)
// // //           h1: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 borderBottom: "2px solid #000",
// // //                 paddingBottom: "10px",
// // //                 marginBottom: "20px",
// // //               }}
// // //             >
// // //               <h1
// // //                 style={{
// // //                   fontSize: "28px",
// // //                   fontWeight: "800",
// // //                   textTransform: "uppercase",
// // //                   margin: "0",
// // //                 }}
// // //               >
// // //                 {children}
// // //               </h1>
// // //             </div>
// // //           ),

// // //           // SECTION TITLES (About, Skills, etc.)
// // //           h2: ({ children }) => (
// // //             <h2
// // //               style={{
// // //                 fontSize: "16px",
// // //                 fontWeight: "700",
// // //                 textTransform: "uppercase",
// // //                 borderBottom: "1px solid #ccc",
// // //                 marginTop: "20px",
// // //                 marginBottom: "10px",
// // //                 paddingBottom: "4px",
// // //               }}
// // //             >
// // //               {children}
// // //             </h2>
// // //           ),

// // //           // TITLE (Role / Project Title)
// // //           h3: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //                 fontSize: "14px",
// // //                 fontWeight: "700",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),

// // //           // SUB INFO (Company / Dates)
// // //           h4: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 fontSize: "12px",
// // //                 color: "#555",
// // //                 display: "flex",
// // //                 justifyContent: "space-between",
// // //                 marginBottom: "4px",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),

// // //           // PARAGRAPH
// // //           p: ({ children }) => (
// // //             <p
// // //               style={{
// // //                 fontSize: "13px",
// // //                 color: "#444",
// // //                 lineHeight: "1.5",
// // //                 marginBottom: "8px",
// // //               }}
// // //             >
// // //               {children}
// // //             </p>
// // //           ),

// // //           // SKILLS GRID (IMPORTANT 🔥)
// // //           table: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 display: "grid",
// // //                 gridTemplateColumns: "repeat(4, 1fr)",
// // //                 gap: "8px",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),
// // //           tbody: ({ children }) => <>{children}</>,
// // //           tr: ({ children }) => <>{children}</>,
// // //           td: ({ children }) => (
// // //             <div
// // //               style={{
// // //                 fontSize: "12px",
// // //                 borderLeft: "2px solid #ccc",
// // //                 paddingLeft: "6px",
// // //               }}
// // //             >
// // //               {children}
// // //             </div>
// // //           ),

// // //           // LIST
// // //           ul: ({ children }) => (
// // //             <ul
// // //               style={{
// // //                 paddingLeft: "18px",
// // //                 margin: "5px 0",
// // //               }}
// // //             >
// // //               {children}
// // //             </ul>
// // //           ),

// // //           li: ({ children }) => (
// // //             <li
// // //               style={{
// // //                 fontSize: "12px",
// // //                 marginBottom: "4px",
// // //               }}
// // //             >
// // //               {children}
// // //             </li>
// // //           ),

// // //           // LINKS
// // //           a: ({ children, href }) => (
// // //             <a
// // //               href={href}
// // //               target="_blank"
// // //               style={{ textDecoration: "underline", color: "#000" }}
// // //             >
// // //               {children}
// // //             </a>
// // //           ),
// // //         }}
// // //       >
// // //         {response}
// // //       </ReactMarkdown>
// // //     </div>
// // //   );
// // // };

// // // export default DisplayResume;

// // "use client";
// // import { useSelector } from "react-redux";
// // import ReactMarkdown from "react-markdown";

// // /**
// //  * Brother, I have updated this file to match the exact layout of the ResumePreview component.
// //  * It features the heavy black top border, the specific section spacing,
// //  * and the 4-column skills grid with the light gray left-border style.
// //  */
// // const DisplayResume = () => {
// //   const { response } = useSelector((state) => state.ResumeSlice);

// //   if (!response) return null;

// //   return (
// //     <div
// //       id="resumePDF"
// //       className="bg-white p-10 max-w-[210mm] min-h-[297mm] mx-auto text-[#333] border border-gray-200 shadow-xl sticky top-8"
// //       style={{
// //         fontFamily: "'Inter', sans-serif",
// //         lineHeight: "1.5",
// //       }}
// //     >
// //       <ReactMarkdown
// //         components={{
// //           // HEADER: Name and Role with the specific border-b-2 border-gray-800
// //           h1: ({ children }) => (
// //             <div className="border-b-2 border-gray-800 pb-4 mb-6">
// //               <h1
// //                 style={{
// //                   fontSize: "1.875rem", // text-3xl
// //                   fontWeight: "700",
// //                   textTransform: "uppercase",
// //                   color: "black",
// //                   margin: "0",
// //                   letterSpacing: "-0.025em",
// //                 }}
// //               >
// //                 {children}
// //               </h1>
// //             </div>
// //           ),

// //           // SECTION HEADERS: About Me, Skills, Experience (Uppercase with border-b)
// //           h2: ({ children }) => (
// //             <h2
// //               style={{
// //                 fontSize: "1.125rem", // text-lg
// //                 fontWeight: "700",
// //                 textTransform: "uppercase",
// //                 color: "black",
// //                 borderBottom: "1px solid #d1d5db", // border-gray-300
// //                 marginTop: "2rem",
// //                 marginBottom: "0.75rem",
// //                 paddingBottom: "0.5rem",
// //               }}
// //             >
// //               {children}
// //             </h2>
// //           ),

// //           // JOB TITLES / PROJECT TITLES (font-bold text-[15px])
// //           h3: ({ children }) => (
// //             <h3
// //               style={{
// //                 fontSize: "15px",
// //                 fontWeight: "700",
// //                 color: "#000",
// //                 marginTop: "1rem",
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "baseline",
// //               }}
// //             >
// //               {children}
// //             </h3>
// //           ),

// //           // COMPANY / DATES / SUB-INFO
// //           h4: ({ children }) => (
// //             <div
// //               style={{
// //                 fontSize: "0.875rem", // text-sm
// //                 fontWeight: "500",
// //                 fontStyle: "italic",
// //                 color: "#1f2937", // text-gray-800
// //                 marginBottom: "0.25rem",
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //               }}
// //             >
// //               {children}
// //             </div>
// //           ),

// //           // CONTACT INFO & PARAGRAPHS
// //           p: ({ children }) => {
// //             const content = String(children);
// //             // Detecting the contact line (Phone | Email | LinkedIn)
// //             if (
// //               content.includes("|") ||
// //               content.includes("@") ||
// //               content.includes("+")
// //             ) {
// //               return (
// //                 <div
// //                   style={{
// //                     fontSize: "0.875rem", // text-sm
// //                     color: "#4b5563", // text-gray-600
// //                     marginTop: "-20px",
// //                     marginBottom: "24px",
// //                     display: "flex",
// //                     flexWrap: "wrap",
// //                     gap: "12px",
// //                   }}
// //                 >
// //                   {children}
// //                 </div>
// //               );
// //             }
// //             return (
// //               <p
// //                 style={{
// //                   fontSize: "0.875rem", // text-sm
// //                   color: "#374151", // text-gray-700
// //                   marginBottom: "0.5rem",
// //                   lineHeight: "1.625",
// //                 }}
// //               >
// //                 {children}
// //               </p>
// //             );
// //           },

// //           // SKILLS GRID: grid-cols-4 with border-l-2 border-gray-200
// //           table: ({ children }) => (
// //             <div
// //               style={{
// //                 display: "grid",
// //                 gridTemplateColumns: "repeat(4, 1fr)",
// //                 gap: "0.5rem",
// //                 marginTop: "0.75rem",
// //                 marginBottom: "2rem",
// //               }}
// //             >
// //               {children}
// //             </div>
// //           ),
// //           tbody: ({ children }) => <>{children}</>,
// //           tr: ({ children }) => <>{children}</>,
// //           td: ({ children }) => (
// //             <div
// //               style={{
// //                 fontSize: "0.875rem", // text-sm
// //                 color: "#374151", // text-gray-700
// //                 borderLeft: "2px solid #e5e7eb", // border-gray-200
// //                 paddingLeft: "0.5rem",
// //               }}
// //             >
// //               {children}
// //             </div>
// //           ),

// //           // LISTS (Experience details / Bullet points)
// //           ul: ({ children }) => (
// //             <ul
// //               style={{
// //                 marginLeft: "1.25rem",
// //                 listStyleType: "disc",
// //                 marginBottom: "1rem",
// //               }}
// //             >
// //               {children}
// //             </ul>
// //           ),
// //           li: ({ children }) => (
// //             <li
// //               style={{
// //                 fontSize: "0.875rem",
// //                 color: "#374151",
// //                 marginBottom: "0.25rem",
// //               }}
// //             >
// //               {children}
// //             </li>
// //           ),

// //           // LINKS (Live Link / GitHub)
// //           a: ({ children, href }) => (
// //             <a
// //               href={href}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               style={{
// //                 color: "#1d4ed8", // text-blue-700
// //                 textDecoration: "none",
// //                 fontWeight: "500",
// //                 fontSize: "0.75rem", // text-xs
// //               }}
// //               onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
// //               onMouseOut={(e) => (e.target.style.textDecoration = "none")}
// //             >
// //               {children}
// //             </a>
// //           ),
// //         }}
// //       >
// //         {response}
// //       </ReactMarkdown>
// //     </div>
// //   );
// // };

// // export default DisplayResume;

// "use client";
// import { useSelector } from "react-redux";
// import ReactMarkdown from "react-markdown";

// /**
//  * Brother, I have completely rebuilt this to be an exact clone of the
//  * ResumePreview UI. Every border color, font size, and layout constraint
//  * is now identical to your preferred design.
//  */
// const DisplayResume = () => {
//   const { response } = useSelector((state) => state.ResumeSlice);

//   if (!response) return null;

//   return (
//     <div
//       id="resumePDF"
//       className="bg-white border border-gray-200 shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333]"
//       style={{ fontFamily: "'Inter', sans-serif" }}
//     >
//       <ReactMarkdown
//         components={{
//           // Header: Name and Role with the thick gray-800 border
//           h1: ({ children }) => (
//             <div className="border-b-2 border-gray-800 pb-4 mb-6">
//               <h1 className="text-3xl font-bold tracking-tight uppercase text-black m-0">
//                 {children}
//               </h1>
//             </div>
//           ),

//           // Section Titles: About Me, Skills, etc. (lg, bold, border-gray-300)
//           h2: ({ children }) => (
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-3 mt-8 uppercase pb-1">
//               {children}
//             </h2>
//           ),

//           // Job/Project Titles: font-bold text-[15px]
//           h3: ({ children }) => (
//             <h3 className="font-bold text-[15px] text-black mt-4 flex justify-between items-baseline">
//               {children}
//             </h3>
//           ),

//           // Company / Dates: text-sm font-medium italic / text-xs gray-500
//           h4: ({ children }) => (
//             <div className="flex justify-between items-baseline mb-1">
//               <span className="text-sm font-medium text-gray-800 italic">
//                 {children}
//               </span>
//             </div>
//           ),

//           // Body Text and Contact Info
//           p: ({ children }) => {
//             const text = String(children);
//             // Matches the Contact Info logic (flex-wrap, text-sm, gray-600)
//             if (
//               text.includes("|") ||
//               text.includes("@") ||
//               text.includes("+")
//             ) {
//               return (
//                 <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-[-20px] mb-6">
//                   {children}
//                 </div>
//               );
//             }
//             return (
//               <p className="text-sm leading-relaxed text-gray-700 mb-2">
//                 {children}
//               </p>
//             );
//           },

//           // Skills Grid: Exact 4-column layout with border-l-2
//           table: ({ children }) => (
//             <div className="grid grid-cols-4 gap-2 mb-8">{children}</div>
//           ),
//           tbody: ({ children }) => <>{children}</>,
//           tr: ({ children }) => <>{children}</>,
//           td: ({ children }) => (
//             <div className="text-sm text-gray-700 border-l-2 border-gray-200 pl-2">
//               {children}
//             </div>
//           ),

//           // Experience & Project Bullets
//           ul: ({ children }) => (
//             <ul className="list-disc pl-5 mt-2 mb-4">{children}</ul>
//           ),
//           li: ({ children }) => (
//             <li className="text-sm text-gray-700 mb-1 leading-snug">
//               {children}
//             </li>
//           ),

//           // Links: GitHub / Live Link (text-blue-700 hover:underline)
//           a: ({ children, href }) => (
//             <a
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-700 hover:underline text-xs font-medium ml-2"
//             >
//               {children}
//             </a>
//           ),
//         }}
//       >
//         {response}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default DisplayResume;

// "use client";
// import { useSelector } from "react-redux";
// import ReactMarkdown from "react-markdown";

// /**
//  * Brother, I have completely transformed this into the exact UI you demanded.
//  * It is now a 100% match to the ResumePreview design, including the specific
//  * header borders, spacing, and component hierarchies.
//  */
// const DisplayResume = () => {
//   const { response } = useSelector((state) => state.ResumeSlice);

//   if (!response) return null;

//   return (
//     <div
//       id="resumePDF"
//       className="bg-white ml-5 border border-gray-200 shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333]"
//       style={{ fontFamily: "'Inter', sans-serif" }}
//     >
//       <ReactMarkdown
//         components={{
//           // HEADER: Name and Role with the specific border-b-2 border-gray-800
//           h1: ({ children }) => (
//             <div className="border-b-2 border-gray-800 pb-4 mb-6">
//               <h1 className="text-3xl font-bold tracking-tight uppercase text-black m-0">
//                 {children}
//               </h1>
//             </div>
//           ),

//           // SECTION TITLES: About Me, Skills, etc. (text-lg font-bold border-b border-gray-300)
//           h2: ({ children }) => (
//             <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8 first:mt-0">
//               {children}
//             </h2>
//           ),

//           // TITLES: Role or Project Name (font-bold text-[15px])
//           h3: ({ children }) => (
//             <div className="flex justify-between items-baseline mt-4">
//               <h3 className="font-bold text-[15px] text-black">{children}</h3>
//             </div>
//           ),

//           // SUB-INFO: Company Name, Dates, or Institute
//           h4: ({ children }) => {
//             const content = String(children);
//             // If it's a date or secondary info (detected via — or numbers)
//             if (content.includes("—") || /\d{4}/.test(content)) {
//               return (
//                 <span className="text-xs font-semibold text-gray-500 uppercase">
//                   {children}
//                 </span>
//               );
//             }
//             return (
//               <p className="text-sm font-medium text-gray-800 italic">
//                 {children}
//               </p>
//             );
//           },

//           // PARAGRAPHS & CONTACT INFO
//           p: ({ children }) => {
//             const text = String(children);
//             // Matches the contact info flex container from the source
//             if (
//               text.includes("|") ||
//               text.includes("@") ||
//               text.includes("+")
//             ) {
//               return (
//                 <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-3 mb-6">
//                   {children}
//                 </div>
//               );
//             }
//             return (
//               <p className="text-sm leading-relaxed text-gray-700 mb-4">
//                 {children}
//               </p>
//             );
//           },

//           // SKILLS GRID: grid-cols-4 with border-l-2 pl-2
//           table: ({ children }) => (
//             <div className="grid grid-cols-4 gap-2 mb-8 mt-3">{children}</div>
//           ),
//           tbody: ({ children }) => <>{children}</>,
//           tr: ({ children }) => <>{children}</>,
//           td: ({ children }) => (
//             <div className="text-sm text-gray-700 border-l-2 border-gray-200 pl-2">
//               {children}
//             </div>
//           ),

//           // LISTS (Experience/Projects)
//           ul: ({ children }) => <ul className="space-y-1 mb-4">{children}</ul>,
//           li: ({ children }) => {
//             const content = String(children);
//             // Special handling for Certifications style (relative pl-4 border-l-2 border-gray-800)
//             if (content.toLowerCase().includes("certificate")) {
//               return (
//                 <div className="relative pl-4 border-l-2 border-gray-800 mb-4">
//                   {children}
//                 </div>
//               );
//             }
//             return (
//               <li className="text-sm text-gray-700 leading-snug">{children}</li>
//             );
//           },

//           // LINKS: Next.js Link style (text-blue-700 hover:underline)
//           a: ({ children, href }) => (
//             <a
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-700 hover:underline text-xs font-medium inline-block mr-2"
//             >
//               {children}
//             </a>
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

const DisplayResume = () => {
  const { response } = useSelector((state) => state.ResumeSlice);

  // If there is no response, or if it's still a string (hasn't parsed yet), don't render
  if (!response || typeof response === "string") return null;

  return (
    <div
      id="resumePDF"
      className="bg-white ml-5 border border-gray-200 shadow-xl p-10 max-w-[210mm] min-h-[297mm] mx-auto sticky top-8 text-[#333]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* HEADER SECTION */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight uppercase text-black m-0">
          {response.name}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-3">
          <span>{response.email}</span>
          <span>|</span>
          <span>{response.phone}</span>
          {response.Linkedin && (
            <>
              <span>|</span>
              <a
                href={response.Linkedin}
                target="_blank"
                className="text-blue-700 hover:underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {response.portfolio && (
            <>
              <span>|</span>
              <a
                href={response.portfolio}
                target="_blank"
                className="text-blue-700 hover:underline"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      {/* SUMMARY */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Professional Summary
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 mb-4">
        {response.Summary}
      </p>

      {/* SKILLS GRID */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Skills
      </h2>
      <div className="grid grid-cols-4 gap-2 mb-8 mt-3">
        {response.Skills?.map((skill, index) => (
          <div
            key={index}
            className="text-sm text-gray-700 border-l-2 border-gray-200 pl-2"
          >
            {skill.value}
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Experience
      </h2>
      {response.Experience?.map((exp, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-baseline mt-4">
            <h3 className="font-bold text-[15px] text-black">{exp.Role}</h3>
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {exp.StartDate} — {exp.EndDate}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-800 italic">
            {exp.CompanyName}
          </p>
          <p className="text-sm text-gray-700 mt-2">{exp.Description}</p>
        </div>
      ))}

      {/* PROJECTS */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Projects
      </h2>
      {response.Projects?.map((proj, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-baseline mt-4">
            <h3 className="font-bold text-[15px] text-black">{proj.title}</h3>
            <div className="flex gap-2">
              <a
                href={proj.link}
                target="_blank"
                className="text-blue-700 hover:underline text-xs"
              >
                Live Link
              </a>
              <a
                href={proj.Github}
                target="_blank"
                className="text-blue-700 hover:underline text-xs"
              >
                GitHub
              </a>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-1">{proj.description}</p>
        </div>
      ))}

      {/* EDUCATION */}
      <h2 className="text-lg font-bold text-black border-b border-gray-300 mb-2 uppercase pb-1 mt-8">
        Education
      </h2>
      {response.Education?.map((edu, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between items-baseline">
            <h3 className="font-bold text-[15px] text-black">
              {edu.degree} in {edu.fieldOfStudy}
            </h3>
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {edu.graduationYear}
            </span>
          </div>
          <p className="text-sm text-gray-800">{edu.nameOfInstitute}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayResume;
