"use client";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const DisplayResume = () => {
  const { response } = useSelector((state) => state.ResumeSlice);

  if (!response) return null;

  return (
    <div
      id="resumePDF"
      className="ml-5 bg-white p-10 shadow-2xl rounded-sm max-w-4xl mx-auto text-black border border-gray-100"
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                borderBottom: "2px solid black",
                marginBottom: "10px",
              }}
            >
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginTop: "20px",
                borderBottom: "1px solid #ccc",
              }}
            >
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#555",
              }}
            >
              {children}
            </div>
          ),

          p: ({ children }) => (
            <p style={{ fontSize: "13px", marginBottom: "5px" }}>{children}</p>
          ),

          ul: ({ children }) => (
            <ul style={{ marginLeft: "20px" }}>{children}</ul>
          ),

          li: ({ children }) => (
            <li style={{ fontSize: "13px", marginBottom: "4px" }}>
              {children}
            </li>
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};

export default DisplayResume;
