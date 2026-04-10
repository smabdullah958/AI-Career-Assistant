"use client";

import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const DisplayResume = () => {
  let { response } = useSelector((state) => state.ResumeSlice);

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl">
      {response ? (
        <div className="prose max-w-none">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : (
        <p>No Resume Generated Yet</p>
      )}
    </div>
  );
};

export default DisplayResume;
